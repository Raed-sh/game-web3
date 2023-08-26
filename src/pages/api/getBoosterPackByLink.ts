import type { NextApiRequest, NextApiResponse } from "next";
import { BOOSTERS } from "@/utils/CONSTANTS";

const getByLink = (link: string) => {
    return BOOSTERS.filter((pack) => pack.link === link);
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    console.log(req.body)
    try {
      res.status(200).json(getByLink(req.body.link))
    } catch (error) {
      console.log("error", error)
      res.status(500).json(
        { message: "error in getBoosterPackByLink", status: 500,
      })
    }
}