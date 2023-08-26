import CollectionWrapper, { CollectionDisplay } from "@/components/CollectionWrapper"
import DisplayBenefit from "@/components/FounderPacks/DisplayBenefit"
import OpenButton from "@/components/FounderPacks/OpenButton"
import OpeningCarousel, { IOPENBENEFIT } from "@/components/FounderPacks/OpeningCarousel"
import { UserContext } from "@/context/UserContext"
import {
  BURN_N_MINT_CONTRACT_ADDRESS,
  WEB3_FOUNDERPACKS,
} from "@/utils/CONSTANTS"
import { getUserWeb3Assets, updateWeb2AssetsAfterFPOpening } from "@/utils/fetchesToAPI"
import { IOpeningResult } from "@/utils/fpInterfaces"
import { useRouter } from "next/router"
import { useContext, useEffect, useState } from "react"
import Forward from "public/images/collection/founderpacks/benefits/Forward_button.svg"
import SoulboundDisclaimer from "@/components/SoulboundDisclaimer"
import { approveFpSpending } from "@/utils/web3Functions/approval"
import { openFP } from "@/utils/web3Functions/openings"
import { Chain, useAccount, useContractEvent, useDisconnect, useNetwork } from "wagmi"
import { useWeb3Modal } from "@web3modal/react"
import { switchNet, switchNetWithCheck } from "@/utils/web3Functions/switchNet"

interface ILog {
  address: string
  blockHash: string
  blockNumber: number
  data: string
  args: {
    opener: string
    cards: number[]
    ethernal: number
    adventurer: number
  }
}

export enum FpOpeningStages {
  preview,
  opening,
  result,
  error,
}

const trimLastToInt = (str: string) => parseInt(str.substring(0, str.length - 1))

// pads the id with zeroes to desired length - legacy thing to make the card images work
const leftPad = (id: string) => `${ '0'.repeat(7-id.length) }${ id }`

const openingStagesText = [
  "Opening...",
  "1/4 Please sign approval in your mobile wallet.",
  "2/4 Please confirm the transaction in your mobile wallet.",
  "3/4 Powering up your pack. Please, be patient and do not close the window.",
  "4/4 Powering up complete! Please, confirm opening your founder pack in your mobile wallet.",
  "Error. Please, try agaim.",
]


// both adventurerIds and ethernalIds are ordered corresponding to the return value
const adventurerIds = [
  "Adventurer-human-Water-Adventurer_of_Water-full",
  "Adventurer-human-Light-Adventurer_of_Light-full",
  "Adventurer-human-Ice-Adventurer_of_Ice-full",
  "Adventurer-human-Chaos-Adventurer_of_Chaos-full",
  "Adventurer-human-Air-Adventurer_of_Air-full",
  "Adventurer-human-Nature-Adventurer_of_Nature-full",
  "Adventurer-human-Thunder-Adventurer_of_Thunder-full",
  "Adventurer-human-Fire-Adventurer_of_Fire-full",
  "COE-0000079-Adventurer-human-Earth-Adventurer_of_Earth-full",
]

const ethernalIds = [
  "COE-0000162-Ethernals-dragon-chaos-Tergy_Black-Concept",
  "COE-0000163-Ethernals-dragon-chaos-Gold_Tergy-Concept",
  "Ethernals-beast-light-Shining_Panther",
  "COE-0000170-Ethernals-demon-water-Gog-Tomak-Concept",
  "COE-0000171-Ethernals-dragon-water-Posera-Concept",
]

interface IRawResult {
  adventurer: number
  cards: number[]
  ethernal: number
  opener: string
}

