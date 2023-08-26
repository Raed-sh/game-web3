//makes a contract call on the user's behalf
import { NextApiRequest, NextApiResponse } from "next"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { userId, contractAddress, txData } = req.body // TODO: SHOULD SECRET BE INTERNAL OR USER BASED? seems like wallet_id is the one from user
  console.log("Calling function for: ", userId)
  console.log("Calling function on contractAddress: ", contractAddress)
  console.log("Calling function with txData: ", txData)

  const tx = txData.serialize()

  const headers = {
    Accept: "application/json",
    Authorization: "Bearer " + process.env.HALLIDAY_API_KEY,
    "Content-Type": "application/json",
  }
  const body = JSON.stringify({
    from_user_game_id: userId,
    contract_address: contractAddress,
    tx_data: tx,
  })

  try {
    const result = await fetch("https://sui_testnet.sandbox.halliday.xyz/transactions/contract", {
      method: "POST",
      headers,
      body: body,
    })
    const data = await result.json()
    if (!result.ok) {
      console.log("halliday call contract error:", data)
      return res.status(500).json(data)
    }

    console.log("Call response: ", data)

    res.status(200).json(data)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}
