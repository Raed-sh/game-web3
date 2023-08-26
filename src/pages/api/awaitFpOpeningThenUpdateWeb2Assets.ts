import type { NextApiRequest, NextApiResponse } from "next"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const response = await fetch(`${process.env.API_URL}/awaitFpOpeningThenUpdateWeb2Assets`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      apikey: process.env.API_KEY as string,
    },
    body: JSON.stringify(req.body),
  })
  const data = await response.json()
  if (response.status === 200) {
    res.status(200).json(data)
  } else {
    res.status(500).json(data)
  }
}
