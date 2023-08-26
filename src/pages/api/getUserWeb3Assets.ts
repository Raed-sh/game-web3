import type { NextApiRequest, NextApiResponse } from "next"

const secret = process.env.API_KEY as string

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.body
  console.log("req.body", req.body)

  const payload = {
    id: req.body.id,
  }

  try {
    const response = await fetch(`${process.env.API_URL}/getUserWeb3Assets?id=${req.body.id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        apikey: secret,
      },
    })
    const data = await response.json()
    console.log("data", data)
    res.status(200).json(data)
  } catch (error) {
    console.log("error", error)
    res.status(500).json({ message: "error in get user web 3 assets", status: 500 })
  }
}
