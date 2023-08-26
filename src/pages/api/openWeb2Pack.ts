import type { NextApiRequest, NextApiResponse } from "next"

//send data to API
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id, packData } = req.body
  console.log("packdata", packData)
  console.log("id", id)

  //make post request to api with data
  const response = await fetch(`${process.env.API_URL}/openWeb2Pack`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      apikey: process.env.API_KEY as string,
    },
    body: JSON.stringify(req.body),
  }).then((res) => res.json())

  console.log("response from sending data to api", response)

  if (response.status === 200) {
    res.status(200).json(response)
  } else {
    res.status(500).json(response)
  }
}
