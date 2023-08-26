import { useState } from "react"

import goldenCardBack from "public/images/collection/founderpacks/Founder_back-golden.webp"
import silverCardBack from "public/images/collection/founderpacks/Founder_back-silver.webp"
import Count from "../CollectionPacks/Count"
import nftIcon from "public/images/collection/icons/NFT-sign.webp"

export interface ICardBack {
  id: string
  count: number
  isNFT?: boolean
}

const CardBack = (props: ICardBack) => {
  const [hover, setHover] = useState(false)

  const getCardBackType = () => {
    let result = "silver"
    switch (props.id) {
      case "silver-card-back":
      case "nft-silver-card-back":
        result = "silver"
        break
      case "golden-card-back":
      case "nft-golden-card-back":
        result = "golden"
        break
      default:
        break
    }
    return result
  }

  const cardBackType = getCardBackType()

  const getCardBackTitle = () => {
    if (["golden-card-back", "silver-card-back"].includes(props.id)) {
      return "Deluxe Pack Card Back"
    } else if (["nft-silver-card-back", "nft-golden-card-back"].includes(props.id)) {
      return "NFT Card Back"
    }
    return ""
  }

  return (
    <div
      className={hover ? "collection-cardback collection-cardback-hover" : "collection-cardback"}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <Count count={props.count} />
      <img src={cardBackType === "silver" ? silverCardBack.src : goldenCardBack.src} />
      {props.isNFT && <img src={nftIcon.src} className="nft-icon cardback-nft-icon" />}
      {hover && (
        <div id="hovered-cardback">
          <h2>{getCardBackTitle()}</h2>
          <h3>{cardBackType}</h3>
          {/* TODO: add rarity info when supported on backend */}
        </div>
      )}
    </div>
  )
}

export default CardBack
