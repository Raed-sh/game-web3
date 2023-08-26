import type { NextApiRequest, NextApiResponse } from "next"

const secret = process.env.API_KEY as string

//get all assets of the wallet using the wallet address and alchemy api
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const id = req.query.id
  console.log("id is:", id)
  try {
    const response = await fetch(`${process.env.API_URL}/getCardById/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        apikey: secret,
      },
    })
    const data = await response.json()
    // console.log('api response:', data)
    res.status(200).json(data.message)
  } catch (error) {
    console.log("error", error)
    res.status(500).json({ message: "error in getcardsbyid", status: 500 })
  }
}
