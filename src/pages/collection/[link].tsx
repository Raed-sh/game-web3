import { useRouter } from "next/router"
import Image, { StaticImageData } from "next/image"
import React, { useState, useEffect, useContext } from "react"
import { MARKET_ICONS, MARKET_IMGS } from "public/images"
import HoveredButton from "@/components/HoveredButton"

import exploreBtnBg from "public/images/backgrounds/button-explore.png"
import exploreBtnHoverBg from "public/images/backgrounds/button-explore-hover.png"

import controlPackPreview from "public/images/bp store previews/power/packs/Control_pack.webp"
import doomSlayerPackPreview from "public/images/bp store previews/power/packs/Doom_slayer.webp"
import elementalRagePackPreview from "public/images/bp store previews/power/packs/Elemental_rage.webp"
import enchantedForestPackPreview from "public/images/bp store previews/power/packs/Enchanted_forest.webp"
import findThePathPackPreview from "public/images/bp store previews/power/packs/Find_the_Path.webp"
import iceWrathPackPreview from "public/images/bp store previews/power/packs/Ice_wrath.webp"
import lullabyPackPreview from "public/images/bp store previews/power/packs/Lullaby.webp"
import nightfallPackPreview from "public/images/bp store previews/power/packs/Nightfall.webp"
import powerAndSilencePackPreview from "public/images/bp store previews/power/packs/Power_and_silence.webp"

import emotesPackPreview from "public/images/bp store previews/power/packs/Emotes.webp"
import ethernalPackPreview from "public/images/bp store previews/power/packs/Ethernal.webp"
import adventurerPackPreview from "public/images/bp store previews/power/packs/Adventurer_pack.webp"
import fighterPackPreview from "public/images/bp store previews/power/packs/Fighter.webp"
import welcomePackPreview from "public/images/bp store previews/power/packs/Welcome-pack.webp"

import controlPackOpening from "public/images/bp store previews/power/bg/Control-pack-bg-opening.webp"
import doomSlayerPackOpening from "public/images/bp store previews/power/bg/Doom-slayer-bg-opening.webp"
import elementalRagePackOpening from "public/images/bp store previews/power/bg/Elemental rage-bg-opening.webp"
import enchantedForestPackOpening from "public/images/bp store previews/power/bg/Enchanted-forest-bg-opening.webp"
import findThePathPackOpening from "public/images/bp store previews/power/bg/Find-the-path-bg-opening.webp"
import iceWrathPackOpening from "public/images/bp store previews/power/bg/Ice-wrath-bg-opening.webp"
import lullabyPackOpening from "public/images/bp store previews/power/bg/Lullaby-bg-opening.webp"
import nightfallPackOpening from "public/images/bp store previews/power/bg/Nightfall-bg-opening.webp"
import powerAndSilencePackOpening from "public/images/bp store previews/power/bg/Power-and-silence-bg-opening.webp"

import emotesPackOpening from "public/images/bp store previews/power/bg/Emotes-bg-opening.webp"
import ethernalPackOpening from "public/images/bp store previews/power/bg/Ethernal-bg-opening.webp"
import fighterPackOpening from "public/images/bp store previews/power/bg/Fighter-bg-opening.webp"
import welcomePackOpening from "public/images/bp store previews/power/bg/Welcome-bg-opening.webp"
import adventurerPackOpening from "public/images/bp store previews/power/bg/Adventurer-pack-bg.webp"

import MarketplaceWrapper from "@/components/MarketplaceWrapper"
import { UserContext } from "@/context/UserContext"
import { BOOSTERS } from "@/utils/CONSTANTS"
import { openWeb2Pack } from "@/utils/fetchesToAPI"
import Card from "@/components/Card"
import Ethernal from "@/components/Ethernal"
import Adventurer from "@/components/Adventurer"
import CollectionWrapper, { CollectionDisplay } from "@/components/CollectionWrapper"
import BoosterCardPreview from "@/components/BoosterPacks/BoosterCardPreview"
import Web2Emote from "@/components/Collection/Web2Emote"

