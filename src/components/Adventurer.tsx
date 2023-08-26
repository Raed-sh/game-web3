import { ADVENTURER_TEXT_BACKGROUNDS, COLLECTION, ADVENTURER_CARD_IMAGES, ADVENTURER_BANERS } from "public/images"
import { ADVENTURERS_INFORMATION } from "../utils/CONSTANTS"
import nftIcon from "public/images/collection/icons/NFT-sign.webp"

export interface IAdventurersInformation {
  attack: number
  description: string
  element: string
  hp: number
  id: string
  mana: number
  name: string
  rarity: string
  type: string
  count: number
  isNFT?: boolean
  image?: string
}

const Adventurer = (props: { adventurer: IAdventurersInformation; renderAside: boolean }) => {
  const adventurer = props.adventurer

  return (
    <div
      className={props.renderAside ? "collection-adventurer" : "collection-adventurer collection-adventurer-no-aside"}
      key={adventurer.isNFT ? `nft-adventurer-${adventurer.id}` : `adventurer-${adventurer.id}`}
    >
      <div
        className="adventurer-container"
        style={{
          backgroundImage: `url(${getBanner(adventurer.element)})`,
        }}
      >
        <img className="adventurer-card" src={getAdventurerCard(adventurer.element)} />
        <div className="adventurer-info">
          {adventurer && (
            <>
              <div
                className="adventurer-counter"
                style={{
                  backgroundImage: `url(${COLLECTION.collectionPacksAv.src})`,
                }}
              >
                {adventurer.count} Card{adventurer.count > 1 && "s"}
              </div>
              <h2>{adventurer.name}</h2>
              <p>
                <span className="yellow small"> {adventurer.rarity}</span>
              </p>
              <h3>Adventurer of {adventurer.element}</h3>
              <div>
                <span className="strong">Ability:</span>{" "}
                <p className="grey">
                  {adventurer.description
                    .replace(/<[^>]*>|:\s?/g, "")
                    .replace(/(?:^|\.)\s*([a-z])/g, (l: any) => l.toUpperCase())}
                </p>
              </div>
            </>
          )}
          {adventurer.isNFT && <img src={nftIcon.src} className="nft-icon adventurer-nft-icon" />}
        </div>
      </div>
    </div>
  )
}

export const getAdventurerCard = (element: string) => {
  switch (element) {
    case "air":
      return ADVENTURER_CARD_IMAGES.adventurerAir.src
    case "chaos":
      return ADVENTURER_CARD_IMAGES.adventurerChaos.src
    case "earth":
      return ADVENTURER_CARD_IMAGES.adventurerEarth.src
    case "fire":
      return ADVENTURER_CARD_IMAGES.adventurerFire.src
    case "ice":
      return ADVENTURER_CARD_IMAGES.adventurerIce.src
    case "light":
      return ADVENTURER_CARD_IMAGES.adventurerLight.src
    case "nature":
      return ADVENTURER_CARD_IMAGES.adventurerNature.src
    case "thunder":
      return ADVENTURER_CARD_IMAGES.adventurerThunder.src
    case "water":
      return ADVENTURER_CARD_IMAGES.adventurerWater.src
    case "none":
      return ADVENTURER_CARD_IMAGES.adventurerStarter.src
  }
}

const getBanner = (element: string) => {
  switch (element) {
    case "air":
      return COLLECTION.backgrounds.adventurers.air.src
    case "chaos":
      return COLLECTION.backgrounds.adventurers.chaos.src
    case "earth":
      return COLLECTION.backgrounds.adventurers.earth.src
    case "fire":
      return COLLECTION.backgrounds.adventurers.fire.src
    case "ice":
      return COLLECTION.backgrounds.adventurers.ice.src
    case "light":
      return COLLECTION.backgrounds.adventurers.light.src
    case "nature":
      return COLLECTION.backgrounds.adventurers.nature.src
    case "thunder":
      return COLLECTION.backgrounds.adventurers.thunder.src
    case "water":
      return COLLECTION.backgrounds.adventurers.water.src
    case "none":
      return COLLECTION.backgrounds.adventurers.starter.src
  }
}

const getAdventurerInfo = (element: string) => {
  switch (element) {
    case "air":
      return ADVENTURERS_INFORMATION[0]
    case "chaos":
      return ADVENTURERS_INFORMATION[8]
    case "earth":
      return ADVENTURERS_INFORMATION[6]
    case "fire":
      return ADVENTURERS_INFORMATION[5]
    case "ice":
      return ADVENTURERS_INFORMATION[7]
    case "light":
      return ADVENTURERS_INFORMATION[3]
    case "nature":
      return ADVENTURERS_INFORMATION[2]
    case "thunder":
      return ADVENTURERS_INFORMATION[4]
    case "water":
      return ADVENTURERS_INFORMATION[1]
    case "none":
      return ADVENTURERS_INFORMATION[9]
  }
}

export default Adventurer
