import type { NextApiRequest, NextApiResponse } from "next"

//send data to API
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  //make post request to api with data
  const response = await fetch(`${process.env.API_URL}/allUsersMetrics`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      apikey: process.env.API_KEY as string,
    },
    // body: JSON.stringify(req.body),
  })
  const data = await response.json()
  if (response.status === 200) {
    res.status(200).json(data)
  } else {
    res.status(500).json(data)
  }
}
