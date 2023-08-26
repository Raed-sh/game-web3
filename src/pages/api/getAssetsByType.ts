import type { NextApiRequest, NextApiResponse } from "next"

const secret = process.env.API_KEY as string

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { type } = req.body
  console.log("req.body", req.body)

  const payload = {
    type: type,
  }

  try {
    const response = await fetch(`${process.env.API_URL}/getAssets`, {
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
    res.status(200).json(data.data)
  } catch (error) {
    console.log("error", error)
    res.status(500).json({ message: "error in getuserdata", status: 500 })
  }
}
