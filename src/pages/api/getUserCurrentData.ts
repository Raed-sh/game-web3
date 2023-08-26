import type { NextApiRequest, NextApiResponse } from "next"

const secret = process.env.API_KEY as string

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const id = req.body.id

  try {
    const response = await fetch(`${process.env.API_URL}/getSlimUserById?id=${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        apikey: secret,
      },
      // body: JSON.stringify({ id: req.body.id }),
    })
    console.log('slim user response')
    // console.log("response", response)
    const data = await response.json()
    // console.log("data", data)
    res.status(200).json(data)
  } catch (error) {
    console.log("error", error)
    res.status(500).json({ message: "error in getuserdata", status: 500 })
  }
}
