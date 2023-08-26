import { NextApiRequest, NextApiResponse } from "next"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.body
  try {
    const hasMinted = await fetch(`${process.env.API_URL}/hasMintedSuiEmote?id=${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        apikey: process.env.API_KEY as string,
      },
    }).then((res) => res.json())
    console.log("hasMinted", hasMinted)
    if (hasMinted === true) return res.status(200).json({ message: true })
    return res.status(200).json({ message: false })
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}
