import {
  ADVENTURER_CARD_IMAGES,
  ADVENTURER_IMAGES,
  ADVENTURER_ELEMENT_BUTTONS,
  ADVENTURER_ICONS,
  ADVENTURER_BANERS,
  ADVENTURER_PROCESSING_BACKGROUNDS,
  ADVENTURER_TEXT_BACKGROUNDS,
  MARKET_IMGS,
} from "public/images"
import { UserContext } from "@/context/UserContext"
import { ADVENTURERS_INFORMATION } from "../../utils/CONSTANTS"
import AdventurersWrapper from "@/components/AdventurersWrapper"
import { useEffect, useState, useContext } from "react"
import HoveredButton from "../../components/HoveredButton"
import Link from "next/link"
import { getAssetsByType } from "@/utils/fetchesToAPI"
import aetherCoin from "public/images/adventurers/icons/coin-B.svg"
import storyIcon from "public/images/adventurers/icons/Story.webp"
import closeStoryIcon from "public/images/adventurers/icons/Close-story.webp"
import Image from "next/image"

const Adventurers = () => {
  const { isLoggedIn, fullUserData, fetchUserDetails } = useContext(UserContext)
  const [textBackground, setTextBackground] = useState(getTextBackground())
  const [adventurers, setAdventurers] = useState<any>(null)
  const [adventurerInfo, setAdventurerInfo] = useState(ADVENTURERS_INFORMATION[8]) //Chaos
  const [adventurerApiInfo, setAdventurerApiInfo] = useState<any>(null)
  const [selectedAdventurer, setSelectedAdventurer] = useState("chaos")
  const [displayStory, setDisplayStory] = useState(false)
  const [proceesPhase, setProcessPhase] = useState<string | null>(null)
  const [isError, setIsError] = useState(false)
  const [purchase, setPurchase] = useState<boolean>(false)

  useEffect(() => {
    getAssetsByType("adventurers").then((res) => {
      setAdventurers(res)
    })
  }, [])

  useEffect(() => {
    setTextBackground(getTextBackground(selectedAdventurer))
  }, [selectedAdventurer])

  useEffect(() => {
    setProcessPhase("loading")
    setIsError(false)
    if (adventurers?.length > 0) {

      adventurers?.map((e: any) => {
        if (e.element == selectedAdventurer) {
          const cleanedDescription = e.description
            .replace(/<[^>]*>|:\s?/g, "")
            .replace(/(?:^|\.)\s*([a-z])/g, (l: any) => l.toUpperCase())
          const advInfo = {
            description: cleanedDescription,
            rarity: e.rarity,
          }
          setAdventurerApiInfo(advInfo)
          setProcessPhase(null)
        }
      })
    }

  }, [selectedAdventurer, adventurers])

  const handleBuy = async () => {
    // TODO: Pass the Assettype from the wrappet
    //   if (assetType == "plain")
    setPurchase(true)
    {
      // - tokens from user
      try {
        const updateTokensResult = await fetch("/api/updateUserWeb2Tokens", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Connection: "keep-alive",
            Accept: "*/*",
          },
          body: JSON.stringify({
            id: fullUserData?.id,
            tokens: -adventurerInfo.price,
            type: "buy-adventurer",
          }),
        }).then((res) => res.json())
        if (updateTokensResult.status !== 200) throw new Error("error")
        const addAdventurerResult = await fetch("/api/updateUserWeb2Assets", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: fullUserData?.id,
            assets: [
              {
                id: adventurerInfo.id,
                type: "adventurer",
                count: 1,
              },
            ],
          }),
        })
          .then((res) => res.json())
          .then(() => fetchUserDetails())
          .then(() => {
            setPurchase(false)
            setProcessPhase("success")
          })
      } catch (error) {
          setPurchase(false)
          setIsError(true)
        // setProcessPhase("error")
      }
    }
  }


  return (
    <AdventurersWrapper adventurer={selectedAdventurer}>
      {!proceesPhase || proceesPhase == "loading" ? (
        <div className="adventurerMain">
          <div
            className="adventurerInfoContainer"
            style={{
              backgroundImage: `url(${textBackground})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
            }}
          >
            {!displayStory ? (
              <>
                <div className="adventurerInfo">
                  <div className="adventurerTitle">
                    <div>
                      <h2>{adventurerInfo.name}</h2>
                      <h3>Adventurer of {adventurerInfo.element}</h3>
                    </div>
                    <div className="loreButtonContainer">
                      <Image src={storyIcon} alt="" onClick={() => setDisplayStory(!displayStory)} />
                    </div>
                    {/* <p className="rarity">
                 <span className="yellow ">{adventurerApiInfo?.rarity}</span>
               </p> */}
                  </div>
                  <br />
                  <p>
                    <span className="strong">Personality Type:</span>{" "}
                    <span className="light">{adventurerInfo.personality}</span>
                  </p>
                  <p>
                    <span className="strong">Ability:</span>{" "}
                    <span className="light">{adventurerApiInfo?.description}</span>
                  </p>

                  {isError && (
                    <div className="error">
                      <p>You don't have enough AC to buy this adventurer.</p>
                      <Link href={"/shop/currency-store"}>Click here to buy more</Link>
                    </div>
                  )}
                </div>

                <div className="buyButtonContainer">
                  {purchase ? <span id='purchase-in-progress-adventurer'>Purchase in progress...</span> :<HoveredButton
                    bg={ADVENTURER_ICONS.goldenButton.src}
                    hover={ADVENTURER_ICONS.goldenButtonHover.src}
                    clicked={ADVENTURER_ICONS.goldenButtonPressed.src}
                    className={"buy-button"}
                    onClick={() => handleBuy()}
                  >
                    Buy
                  </HoveredButton>}
                  <div className="adventurerPrice">
                    <img src={aetherCoin.src}></img>
                    <p>{adventurerInfo.price}</p>
                    <p>AC</p>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="adventurerInfo">
                  <div className="adventurerTitle">
                    <div>
                      <h2>{adventurerInfo.name}</h2>
                      <h3>Adventurer of {adventurerInfo.element}</h3>
                    </div>
                    <div className="loreButtonContainer">
                      <Image src={closeStoryIcon} alt="" onClick={() => setDisplayStory(!displayStory)} />
                    </div>
                  </div>
                  <br />
                  <p>{adventurerInfo.lore}</p>
                </div>
              </>
            )}
          </div>
          <div className="adventurerPhoto">
            <img src={getAdventurerImage(selectedAdventurer)}></img>
          </div>
          <div className="adventurerSelectorContainer">
            {/* <div className={`starterBtn ${selectedAdventurer === "starter" ? "active" : ""}`} onClick={() => { setSelectedAdventurer("starter"); setAdventurerInfo(ADVENTURERS_INFORMATION[9]); setProcessPhase(null); setDisplayStory(false) }}></div> */}
            {ADVENTURERS_INFORMATION.map((adv) => {
              return (
                <div key={adv.element}>
                  <h4
                    style={{
                      opacity: selectedAdventurer === adv.element ? 1 : 0.5,
                      visibility: selectedAdventurer === adv.element ? "visible" : undefined,
                    }}
                  >
                    {adv.element}
                  </h4>
                  <div
                    className={`${adv.element}Btn ${selectedAdventurer === adv.element ? "active" : ""}`}
                    onClick={() => {
                      setSelectedAdventurer(adv.element)
                      setAdventurerInfo(adv)
                      setProcessPhase(null)
                      setDisplayStory(false)
                    }}
                  />
                </div>
              )
            })}
          </div>
        </div>
      ) : (
        <div className={`successMain`}>
          <div
            className="successDisplayContainer"
            style={{
              backgroundImage: `url(${getSuccessBackground(selectedAdventurer)})`,
            }}
          >
            {proceesPhase == "success" ? (
              <>
                <img className="adventurerCard" src={getAdventurerCard(selectedAdventurer)} />
                <h2>Success!</h2>
                <img src={ADVENTURER_ICONS.successAdv.src} />
                <HoveredButton
                  bg={ADVENTURER_ICONS.goldenButton.src}
                  hover={ADVENTURER_ICONS.goldenButtonHover.src}
                  clicked={ADVENTURER_ICONS.goldenButtonPressed.src}
                  className={"back-button"}
                  onClick={() => setProcessPhase(null)}
                >
                  Back
                </HoveredButton>
              </>
            ) : (
              <div className="processing-logo">
                <img src={MARKET_IMGS.proccesing_icon.src}></img>
                <img src={MARKET_IMGS.proccesing.src}></img>
              </div>
            )}
            <Image src={aetherCoin} alt="" className="coin" />
          </div>
          <div className="adventurerSuccessPhoto">
            <img src={getAdventurerImage(selectedAdventurer)}></img>
            <div
              className="adventurerBanner"
              style={{
                backgroundImage: `url(${getBanner(selectedAdventurer)})`,
              }}
            >
              <div>
                <img src={getAdventurerIcon(selectedAdventurer)}></img>
              </div>
              <div>
                <h1>{adventurerInfo.name}</h1>
                <h2>Adventurer of {adventurerInfo.element}</h2>
              </div>
            </div>
          </div>
        </div>
      )}
    </AdventurersWrapper>
  )
}

export default Adventurers

const getAdventurerImage = (element: string) => {
  switch (element) {
    case "air":
      return ADVENTURER_IMAGES.adventurerNoBGAir.src
    case "chaos":
      return ADVENTURER_IMAGES.adventurerNoBGChaos.src
    case "earth":
      return ADVENTURER_IMAGES.adventurerNoBGEarth.src
    case "fire":
      return ADVENTURER_IMAGES.adventurerNoBGFire.src
    case "ice":
      return ADVENTURER_IMAGES.adventurerNoBGIce.src
    case "light":
      return ADVENTURER_IMAGES.adventurerNoBGLight.src
    case "nature":
      return ADVENTURER_IMAGES.adventurerNoBGNature.src
    case "thunder":
      return ADVENTURER_IMAGES.adventurerNoBGThunder.src
    case "water":
      return ADVENTURER_IMAGES.adventurerNoBGWater.src
    case "starter":
      return ADVENTURER_IMAGES.adventurerNoBGStarter.src
  }
}

const getTextBackground = (element?: string) => {
  switch (element) {
    case "air":
      return ADVENTURER_TEXT_BACKGROUNDS.airAdvTextBg.src
    case "chaos":
      return ADVENTURER_TEXT_BACKGROUNDS.chaosAdvTextBg.src
    case "earth":
      return ADVENTURER_TEXT_BACKGROUNDS.earthAdvTextBg.src
    case "fire":
      return ADVENTURER_TEXT_BACKGROUNDS.fireAdvTextBg.src
    case "ice":
      return ADVENTURER_TEXT_BACKGROUNDS.iceAdvTextBg.src
    case "light":
      return ADVENTURER_TEXT_BACKGROUNDS.lightAdvTextBg.src
    case "nature":
      return ADVENTURER_TEXT_BACKGROUNDS.natureAdvTextBg.src
    case "thunder":
      return ADVENTURER_TEXT_BACKGROUNDS.thunderAdvTextBg.src
    case "water":
      return ADVENTURER_TEXT_BACKGROUNDS.waterAdvTextBg.src
    case "starter":
      return ADVENTURER_TEXT_BACKGROUNDS.starterAdvTextBg.src
    // fallback value is the very first adventurer
    default:
      return ADVENTURER_TEXT_BACKGROUNDS.airAdvTextBg.src
  }
}

const getSuccessBackground = (element: string) => {
  switch (element) {
    case "air":
      return ADVENTURER_PROCESSING_BACKGROUNDS.airProcessing.src
    case "chaos":
      return ADVENTURER_PROCESSING_BACKGROUNDS.chaosProcessing.src
    case "earth":
      return ADVENTURER_PROCESSING_BACKGROUNDS.earthProcessing.src
    case "fire":
      return ADVENTURER_PROCESSING_BACKGROUNDS.fireProcessing.src
    case "ice":
      return ADVENTURER_PROCESSING_BACKGROUNDS.iceProcessing.src
    case "light":
      return ADVENTURER_PROCESSING_BACKGROUNDS.lightProcessing.src
    case "nature":
      return ADVENTURER_PROCESSING_BACKGROUNDS.natureProcessing.src
    case "thunder":
      return ADVENTURER_PROCESSING_BACKGROUNDS.thunderProcessing.src
    case "water":
      return ADVENTURER_PROCESSING_BACKGROUNDS.waterProcessing.src
    case "starter":
      return ADVENTURER_PROCESSING_BACKGROUNDS.starterProcessing.src
  }
}

const getAdventurerCard = (element: string) => {
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
    case "starter":
      return ADVENTURER_CARD_IMAGES.adventurerStarter.src
  }
}

const getBanner = (element: string) => {
  switch (element) {
    case "air":
      return ADVENTURER_BANERS.airBaner.src
    case "chaos":
      return ADVENTURER_BANERS.chaosBaner.src
    case "earth":
      return ADVENTURER_BANERS.earthBaner.src
    case "fire":
      return ADVENTURER_BANERS.fireBaner.src
    case "ice":
      return ADVENTURER_BANERS.iceBaner.src
    case "light":
      return ADVENTURER_BANERS.lightBaner.src
    case "nature":
      return ADVENTURER_BANERS.natureBaner.src
    case "thunder":
      return ADVENTURER_BANERS.thunderBaner.src
    case "water":
      return ADVENTURER_BANERS.waterBaner.src
    case "starter":
      return ADVENTURER_BANERS.starterBaner.src
  }
}

const getAdventurerIcon = (element: string) => {
  switch (element) {
    case "air":
      return ADVENTURER_ICONS.airIcon.src
    case "chaos":
      return ADVENTURER_ICONS.chaosIcon.src
    case "earth":
      return ADVENTURER_ICONS.earthIcon.src
    case "fire":
      return ADVENTURER_ICONS.fireIcon.src
    case "ice":
      return ADVENTURER_ICONS.iceIcon.src
    case "light":
      return ADVENTURER_ICONS.lightIcon.src
    case "nature":
      return ADVENTURER_ICONS.natureIcon.src
    case "thunder":
      return ADVENTURER_ICONS.thunderIcon.src
    case "water":
      return ADVENTURER_ICONS.waterIcon.src
    case "starter":
      return ADVENTURER_ICONS.starterIcon.src
  }
}
