import copper from "public/images/collection/founderpacks/benefits/copper-bg.webp"
import silver from "public/images/collection/founderpacks/benefits/silver-bg.webp"
import golden from "public/images/collection/founderpacks/benefits/golden-bg.webp"
import Image from "next/image"
import arrow from "public/images/icons/arrow.svg"
import { CSSProperties, FC, useState } from "react"
import { FpOpeningStages } from "@/pages/collection/premium-packs/[link]"
import OpenButton from "./OpenButton"
import CardNumber from "public/images/collection/founderpacks/benefits/cardNumber.svg"
import SoulBound from "./SoulBound"

export interface IOPENBENEFIT {
  id: number
  img: {
    normal: string
    hover: string
  }
  desc: string
  benefit: string
  style?: CSSProperties
  className?: string
  index?: number
  pack?: string
  stage?: FpOpeningStages
  callback?: (benefit: string) => void
  showReveal?: boolean
}

// all of these are either unavailable right now or simply dont have a design
const NO_REVEAL = ["heirloom", "discord-role", "name"]

export const BenefitCard: FC<IOPENBENEFIT> = ({
  id,
  img,
  desc,
  benefit,
  style,
  className,
  pack,
  stage,
  callback,
  showReveal,
}) => {
  let cardBg = copper
  const [hover, setHover] = useState(false)

  switch (pack) {
    case "legendary":
    case "founder":
      cardBg = golden
      break
    case "premium":
      cardBg = silver
      break
    default:
      cardBg = copper
      break
  }

  return (
    <div
      className={`fb-card-opening-wrapper ${className}`}
      style={{
        backgroundImage: `url(${cardBg.src})`,
        backgroundSize: "100% 100%",
        ...style,
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {stage === FpOpeningStages.preview && (
        <div className="opening-num-card">
          <h1>{id}</h1>
        </div>
      )}
      {stage === FpOpeningStages.result && (
        <div className="opening-num-card">
          {/* FIXME: display checkmark here */}
          <img src={CardNumber.src} className="opening-num-card-checkmark" />
        </div>
      )}
      <div
        className="body-card"
        // TODO: find images with higher resolution and .webp format
        style={{
          backgroundImage: `url(${hover ? img.hover : img.normal})`,
        }}
      >
        <div id="founder-card-soulbound">{benefit === "founder-card" && <SoulBound />}</div>
        <h4 className={`opening-description ${benefit === "founder-card" && "opening-description-soulbound"}`}>
          {desc}
        </h4>
        {!NO_REVEAL.includes(benefit) && stage === FpOpeningStages.result && showReveal && (
          <OpenButton pack={pack || "classic"} callback={() => callback!(benefit)} text={"REVEAL"} />
        )}
      </div>
    </div>
  )
}

const OpeningCarousel: FC<any> = (props: {
  callback: ((benefit: string) => void) | undefined
  benefits: IOPENBENEFIT[]
  pack: string
  stage: FpOpeningStages
}) => {
  const [cards, setCards] = useState(props.benefits)

  // console.log('PACK FOR CAROUSEL:', props.pack)

  const ScrollCards = (dir: string) => {
    var _temp = [...cards] as any
    if (dir === "right") {
      _temp.push(_temp.shift())
    } else {
      _temp.unshift(_temp.pop())
    }
    setCards(_temp)
  }

  return (
    <div className="card-carousel">
      <div className="controls-carousel">
        <Image src={arrow} alt="arrow" onClick={() => ScrollCards("left")} />
        {props.benefits && (
          <>
            <h3>Contains {cards.length} Benefits</h3>
          </>
        )}
        <Image src={arrow} alt="arrow" onClick={() => ScrollCards("right")} />
      </div>
      <div className="opening-carousel-cont">
        {cards.map((benefit: IOPENBENEFIT, idx: number) => {
          return (
            <BenefitCard
              key={benefit.id}
              {...benefit}
              index={idx}
              pack={props.pack}
              stage={props.stage}
              callback={props.callback}
              className={idx === 4 ? "last-card r" : idx === 5 ? "last-card l" : ""}
              showReveal={props.stage === FpOpeningStages.result}
            />
          )
        })}
      </div>
    </div>
  )
}

export default OpeningCarousel
