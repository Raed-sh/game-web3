//creates a wallet and returns the wallet_id

import { createShinamiSession } from "@/utils/suiHelpers"
import { NextApiRequest, NextApiResponse } from "next"

interface ShinamiResponse {
  jsonrpc: string
  result?: string // wallet_id
  error?: {
    code?: number
    message?: string
    data?: {
      details?: string
    }
  }
  id: number
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { walletId } = req.body // TODO: SHOULD SECRET BE INTERNAL OR USER BASED? seems like wallet_id is the one from user
  console.log("walletId", walletId)

  try {
    const sessionToken = await createShinamiSession(process.env.SHINAMI_SECRET as string)
    // console.log("sessionToken", sessionToken)

    const result = await fetch("https://api.shinami.com/wallet/v1", {
      method: "POST",
      headers: {
        "X-API-Key": process.env.SHINAMI_API_KEY as string,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        jsonrpc: "2.0",
        method: "shinami_wal_createWallet",
        params: [walletId, sessionToken],
        id: 1,
      }),
    })
    const data: ShinamiResponse = await result.json()

    if (data.error) return res.status(500).json(data.error)
    console.log("shinami wallet after error", data)

    //update shinamiWallet in db
    const updateResult = fetch(`${process.env.API_URL}/updateUserShinamiWallet`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: process.env.API_KEY as string,
      },
      body: JSON.stringify({
        id: walletId,
        address: data.result,
      }),
    })

    res.status(200).json(data.result)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}
