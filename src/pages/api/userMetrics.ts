import type { NextApiRequest, NextApiResponse } from "next"

//send data to API
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { username } = req.body
  console.log("username", username)

  try {
    //make post request to api with data
    const response = await fetch(`${process.env.API_URL}/userMetrics`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: process.env.API_KEY as string,
      },
      body: JSON.stringify({ username }),
    })

    const data = await response.json()

    console.log("response from sending data to api", data)

    if (response.status === 200) {
      res.status(200).json(data)
    } else {
      res.status(500).json({ message: "error in userMetrics", status: 500 })
    }
  } catch (error) {
    console.log("error", error)
    res.status(500).json({ message: "error in userMetrics", status: 500, error })
  }
}