const FounderPackOpening = () => {
  const { address, isConnected } = useAccount()
  const { chain } = useNetwork()
  const { open } = useWeb3Modal()
  const { disconnect } = useDisconnect()
  const router = useRouter()
  const { fullUserData } = useContext(UserContext)

  const pack = WEB3_FOUNDERPACKS.founder

  console.log("WEB3 PACK:", pack)

  const [stage, setStage] = useState(FpOpeningStages.preview)
  const [displayBenefit, setDisplayBenefit] = useState<string | null>(null)
  const [result, setResult] = useState<null | IOpeningResult>(null)
  const [opening, setOpening] = useState(false)
  const [openingStage, setOpeningStage] = useState(0)
  const [rawResult, setRawResult] = useState<IRawResult>()
  const [errorMessage, setErrorMessage] = useState("")
  const [videoShown, setVideoShown] = useState(false)

  const redirectToCollection = () => router.push("/collection?target=items")

  const handleOpening = async () => {
    console.log("starting opening")
    const fpOpeningResult = await openFP(fullUserData.account, (result) => setOpeningStage(result))
    if (fpOpeningResult.success) {
      setOpeningStage(0)
      const result = updateWeb2AssetsAfterFPOpening(fullUserData.id, fpOpeningResult.tx).then((result) => {
        console.log("fp web2 request result", result)
        if (result.status === 200) {
          
        } else {
          console.log('issue in the fp web2 request', result)
        }
      })
    } else {
      console.log("success is false in opening")
      setErrorMessage(fpOpeningResult.message)
      setOpening(false)
      setOpeningStage(0)
      setStage(FpOpeningStages.preview)
    }
    console.log("fp opening result:", fpOpeningResult)
  }

  const processRawResult = () => {
    if (!rawResult) return
    let basic: any[] = [], uncommon: any[] = [],common: any[] = [], founder: any[] = [], adventurer: any = null, ethernal: any = null
    const advId = adventurerIds[rawResult.adventurer]
    const ethernalId = ethernalIds[rawResult.ethernal]
    getUserWeb3Assets(fullUserData.id).then((r) => {
      console.log('loadWeb3Assets response', r)
      if (!r.status || r.status !== 404) {
        const cleanCardIds = rawResult.cards.map(c => leftPad(`${c}`));
        console.log('CLEAN CARDIDS:', cleanCardIds)
        cleanCardIds.map((cId) => {
          const matchingCard = r.cards.filter((c: any) => c.id === cId)[0]
          if (matchingCard) {
            const processedCard = {
              isNFT: true,
              id: matchingCard.id,
              count: 1,
              attack: matchingCard.attributes.Attack,
              circulation: 0,
              description: matchingCard.description,
              element: matchingCard.attributes.Element.toLowerCase(),
              hp: matchingCard.attributes.HP,
              mana: matchingCard.attributes.Mana,
              name: matchingCard.name,
              race: matchingCard.attributes.Race ? matchingCard.attributes.Race : "none",
              rarity: matchingCard.attributes.Rarity,
              season: matchingCard.attributes.Season,
              type: matchingCard.attributes.Type
            }
            switch (processedCard.rarity) {
              case "common":
                common.push(processedCard)
                break
              case "uncommon":
                uncommon.push(processedCard)
                break
              case "rare":
              case "epic":
              case "legendary":
                founder.push(processedCard)
                break
              default:
                basic.push(processedCard)
                break
            }
          }
        })
        adventurer = r.adventurers.filter((a: any) => a.id === advId)[0]
        ethernal = r.ethernals.filter((a: any) => a.id === ethernalId)[0]
      }

      const openingResult = {
        basic: basic,
        common: common,
        uncommon: uncommon,
        founder: founder,
        adventurer: {
          isNFT: true,
          id: adventurer.id,
          name: adventurer.name,
          image: adventurer.image,
          attack: adventurer.attributes.Attack,
          description: adventurer.description,
          element: adventurer.attributes.Element.toLowerCase(),
          hp: adventurer.attributes.HP,
          mana: adventurer.attributes.Mana,
          rarity: adventurer.attributes.Rarity,
          type: adventurer.attributes.Type,
          count: 1,
        },
        ethernal: ethernal,
      }
      console.log("TRANSFORMED RESULT:", openingResult)

      setResult(openingResult)
      if (!videoShown) {
        setStage(FpOpeningStages.opening)
      }
    })
  }

  useEffect(() => {
    if (rawResult && fullUserData) {
      // setOpeningStage(4)
      processRawResult();
    }
  }, [rawResult, fullUserData])

  useContractEvent({
    address: BURN_N_MINT_CONTRACT_ADDRESS,
    abi: [
      {
        anonymous: false,
        inputs: [
          { indexed: true, internalType: "address", name: "opener", type: "address" },
          { indexed: false, internalType: "uint256[]", name: "cards", type: "uint256[]" },
          { indexed: false, internalType: "uint256", name: "ethernal", type: "uint256" },
          { indexed: false, internalType: "uint256", name: "adventurer", type: "uint256" },
        ],
        name: "Opened",
        type: "event",
      },
    ] as const,
    eventName: "Opened",
    listener(logs) {
      console.log("Opened event:", logs[0].args)
      // @ts-ignore
      if (logs[0].args.opener === fullUserData.account) setRawResult(logs[0].args)
    },
  })

  useEffect(() => {
    disconnect()
  }, [])

  useEffect(() => {
    if (fullUserData) {
      console.log("connected with address:", address)
      if (isConnected && errorMessage === "Wallet not connected") {
        setErrorMessage("")
      }
      if (isConnected && address !== fullUserData.account) {
        disconnect()
        setErrorMessage(`Please connect with ${fullUserData.account}`)
      } else if (isConnected && address === fullUserData.account) {
        setErrorMessage("")
      }
    }
  }, [isConnected, fullUserData])

  const checkApprovalAndOpen = async () => {
    console.log("FUD in opening", fullUserData)
    if (isConnected) {
      console.log('ic')
      try {
        const network = await switchNetWithCheck(chain as Chain)
        if (network) {
          try {
            setOpening(true)
            setOpeningStage(1)
            const localApproval = await approveFpSpending(fullUserData.account)
            if (localApproval) {
              setOpeningStage(2)
              await handleOpening().catch(console.error)
            }
          } catch (e) {
            console.log("error during approval", e)
            setErrorMessage("Please reconnect the wallet")
          }
        }
      } catch (error) {
        console.log('error while trying to switch network')
        setErrorMessage("You need to add Polygon Mainnet to list of networks in your wallet")
      }
    } else {
      setErrorMessage("Wallet not connected")
      // the RPC error sometimes pops up here
      try {
        open()
      } catch (error) {
        console.log("Error when trying to open the wallet connect", error)
      }
    }
  }

  const openPackCallback = async () => {
    await checkApprovalAndOpen()
  }

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
                <h2>{pack.title} pack</h2>
                <p>{pack.benefits ? pack.benefits.length : 0} benefits.</p>
                <h5>Contains web3 assets. Could be used as tradable items.</h5>
                {stage === FpOpeningStages.preview && (
                  opening ? <h4 className="mt-2" style={{ maxWidth: "300px", color: "white !important"}}>
                    {openingStagesText[openingStage]}
                  </h4> : <OpenButton pack={pack.title} callback={openPackCallback} text={"OPEN"} />
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
              {displayBenefit !== null && <DisplayBenefit result={result} benefit={displayBenefit} pack={pack.title} isNFT={true}/>}
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
            onEnded={() => {
              setVideoShown(true)
              setStage(FpOpeningStages.result)
            }}
          />
        )}
      </div>
    </CollectionWrapper>
  )
}

export default FounderPackOpening
