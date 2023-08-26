//creates a wallet and returns the wallet_id

import { NextApiRequest, NextApiResponse } from "next"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { userId } = req.body // TODO: SHOULD SECRET BE INTERNAL OR USER BASED? seems like wallet_id is the one from user
  console.log("creating wallet for userId: ", userId)

  const headers = {
    Accept: "application/json",
    Authorization: "Bearer " + process.env.HALLIDAY_API_KEY,
    "Content-Type": "application/json",
  }
  const body = JSON.stringify({ user_game_id: userId })

  try {
    const result = await fetch("https://sui_testnet.sandbox.halliday.xyz/accounts", {
      method: "POST",
      headers,
      body: JSON.stringify(body),
    })
    const data = await result.json()
    if (!result.ok) {
      console.log("halliday wallet creation error:", data)
      return res.status(500).json(data)
    }

    console.log("halliday wallet for userId:", data.user_game_id)

    res.status(200).json(data)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}
