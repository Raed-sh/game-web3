import type { NextApiRequest, NextApiResponse } from "next"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const response = await fetch(`${process.env.METADATA_URL}/api/emotes`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => res.json())

  console.log("response from sending data to api", response)

  res.status(200).json(response)
}
