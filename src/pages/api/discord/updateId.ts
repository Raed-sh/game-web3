import type { NextApiRequest, NextApiResponse } from "next"

//send data to API
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id, discordId } = req.body

  try {
    const response = await fetch(`${process.env.API_URL}/addUserDiscordId`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: process.env.API_KEY as string,
      },
      body: JSON.stringify(req.body),
    })

    const data = await response.json()
    return res.status(200).json(data)
  } catch (error) {
    console.log("error", error)
    return res.status(500).json({ error })
  }
}
