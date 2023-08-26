import { BPs } from "public/images";
import type { NextApiRequest, NextApiResponse } from "next";

const DUMMYCOLLECTION = [
    {
      bg: BPs.Control_pack_pw.src,
      hover: BPs.Control_pack_pw_hover.src,
      title: "Control \npack",
      link: "control-pack",
      qty: 3,
    },
    {
      bg: BPs.Enchanted_Forest_pack_pw,
      hover: BPs.Enchanted_Forest_pack_pw_hover,
      title: "Enchanted \nforest",
      link: "enchanted-forest",
      qty: 12,
    },
  ];

// FIXME: fetch actual collection 
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
      res.status(200).json(
        DUMMYCOLLECTION
      )
    } catch (error) {
      console.log("error", error)
      res.status(500).json(
        { message: "error in getUserCollection", status: 500,
      })
    }
}