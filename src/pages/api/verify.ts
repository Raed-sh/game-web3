import type { NextApiRequest, NextApiResponse } from "next"
import jwt from "jsonwebtoken"

const secret = process.env.API_KEY as string

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const token = req.body.token as string
    const decoded = jwt.verify(token, secret)
    res.status(200).json(decoded)
  } catch (error) {
    console.log("error in Verify token", error)
    res.status(401).json({ message: "unauthorized", status: 401 })
  }
}
