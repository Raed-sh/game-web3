import type { NextApiRequest, NextApiResponse } from "next"

const secret = process.env.API_KEY as string

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.body
  console.log("req.body", req.body)

  const payload = {
    id: id,
  }

  try {
    const response = await fetch(`${process.env.API_URL}/getOrCreateHallidayWallet`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: secret,
      },
      body: JSON.stringify(payload), // should be "adventurer" or "ethernal"
    })
    // console.log("response", response)
    const data = await response.json()
    console.log("data", data)
    res.status(200).json(data)
  } catch (error) {
    console.log("error", error)
    res.status(500).json({ message: "error in getorcreatesuiwallet", status: 500 })
  }
}
