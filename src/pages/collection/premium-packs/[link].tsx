import CollectionWrapper, { CollectionDisplay } from "@/components/CollectionWrapper"
import DisplayBenefit from "@/components/FounderPacks/DisplayBenefit"
import OpenButton from "@/components/FounderPacks/OpenButton"
import OpeningCarousel, { IOPENBENEFIT } from "@/components/FounderPacks/OpeningCarousel"
import { UserContext } from "@/context/UserContext"
import { FOUNDERPACKS } from "@/utils/CONSTANTS"
import { openWeb2Pack } from "@/utils/fetchesToAPI"
import { IOpeningResult } from "@/utils/fpInterfaces"
import { useRouter } from "next/router"
import { useContext, useEffect, useState } from "react"
import Forward from "public/images/collection/founderpacks/benefits/Forward_button.svg"
import SoulboundDisclaimer from "@/components/SoulboundDisclaimer"

export enum FpOpeningStages {
  preview,
  opening,
  result,
  error,
}

const FounderPackOpening = () => {
  const router = useRouter()
  const { link } = router.query

  const { fullUserData } = useContext(UserContext)

  const pack = FOUNDERPACKS[link as string]


  useEffect(() => {
    if (pack) return;

    router.push("/collection")

  },[link])

  const [stage, setStage] = useState(FpOpeningStages.preview)
  const [displayBenefit, setDisplayBenefit] = useState<string | null>(null)
  const [result, setResult] = useState<null | IOpeningResult>(null)
  const [errorMessage, setErrorMessage] = useState("")

  const redirectToCollection = () => router.push("/collection?target=items")

  const openPack = () => {
    const packData = {
      id: pack.id,
      type: pack.title,
      cardTypes: ["founderpack"],
      price: 1,
    }

    console.log("opening the pack using", packData)
    openWeb2Pack(fullUserData?.id, packData).then((result) => {
      console.log("FP OPENING RESULT:", result)
      if (result.status === 200) {
        const openingResult = {
          common: result.data.card.filter((entry: any) => entry.rarity === "common"),
          founder: result.data.card.filter((entry: any) => ["epic", "rare", "legendary"].includes(entry.rarity)),
          adventurer: result.data.adventurer,
          emote: result.data.pack,
          cardBack: result.data.cardBack,
          ethernal: result.data.ethernal,
        }
        setResult(openingResult)
        setStage(FpOpeningStages.result)
      } else {
        console.log("ERROR IN OPENING:", result)
        setStage(FpOpeningStages.preview)
        setErrorMessage(result.message)
      }
    })
  }

  const openPackCallback = () => setStage(FpOpeningStages.opening)

  const handleReveal = (benefit: string) => {
    console.log("benefit to reveal:", benefit)
    setDisplayBenefit(benefit)
  }

  return (
    <CollectionWrapper
      displaySwitcher={redirectToCollection}
      displayValue={CollectionDisplay.packs}
      useOpeningBackground={true}
      title={""}
      hideSwitcher={true}
    >
      <div id="fp-opening-container" className={stage === FpOpeningStages.opening ? "opening-stage" : ""}>
        {stage !== FpOpeningStages.opening && (
          <>
            <div
              id="fp-main-container"
              style={{
                backgroundImage: `url(${pack.previewBg.src})`,
              }}
            >
              <div id="fp-info-container" className="fp-info-container">
                <h2>{pack.title} deluxe pack</h2>
                <p>{pack.benefits ? pack.benefits.length : 0} benefits.</p>
                <h5>Contains off-chain assets. Not an NFT. Doesn't provide allocation. Can be Awakened.</h5>
                {stage === FpOpeningStages.preview && (
                  <OpenButton pack={pack.title} callback={openPackCallback} text={"OPEN"} />
                )}
                {stage === FpOpeningStages.result && displayBenefit !== null && (
                  <div id="fp-info-back" onClick={() => setDisplayBenefit(null)}>
                    <h2>Back to the list</h2>
                    <img src={Forward.src} className="card-switcher-nav" />
                  </div>
                )}
              </div>
            </div>

            {errorMessage && <p>{errorMessage}</p>}

            <div className="benefits-slider">
              {displayBenefit === null && (
                <OpeningCarousel benefits={pack.benefits} pack={pack.title} stage={stage} callback={handleReveal} />
              )}
              {displayBenefit !== null && <DisplayBenefit result={result} benefit={displayBenefit} pack={pack.title} />}
            </div>
            <div className="disclaimer-text mt-14">
              <SoulboundDisclaimer />
            </div>
          </>
        )}
        {stage === FpOpeningStages.opening && (
          <video
            id="fp-opening-video"
            src={require("public/videos/fpOpening.webm")}
            muted
            autoPlay
            onEnded={openPack}
          />
        )}
      </div>
    </CollectionWrapper>
  )
}

export default FounderPackOpening
