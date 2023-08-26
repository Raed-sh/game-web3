import type { NextApiRequest, NextApiResponse } from "next"

//send data to API
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  //send data to api in body
  const data = JSON.parse(req.body)
  // console.log("data", data);

  //make post request to api with data
  const response = await fetch(`${process.env.API_URL}/registerWallet`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      apikey: process.env.API_KEY as string,
    },
    body: JSON.stringify(data),
  }).then((res) => res.json())

  console.log("response from sending data to api", response)

  if (response.status === 200) {
    res.status(200).json(response)
  } else {
    res.status(500).json(response)
  }
}
