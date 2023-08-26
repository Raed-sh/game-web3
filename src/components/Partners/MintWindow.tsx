import { useContext, useEffect, useState } from "react"
import { StaticImageData } from "next/image"
import { createShinamiWallet, getShinamiWallet, mintEmote } from "@/utils/fetchesToAPI"

import suiIcon from "public/images/partners/Sui-active.webp"
import suiIconInactive from "public/images/partners/Sui.webp"
import suiAnimation1 from "public/images/partners/Sui-animation-part-1.webp"
import suiAnimation2 from "public/images/partners/Sui-animation-part-2.webp"

import mystenIcon from "public/images/partners/MysteLabs-active.webp"
import mystenIconInactive from "public/images/partners/MysteLabs.webp"
import mystenAnimation1 from "public/images/partners/Mysternlabs-animation-part-1.webp"
import mystenAnimation2 from "public/images/partners/Mysternlabs-animation-part-2.webp"

import aetherLogo from "public/images/partners/A-sign.webp"

import { capitalizeFirstLetter } from "../Card"
import { useRouter } from "next/router"
import { MintButtonProps } from "./MintButtonProps"
import CloseButton from "./CloseButton"
import { FP_PURCHASE } from "public/images"
import { UserContext } from "@/context/UserContext"

// TODO: cleanup partners
interface IPartner {
  id: string
  title: string
  text: string
  icon: {
    active: StaticImageData
    normal: StaticImageData
  }
  animation: {
    part1: StaticImageData
    part2: StaticImageData
  }
  background: null
  active: boolean
}

const Sui: IPartner = {
  id: "sui",
  title: "sui partnership emotes",
  text: "sui partnership emote",
  icon: {
    active: suiIcon,
    normal: suiIconInactive,
  },
  animation: {
    part1: suiAnimation1,
    part2: suiAnimation2,
  },
  background: null,
  active: true,
}

const Mysten: IPartner = {
  id: "mysten",
  title: "mysten labs partnership emotes",
  text: "mysen labs partnership emote",
  icon: {
    active: mystenIcon,
    normal: mystenIconInactive,
  },
  animation: {
    part1: mystenAnimation1,
    part2: mystenAnimation2,
  },
  background: null,
  active: true,
}

export const Partners: IPartner[] = [Sui, Mysten]

enum MintStages {
  preview,
  mint,
  result,
}

