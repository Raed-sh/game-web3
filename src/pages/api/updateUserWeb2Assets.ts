import type { NextApiRequest, NextApiResponse } from "next"

//send data to API
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id, assets, type } = req.body
  console.log("new web2 assets", req.body)

  const body = {
    id,
    assets,
    type,
  }

  //make post request to api with data
  const response = await fetch(`${process.env.API_URL}/updateUserWeb2Assets`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      apikey: process.env.API_KEY as string,
    },
    body: JSON.stringify(body),
  }).then((res) => res.json())

  console.log("response from sending data to api", response)

  if (response.status === 200) {
    res.status(200).json(response)
  } else {
    res.status(500).json(response)
  }
}

//THIS IS NOT TESTED AT ALLLLL
