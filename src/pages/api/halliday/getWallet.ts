//gets a halliday wallet
import { NextApiRequest, NextApiResponse } from "next"

/**
{
  "blockchain_type": "SUI_TESTNET",
  "user_game_id": "newguy1",
  "wallet_address": "0xb43cdef48b4de433d8a76a0685b2d1652608c33e45282fc48d7c82851469dd2c"
}
 */

interface WalletResponse {
  blockchain_type: string
  user_game_id: string
  wallet_address: string
  type?: string
  code?: string
  message?: string
  re_id?: string
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { userId } = req.body // TODO: SHOULD SECRET BE INTERNAL OR USER BASED? seems like wallet_id is the one from user
  console.log("Get wallet 0x from userId: ", userId)

  const headers = {
    Accept: "application/json",
    Authorization: "Bearer " + process.env.HALLIDAY_API_KEY,
    // "Content-Type": "application/json",
  }

  try {
    const result = await fetch(`https://sui_testnet.sandbox.halliday.xyz/accounts/${userId}/wallet`, {
      method: "GET",
      headers,
    })
    const data: WalletResponse = await result.json()
    if (!result.ok) {
      console.log("halliday get wallet error:", data)
      return res.status(500).json(data)
    }

    console.log("halliday wallet 0x from userId:", data)

    res.status(200).json(data)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}
