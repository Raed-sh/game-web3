//creates a wallet and returns the wallet_id

// import createShinamiSession from "@/utils/shinamiHelpers"
import { NextApiRequest, NextApiResponse } from "next"

interface ShinamiResponse {
  jsonrpc: string
  result?: string // wallet_id
  error?: any
  id: number
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { walletId } = req.body // TODO: SHOULD SECRET BE INTERNAL OR USER BASED? seems like wallet_id is the one from user
  console.log("walletId", walletId)

  try {
    // const sessionToken = await createShinamiSession("testSecret")
    // console.log("sessionToken", sessionToken)

    const result = await fetch("https://api.shinami.com/wallet/v1", {
      method: "POST",
      headers: {
        "X-API-Key": process.env.SHINAMI_API_KEY as string,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        jsonrpc: "2.0",
        method: "shinami_wal_getWallet",
        params: [walletId],
        id: 1,
      }),
    })
    const data: ShinamiResponse = await result.json()

    console.log("shinami wallet", data)

    if (data.error) return res.status(500).json(data.error)

    res.status(200).json(data.result)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}
