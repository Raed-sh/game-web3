//creates a wallet and returns the wallet_id

// import createShinamiSession from "@/utils/shinamiHelpers"
import { NextApiRequest, NextApiResponse } from "next"
import { JsonRpcProvider, testnetConnection, mainnetConnection } from "@mysten/sui.js"

// TODO: NEED TO PAGINATE 1000 AT A TIME

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { address } = req.body // TODO: SHOULD SECRET BE INTERNAL OR USER BASED? seems like wallet_id is the one from user
  console.log("address", address)

  const connection = process.env.NEXT_PUBLIC_SUI_NETWORK === "testnet" ? testnetConnection : mainnetConnection

  try {
    const provider = new JsonRpcProvider(connection)
    const objects = await provider.getOwnedObjects({
      owner: address,
      options: { showType: true, showDisplay: true },
    })

    console.log("objects", objects.data)

    return res.status(200).json(objects.data)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}