export const MintWindow = (props: { closeCallback: () => void }) => {
  const router = useRouter()
  const { fullUserData, hasCrafted, checkIfHasCrafted } = useContext(UserContext)
  const userId = fullUserData.id

  const [stage, setStage] = useState(MintStages.preview)
  // it'll be constantly stuck on Sui and that's intended
  const [selectedPartner, setSelectedPartner] = useState(Sui)

  const [shinamiWallet, setShinamiWallet] = useState(null)

  const [result, setResult] = useState<any>(null)

  const mint = async () => {
    console.log("mint logic goes here")
    setStage(MintStages.mint)

    let wallet = await getShinamiWallet(userId)
    if (wallet.code) {
      wallet = await createShinamiWallet(userId)
    }
    console.log("wallet: ", wallet)
    setShinamiWallet(wallet)
    const mintResult = await mintEmote(userId, wallet)
    console.log("Minted Emote: ", mintResult)

    if (!mintResult.message) {
      setResult(mintResult.display.data)
    } else {
      checkIfHasCrafted()
    }

    // let it sping for a bit
    setTimeout(() => {
      setStage(MintStages.result)
    }, 1250)
  }

  const switchBg = () => {
    if (stage === MintStages.mint) {
      setTimeout(() => switchBg(), 250)
    }
    return
  }

  useEffect(() => {
    setStage(MintStages.preview)
  }, [selectedPartner])

  return (
    <div id="partners-mint-wrapper">
      <div id="partners-mint-popup">
        <div id="partners-close-wrapper">
          <CloseButton callback={() => props.closeCallback()} />
        </div>
        <div id="partners-mint-title">
          <h2>Get tradable partner emotes!</h2>
          <div id="partner-title-logo">
            <h3>{selectedPartner.title}</h3>
            <img src={selectedPartner.icon.active.src} />
          </div>
        </div>
        <div id="partners-switcher">
          {Partners.map((partner) => {
            return (
              <div
                id={`partner-${partner.id}`}
                className="partner-button"
                // className={partner === selectedPartner ? 'partner-button partner-active' : 'partner-button'}
                // onClick={() => setSelectedPartner(partner)}
              >
                <h3>{partner.id === "sui" ? "Sui" : "Mystenlabs"}</h3>
                <img src={partner.icon.active.src} className="partner-switcher-icon" />
              </div>
            )
          })}
        </div>
        <div id="partners-main">
          {!hasCrafted ? (
            <>
              {stage === MintStages.preview && (
                <div id="stage-preview" className="partner-stage">
                  <div>
                    <div id="partners-disclaimer">
                      <h3 className=" text-2xl text-left pb-2 self-start">SUI EMOTE MINT</h3>
                      {/* Unleash your wicked allure and shine through the realm of Сards of Ethernity with our captivating
                      Emotes collection. Each Emote embodies the essence of darkness, allowing you to taunt your enemies
                      and leave them trembling in fear.
                      <b></b> */}
                      <p>
                        Let's celebrate Cards of Ethernity Launch on Sui Mainnet and light up the spark of Mysten Labs
                        partnership with Aether Games Inc.
                      </p>
                      <b></b>
                      <p>Emotes will be minted to your in-game SUI wallet</p>
                      <p>and you can transfer them out any time.</p>
                    </div>
                    {/* <p id="partners-disclaimer">
                      Unleash your wicked allure and shine through the realm of Сards of Ethernity with our captivating
                      Emotes collection. These in-game assets are infused with grins that chill the soul, evil laughter
                      that echoes in the shadows, and sinister grimaces that ignite a sense of malevolent power. Each
                      Emote embodies the essence of darkness, allowing you to taunt your enemies and leave them
                      trembling in fear.
                      <b></b>
                      These Emotes celebrate Cards of Ethernity Launch on Sui Mainnet and light up the spark of Mysten
                      Labs partnership with Aether Games Inc. These will be minted to your in-game SUI wallet and you
                      can transfer them out any time.
                    </p> */}
                    <MintButtonProps callback={() => mint()} text={"Craft"} />
                  </div>
                  <div id="partners-main-right">
                    <div
                      className="partner-logo-container"
                      style={{
                        backgroundImage: `url(${selectedPartner.animation.part1.src})`,
                      }}
                    ></div>
                  </div>
                </div>
              )}
              {stage === MintStages.mint && (
                <div id="stage-mint" className="partner-stage">
                  <div id="partners-main-text">
                    <h2>Crafting...</h2>
                    <h3>{capitalizeFirstLetter(selectedPartner.id)} partnership emote.</h3>
                  </div>
                  <div id="partners-main-right">
                    <div id="partner-spinner">
                      <img id="partner-spinner-outer" src={FP_PURCHASE.icons.fpProcessing.src} />
                      <img id="partner-spinner-inner" src={aetherLogo.src} />
                    </div>
                  </div>
                </div>
              )}
              {stage === MintStages.result && (
                <div id="stage-result" className="partner-stage">
                  <div id="partners-main-text">
                    <h2>Congrats!</h2>
                    <h3>You crafted {capitalizeFirstLetter(selectedPartner.id)} partnership emote.</h3>
                    <MintButtonProps callback={() => router.push("/collection")} text={"Show item"} />
                  </div>
                  <div id="partners-main-right">
                    <div id="partners-result-display">
                      {result && (
                        <>
                          <h2>{result.name}</h2>
                          <img id="result-emote" src={result.image_url} />
                          <h3>{result.rarity}</h3>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </>
          ) : (
            <div id="already-crafted-message" className="partner-stage">
              <h2>You have already crafted a partnership emote.</h2>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
