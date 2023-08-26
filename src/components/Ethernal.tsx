import { getElementIcon } from "@/utils/collection"
import { COLLECTION } from "public/images"
import { useState } from "react"

import nftIcon from "public/images/collection/icons/NFT-sign.webp"

const Tergy = require("public/videos/ethernals/Tergy.webm")
const GoldenTergy = require("public/videos/ethernals/Golden Tergy.webm")
const Konunth = require("public/videos/ethernals/Konunth.webm")
const Posera = require("public/videos/ethernals/Posera.webm")
const Gaddres = require("public/videos/ethernals/Gaddres.webm")
const GogTomak = require("public/videos/ethernals/Gog'tomak.webm")

export interface IEthernal {
  id: string
  description: string
  name: string
  rarity: string
  type: string
  element?: string
  count: number
  isNFT?: boolean
}

export const getVideoByName = (name: string) => {
  switch (name) {
    case "Black Tergy":
      return Tergy
    case "Gold Tergy":
      return GoldenTergy
    case "Konunth":
    case "Stonewing":
      return Konunth
    case "Posera":
      return Posera
    case "Gaddres":
    case "Gaddress":
      return Gaddres
    case "Gog'Tomak":
      return GogTomak
  }
}

const Ethernal = (props: { ethernal: IEthernal }) => {
  const [hover, setHover] = useState(false)
  const ethernal = props.ethernal
  const elementIcon = getElementIcon(ethernal.type)

  // console.log("single ethernal:", ethernal)

  // temporary measure to remove the STARTER ethernal
  if (ethernal.id === "Adventurer-human-Starter_Adventurer-full") {
    return null
  }

  return (
    <div
      key={ethernal.id}
      className="collected-ethernal-wrapper"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <video src={getVideoByName(ethernal.name)} autoPlay muted loop />
      <div className="ethernal-count-wrapper">
        {ethernal.count > 1 && (
          <div className="ethernal-count">
            <img src={COLLECTION.collectionAssetAv.src} alt="background for amount of cards collected" />
            <p>x{ethernal.count}</p>
          </div>
        )}
        {ethernal.isNFT && <img src={nftIcon.src} className="nft-icon ethernal-nft-icon" />}
      </div>
      <div className={hover ? "collected-ethernal-hover" : "collected-ethernal-hover collected-ethernal-hover-hidden"}>
        {/* TODO: add nft/web2 icon ? */}
        {elementIcon && (
          <img
            src={elementIcon.src}
            alt={`${ethernal.element ? ethernal.element : "ethernal"} element icon`}
            className="card-description-icon"
          />
        )}
        <div className="collected-ethernal-name">{ethernal.name}</div>
        <div className="collected-ethernal-type">{ethernal.type}</div>
        <div className="collected-ethernal-description">{ethernal.description}</div>
        <div className="collected-ethernal-rarity">{ethernal.rarity}</div>
      </div>
    </div>
  )
}

export default Ethernal
