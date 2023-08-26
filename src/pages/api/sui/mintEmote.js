//creates a wallet and returns the wallet_id

// import createShinamiSession from "@/utils/shinamiHelpers"
import { NextApiRequest, NextApiResponse } from "next"
import {
  JsonRpcProvider,
  testnetConnection,
  mainnetConnection,
  Ed25519Keypair,
  RawSigner,
  fromB64,
  TransactionBlock,
} from "@mysten/sui.js"
import { getObjectById } from "@/utils/suiHelpers"

const emotes = [
  {
    id: "submarine_warrior_sui",
    name: "Submarine Warrior",
    reaction: "Sui Flex",
    rarity: "Uncommon",
    image: "http://api.aethergames.io/get/promo_emotes/sui_emote_submarine_warrior.png",
  },
  {
    id: "jegdreth_sui_iceblock",
    name: "Jeg'dreth",
    reaction: "Interesting..",
    rarity: "Uncommon",
    image: "http://api.aethergames.io/get/promo_emotes/sui_emote_jagdreth.png",
  },
  {
    id: "harbringer_sui_energy",
    name: "Harbringer",
    reaction: "Rasengan",
    rarity: "Rare",
    image: "http://api.aethergames.io/get/promo_emotes/sui_emote_harbinger.png",
  },
  {
    id: "licin_sui_bone",
    name: "Licin",
    reaction: "My Bone",
    rarity: "Rare",
    image: "http://api.aethergames.io/get/promo_emotes/sui_emote_licin_bone.png",
  },
  {
    id: "corvun_mysten_flamebreath",
    name: "Corvun",
    reaction: "Mysten Flamebreath",
    rarity: "Epic",
    image: "http://api.aethergames.io/get/promo_emotes/mysten_emote_corvun.png",
  },
]

export default async function handler(req, res) {
  const { id, address } = req.body
  console.log("user address", address)

  const connection = process.env.NEXT_PUBLIC_SUI_NETWORK === "testnet" ? testnetConnection : mainnetConnection

  try {
    //check if user has already minted an emote with /hasMintedEmote from api
    const hasMinted = await fetch(`${process.env.API_URL}/hasMintedSuiEmote?id=${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        apikey: process.env.API_KEY,
      },
    }).then((res) => res.json())
    console.log("hasMinted", hasMinted)
    if (hasMinted === true) return res.status(200).json({ message: "User has already minted an emote" })

    // In order to create and sing a transaction online we are going to need our private key
    const b64PrivateKey = process.env.SUI_PRIVATE_KEY
    const privkey = Array.from(fromB64(b64PrivateKey))
    const schemeByte = privkey.shift() // this will be needed to form a signature
    const privateKey = Uint8Array.from(privkey)
    const keypair = Ed25519Keypair.fromSecretKey(privateKey)

    // our address
    const adminAddress = `${keypair.getPublicKey().toSuiAddress()}`
    // console.log(address)

    // In order to eventually execute a transaction we need a provider
    const provider = new JsonRpcProvider(connection)

    // if we want the digest before execution we need a signer
    const signer = new RawSigner(keypair, provider)

    //TODO: get random emote from promo emotes and use those as the arguments below
    //get random emote from promo emotes
    const chosenEmote = emotes[rand(0, emotes.length - 1)]

    // call signandexucute transaction block
    const tx = new TransactionBlock()
    const mintResult = tx.moveCall({
      target: process.env.SUI_EMOTE_MINT_TYPE,
      arguments: [
        tx.object(process.env.SUI_EMOTE_ADMIN_KEY),
        tx.pure(chosenEmote.name),
        tx.pure(chosenEmote.id),
        tx.pure(chosenEmote.rarity),
        tx.pure(chosenEmote.reaction),
        tx.pure(chosenEmote.image),
        tx.pure("https://www.aethergames.io"), //external url
      ],
    })
    console.log("mintResult", mintResult)

    tx.transferObjects([mintResult], tx.pure(address))

    // tx.setSender(adminAddress) //needed?
    tx.setGasBudget(30000000)

    const txResult = await signer.signAndExecuteTransactionBlock({
      transactionBlock: tx,
      requestType: "WaitForLocalExecution",
      options: {
        showEffects: true,
      },
    })

    console.log("txResult", txResult.effects || txResult) // ID, created, owner

    if (txResult.effects?.created) {
      const objectId = txResult.effects.created[0].reference.objectId
      //if tx result status is success, then get the object
      const object = await getObjectById(objectId)

      //TODO: update user in db with new emote?
      const updateMintedSuiEmote = await fetch(`${process.env.API_URL}/logMintedSuiEmote`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apikey: process.env.API_KEY,
        },
        body: JSON.stringify({ id: id, objectId: objectId }),
      }).then((res) => res.json())

      res.status(200).json(object.data)
    } else throw new Error("Failed to mint")
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}

const rand = (min, max) => {
  const time = new Date().getTime()
  const randNum = Math.floor(time * Math.random())
  return (randNum % (max - min + 1)) + min
}