const getMatchingPreview = (packLink: string | undefined): StaticImageData => {
  switch (packLink) {
    case "control-pack":
      return controlPackPreview
    case "doom-slayer":
      return doomSlayerPackPreview
    case "elemental-rage":
      return elementalRagePackPreview
    case "enchanted-forest":
      return enchantedForestPackPreview
    case "find-the-path":
      return findThePathPackPreview
    case "ice-wrath":
      return iceWrathPackPreview
    case "lullaby":
      return lullabyPackPreview
    case "night-fall":
      return nightfallPackPreview
    case "power-and-silence":
      return powerAndSilencePackPreview
    case "emotes-pack":
    case "emote-pack":
      return emotesPackPreview
    case "ethernal-pack":
      return ethernalPackPreview
    case "fighter-booster":
      return fighterPackPreview
    case "welcome-pack":
      return welcomePackPreview
    case "adventurer-pack":
      return adventurerPackPreview
    default:
      return controlPackPreview
  }
}

const getMatchingOpening = (packLink: string | undefined): string => {
  switch (packLink) {
    case "adventurer-pack":
      return adventurerPackOpening.src
    case "control-pack":
      return controlPackOpening.src
    case "doom-slayer":
      return doomSlayerPackOpening.src
    case "elemental-rage":
      return elementalRagePackOpening.src
    case "enchanted-forest":
      return enchantedForestPackOpening.src
    case "find-the-path":
      return findThePathPackOpening.src
    case "ice-wrath":
      return iceWrathPackOpening.src
    case "lullaby":
      return lullabyPackOpening.src
    case "night-fall":
      return nightfallPackOpening.src
    case "power-and-silence":
      return powerAndSilencePackOpening.src
    case "emotes-pack":
    case "emote-pack":
      return emotesPackOpening.src
    case "ethernal-pack":
      return ethernalPackOpening.src
    case "fighter-booster":
      return fighterPackOpening.src
    case "welcome-pack":
      return welcomePackOpening.src
    default:
      return "error"
  }
}

const titleToLink = (title: string): string => title.replace(/\s+/g, "-").toLowerCase()

interface CollectionCard {
  bg: string
  hover: string
  title: string
  link?: string
  qty: number
}

