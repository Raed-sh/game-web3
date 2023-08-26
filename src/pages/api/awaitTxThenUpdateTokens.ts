import type { NextApiRequest, NextApiResponse } from "next"

//send data to API
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id, txHash, tokens } = req.body
  console.log("update web2 tokens", tokens)
  console.log("id", id)
  console.log("txHash", txHash)

  //make post request to api with data
  const response = await fetch(`${process.env.API_URL}/awaitTxThenUpdateTokens`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      apikey: process.env.API_KEY as string,
    },
    body: JSON.stringify(req.body),
  }).then((res) => res.json())

  // console.log("response from await tx then update", response)

  if (response.status === 200) {
    res.status(200).json(response)
  } else {
    res.status(500).json(response)
  }
}
