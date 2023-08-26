import React, { useContext, useEffect, useState } from "react"
import { ADVENTURER_BACKGROUNDS } from "public/images"
import { UserContext } from "@/context/UserContext"
import switchIcon from "public/images/icons/switch.svg"
import Image from "next/image"
import adv_icon from "public/images/layout/adv-icon.svg"
import {AssetContext} from "@/context/AssetsContext"

const getAdventurerBGImage = (element: string) => {
  switch (element) {
    case "air":
      return ADVENTURER_BACKGROUNDS.airAdvBg.src
    case "chaos":
      return ADVENTURER_BACKGROUNDS.chaosAdvBg.src
    case "earth":
      return ADVENTURER_BACKGROUNDS.earthAdvBg.src
    case "fire":
      return ADVENTURER_BACKGROUNDS.fireAdvBg.src
    case "ice":
      return ADVENTURER_BACKGROUNDS.iceAdvBg.src
    case "light":
      return ADVENTURER_BACKGROUNDS.lightAdvBg.src
    case "nature":
      return ADVENTURER_BACKGROUNDS.natureAdvBg.src
    case "thunder":
      return ADVENTURER_BACKGROUNDS.thunderAdvBg.src
    case "water":
      return ADVENTURER_BACKGROUNDS.waterAdvBg.src
    case "starter":
      return ADVENTURER_BACKGROUNDS.starterAdvBg.src
    // we do need a default as a fallback value
    default:
      return ADVENTURER_BACKGROUNDS.starterAdvBg.src
  }
}

const AdventurersWrapper = (props: { children: any; adventurer: string }) => {
  const [bgImage, setBgImage] = useState(ADVENTURER_BACKGROUNDS.airAdvBg.src)

  useEffect(() => {
    setBgImage(getAdventurerBGImage(props.adventurer))
  }, [props.adventurer])

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        backgroundImage: `url(${bgImage})`,
      }}
    >
      <div className="relative" style={{'top': '160px'}}>
        {props.children}
      </div>
    </div>
  )
}

export default AdventurersWrapper