const CardInCollection = () => {
  const { isLoggedIn, fullUserData } = useContext(UserContext)

  const router = useRouter()
  const { link } = router.query

  const [collection, setCollection] = useState<CollectionCard[] | null>([])
  const [isPoweringUp, setIsPoweringUp] = useState<boolean>(false)
  const [playedVid, setPlayedVid] = useState<number | null>(0)
  const [powerCard, setPowerCard] = useState<CollectionCard | null>(null)
  const [openingSuccess, setOpeningSuccess] = useState(false)
  const [resultCards, setResultCards] = useState<any[]>([])
  const [opening, setOpening] = useState(false);

  const WarningModal: React.FC = () => {
    return (
      <div className="w-modal">
        <section>
          <Image src={MARKET_ICONS.close} alt="" onClick={() => setIsPoweringUp(false)} />
        </section>
        <div>
          <h2>WARNING</h2>
          <p>There will be multiple transaction processing. All processes may take more than a minute</p>
        </div>
      </div>
    )
  }

  useEffect(() => {
    collection!.length === 0 &&
      fullUserData &&
      fetch("/api/getUserWeb2Assets", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: fullUserData?.id }),
      })
        .then((r) => r.json())
        .then((r) => {
          console.log("r", r)
          // const collectionData = r.filter((c: any) => c.type == "pack")
          const packs = r.pack.map((c: any) => {
            if (c.type === "pack") {
              const packData = BOOSTERS.find((b) => b.link === c.id)
              if (packData) return packData
            }
          })
          console.log("packs", packs)
          setCollection(packs)
        })
  }, [collection, fullUserData])

  useEffect(() => {
    console.log("collection", collection)
    if (collection!.length) {
      let filteredCards = collection!.filter((c) => c && c.link && c.link === link)
      if (filteredCards.length) {
        let card = filteredCards[0]
        if (card.link === undefined) {
          card.link = titleToLink(card.title)
        }
        console.log("card", card)
        setPowerCard(card)
      }
    }
  }, [collection, link])

  // FIXME: get proper preview for card (some-fucking-how)
  const getPowerCardPreview = () => {
    return
  }

  const handleVids = () => {
    setPlayedVid((val) => val! + 1)
  }

  const handleOpenPack = async () => {
    if (opening) return
    setOpening(true)
    console.log("handleOpenPack POWERPACK", powerCard)
    const result = await openWeb2Pack(fullUserData?.id, powerCard)
    console.log("result", result)
    if (result.status === 200) {
      setOpeningSuccess(true)
      setResultCards(result.data.reverse())
    }
    setOpening(false)
  }

  return (
    <CollectionWrapper
      title=""
      displaySwitcher={() => {}}
      displayValue={CollectionDisplay.packs}
      usePacksBackground={true}
      hideSwitcher={true}
  >
      {powerCard && (
        <>
          <div className="power-wrapper">
          {isPoweringUp && <WarningModal />}
          <div className="booster-opening-wrapper">
            <div className="power-card-r">
              <div
                className="power-card"
                style={{
                  backgroundImage: `url(${getMatchingOpening(powerCard?.link)})`,
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                }}
              >
                <div id='power-pack-description'>
                  <h2>{powerCard?.title}</h2>
                  <h4>{powerCard?.qty} Cards</h4>
                  {/* TODO: replace button since this one is wrong */}
                  <HoveredButton
                    bg={exploreBtnBg.src}
                    hover={exploreBtnHoverBg.src}
                    style={{
                      width: "230px",
                      height: "52px",
                    }}
                    title={opening ? "Opening..." :"Open Pack"}
                    onClick={handleOpenPack}
                  />
                </div>
                <Image src={getMatchingPreview(powerCard?.link)} alt="" className="pack" />
              </div>
            </div>

            {openingSuccess ? (
              <div
                id="result-cards-scrollbox"
                className={resultCards.length <= 3 ? "result-cards-centered" : "result-cards-regular"}
              >
                {resultCards.map((card, idx) => {
                  console.log("NEW CARDD", card)
                  // emotes don't have `type: "emote"` when returned from API
                  if (Object.keys(card).includes("reaction")) card.type = "emote"
                  switch (card.type) {
                    case "adventurer":
                      return (
                        <div id="ethernal-opening-result">
                          <Adventurer adventurer={card} renderAside={false} />
                        </div>
                      )
                    case "ethernal":
                      return (
                        <div id="ethernal-opening-result">
                          <Ethernal ethernal={card} />
                        </div>
                      )
                    case "emote":
                      const emote = {isNFT: false, ...card};
                      return (
                        <div className="emote-opening-result">
                          <Web2Emote emote={emote}/>
                        </div>
                      )
                    case "cardback":
                      return <p>{card.name}</p>
                    default:
                      return <Card card={card} display={"store"} />
                  }
                })}
              </div>
            ) : (
              // TODO: this has to be reworked as it's just stupid
              <div id='booster-opening-card-list'>
                {powerCard?.qty > 3 && (
                  <div className="booster-opening-card-left">
                    <Image
                      className="card-img"
                      src={playedVid! > 2 ? MARKET_IMGS.cards_left_act : MARKET_IMGS.cards_left}
                      alt=""
                    />
                  </div>
                )}
                {/* not sure why would we display more than 1 card for adventurer and ethernal as it's just a single card either way */}
                {Array(powerCard.link === "adventurer-pack" || powerCard.link === "ethernal-pack" ? 1 : 3)
                  .fill("")
                  .map((_, idx) => <BoosterCardPreview index={idx} />)
                }

                {powerCard?.qty > 3 && (
                  <div className="booster-opening-card-right">
                    <Image src={playedVid! > 2 ? MARKET_IMGS.cards_right_act : MARKET_IMGS.cards_right} alt="" />
                  </div>
                )}
              </div>
            )}
          </div>
          </div>
        </>
      )}
    </CollectionWrapper>
  )
}

export default CardInCollection
