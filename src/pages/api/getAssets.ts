import { CONTRACTS } from "@/utils/CONSTANTS"
import type { NextApiRequest, NextApiResponse } from "next"

//get all assets of the wallet using the wallet address and alchemy api
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { account } = req.body
  console.log("account", account)
  const alchemyKey = process.env.ALCHEMY_API_KEY as string
  let url
  if (process.env.NETWORK === "mainnet") {
    url = `https://eth-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}/getNFTs/?owner=${account}`
  } else if (process.env.NETWORK === "matic") {
    url = `https://polygon-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}/getNFTs/?owner=${account}`
  } else {
    url = `https://eth-goerli.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}/getNFTs/?owner=${account}`
  }

  // console.log("alchemy url", url);

  const response = await fetch(url)
  const data = await response.json()

  // console.log("data", data);

  //filter out the assets that are not in constants file
  const itemAddresses = Object.values(CONTRACTS)
  const items = Object.keys(CONTRACTS)
  const filteredAssets = data.ownedNfts.filter((asset: any) => {
    // get the values of the keys in the contract object
    return itemAddresses.includes(asset.contract.address.toLowerCase())
  })

  // //create an object with keys from the constants file and values of the filtered assets
  const obj = { cards: [], packs: [], adventurers: [], ethernals: [], cardbacks: [], emotes: [] } as any

  filteredAssets.forEach((asset: any) => {
    const index = itemAddresses.indexOf(asset.contract.address.toLowerCase())
    const key = items[index]
    switch (key) {
      case "cards":
        obj.cards.push(asset)
        break
      case "packs":
        obj.packs.push(asset)
        break
      case "adventurers":
        obj.adventurers.push(asset)
        break
      case "ethernals":
        obj.ethernals.push(asset)
        break
      case "cardbacks":
        obj.cardbacks.push(asset)
        break
      case "emotes":
        obj.emotes.push(asset)
        break
      default:
        break
    }
  })

  data.ownedNfts = obj

  // console.log("filtered data", data.ownedNfts);

  res.status(200).json(data.ownedNfts)
}
