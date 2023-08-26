import { useRouter } from "next/router"
import { useContext, useState, useEffect } from "react"
import CardCarousel from "@/components/CardCarousel"
import { WEB3_FOUNDERPACKS } from "@/utils/CONSTANTS"
import plus from "public/images/icons/plus.svg"
import minus from "public/images/icons/minus.svg"
import Image from "next/image"
import { UserContext } from "@/context/UserContext"
import { CurrencyContext, CURRENCIES } from "@/context/CurrencyContext"
import FpPurchaseStage from "@/components/FounderPacks/PurchaseStage"
import ErrorStage from "@/components/FounderPacks/ErrorStage"
import SuccessStage from "@/components/FounderPacks/SuccessStage"
import BuyButton from "@/components/FounderPacks/BuyButton"
import SoulboundDisclaimer from "@/components/SoulboundDisclaimer"
import DeluxePacksWrapper from "@/components/DeluxePacksWrapper"
import OpeningCarousel from "@/components/FounderPacks/OpeningCarousel"
import { FpOpeningStages } from "../../collection/premium-packs/[link]"
import legendaryPreviewBg from "public/images/layout/fb/bg-fp-info-golden.webp"
import CurrencySwitch from "@/components/CurrencySwitch"
import { CURRENCY } from "public/images";
import { approve, checkApprovedAEG } from "@/utils/web3Functions/approval"
import { mintFp } from "@/utils/web3Functions/mintings"
import { switchNet } from "@/utils/web3Functions/switchNet"
import { FP_PURCHASE } from "public/images"
import { MARKET_ICONS } from "public/images"
import Button from "@/components/FounderPacks/Button"
import { useWeb3Modal } from "@web3modal/react"
import {
    useAccount,
    useDisconnect,
    useSwitchNetwork,
} from "wagmi"

// import { openFP } from "@/utils/web3Functions/openings"
// import { approveFpSpending } from "@/utils/web3Functions/approval"

const PurchaseStage = {
    preview: "preview",
    purchase: "purchase",
    approve: "approve",
    success: "success",
    error: "error",
}

const AEG_PRICE = 0.045

const FounderPack = () => {
    const router = useRouter()

    const { isLoggedIn, fullUserData, fetchUserDetails } = useContext(UserContext)
    const { currency, setCurrency } = useContext(CurrencyContext);
    const [price, setPrice] = useState(WEB3_FOUNDERPACKS.founder.price)
    const [stage, setStage] = useState(PurchaseStage.preview)
    const [errorMessage, setErrorMessage] = useState("Unknown error")
    const { address, isConnected } = useAccount()
    const { switchNetwork, chains } = useSwitchNetwork()
    const { disconnect } = useDisconnect()
    const { open } = useWeb3Modal()

    useEffect(() => {
        disconnect()
    }, [])

    useEffect(() => {
        if (isConnected) {
            const data = switchNet()
        }
    }, [isConnected])


    useEffect(() => {
        if (currency.text == "aeg") {
            setPrice(WEB3_FOUNDERPACKS.founder.price / AEG_PRICE)
        } else {
            setPrice(WEB3_FOUNDERPACKS.founder.price)
        }
    }, [currency])

    // const openFp = async () => {
    //     if (isConnected && address) {
    //         console.log("Connected")
    //         if (currency.text == "aeg") {
    //             setStage(PurchaseStage.purchase)

    //             const isFPApproved = await approveFpSpending(address)
    //             if (!isFPApproved) {
    //                 setStage(PurchaseStage.error)
    //                 setErrorMessage("FP Approval Failed.")
    //                 return
    //             }

    //             const openFounderPack = await openFP(address)

    //             if (openFounderPack) {
    //                 setStage(PurchaseStage.success)
    //             } else {
    //                 setStage(PurchaseStage.error)
    //                 setErrorMessage("FP opening failed.")
    //                 return
    //             }
    //         }
    //     } else {
    //         console.log("Not Connected")
    //         open()
    //     }
    // } USED THIS JUST FOR TESTING THE OPEN FP FUNCTIONS, CAN BE REMOVED

    const makePurchase = async () => {
        if (isConnected && address) {
            //if (address == fullUserData.account) {
            console.log("Connected")

            fetchUserDetails()
            const checkApprAEG = await checkApprovedAEG(address, price, currency.text)

            if (!checkApprAEG) {
                setStage(PurchaseStage.approve)
                const isAEGApproved = await approve(price, currency.text)
                if (!isAEGApproved) {
                    setStage(PurchaseStage.error)
                    setErrorMessage(currency.text + " Approval Failed.")
                    return
                }
            }
            setStage(PurchaseStage.purchase)
            const mintFounderPack = await mintFp(1, 1, currency.text)

            if (mintFounderPack) {
                setStage(PurchaseStage.success)
            } else {
                setStage(PurchaseStage.error)
                setErrorMessage("FP minting failed.")
                return
            }
            /*} else {
                disconnect()
                setStage(PurchaseStage.error)
                setErrorMessage("Please connect the wallet connected to your account to complete the tx: " + fullUserData.account)
            }*/
        } else {
            console.log("Not Connected")
            open()
        }
    }

    return (
        <DeluxePacksWrapper>
            <div>
                <div className="currency-switch-container">
                    <div>
                        <CurrencySwitch type="founder"></CurrencySwitch>
                    </div>
                </div>
                <div className="details-wrapper">
                    <div>
                        {stage === PurchaseStage.preview && (
                            <>
                                <div
                                    id="fp-main-container"
                                    style={{
                                        backgroundImage: `url(${legendaryPreviewBg.src})`,
                                    }}
                                >
                                    <div id="fp-info-container">
                                        <h2>Founder Pack</h2>
                                        <h3>
                                            <span>
                                                <Image src={currency.image.icon} alt="" width={50} height={50} />
                                            </span>
                                            <span>{price} {currency.text}</span>
                                        </h3>
                                    </div>
                                    <div id="fp-purchase-container">
                                        {isConnected ? (
                                            <div id="purchase-button">
                                                <BuyButton callback={makePurchase} pack={WEB3_FOUNDERPACKS.founder.title} text="BUY" />
                                            </div>
                                        ) : (
                                            <div id="purchase-button">
                                                <BuyButton callback={makePurchase} pack={WEB3_FOUNDERPACKS.founder.title} text="Connect Wallet" />
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className="benefits-slider">
                                    <OpeningCarousel benefits={WEB3_FOUNDERPACKS.founder.benefits} pack={WEB3_FOUNDERPACKS.founder.title} stage={FpOpeningStages.preview} />
                                </div>
                            </>
                        )}
                        {stage !== PurchaseStage.preview && (
                            <div id="fp-purchase-process">
                                {stage === PurchaseStage.purchase &&
                                    <div id='fp-purchase-stage'>
                                        <img id='fp-stage-bg' src={FP_PURCHASE.bg.src} />
                                        <h2 id="transfer">Your transfer is <span>  {price} {currency.text}</span></h2>
                                        <h2 id="transfer">Please, accept the minting transaction in your mobile wallet</h2>
                                        <h3 id='transaction-process'>Transaction Processing</h3>
                                        <div id='fp-purchase-spinner'>
                                            <img id='fp-spinner-outer' src={FP_PURCHASE.icons.fpProcessing.src} />
                                            <img id='fp-spinner-inner' src={FP_PURCHASE.icons.fpProcessingIcon.src} />
                                        </div>
                                    </div>}
                                {stage === PurchaseStage.approve &&
                                    <div id='fp-purchase-stage'>
                                        <img id='fp-stage-bg' src={FP_PURCHASE.bg.src} />
                                        <h2 id="transfer">Please, sign approval transaction in your mobile wallet </h2>
                                        <h3 id='transaction-process'>Waiting for approval</h3>
                                        <div id='fp-purchase-spinner'>
                                            <img id='fp-spinner-outer' src={FP_PURCHASE.icons.fpProcessing.src} />
                                            <img id='fp-spinner-inner' src={FP_PURCHASE.icons.fpProcessingIcon.src} />
                                        </div>
                                    </div>}
                                {stage === PurchaseStage.error && (
                                    <ErrorStage error={errorMessage} callback={() => setStage(PurchaseStage.preview)} />
                                )}
                                {stage === PurchaseStage.success && (
                                    <div id='fp-success'>
                                        <img id='fp-stage-bg' src={FP_PURCHASE.packBg.legendary.src} />
                                        <div id='fp-success-content'>
                                            <h1 id='fp-success-title'>
                                                Founder Pack
                                            </h1>
                                            {/* TODO: show plain/tradeable assets once the latter is implemented */}
                                            <h3 id='fp-success-text'>Successfully minted!</h3>
                                            <div id='fp-success-checkmark'>
                                                <img src={MARKET_ICONS.success.src} />
                                            </div>
                                            <div id='fp-success-btn'>
                                                <Button text={"SHOW COLLECTED"} callback={() => {
                                                    router.push("/collection")
                                                }} />
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </DeluxePacksWrapper>
    )
}
export default FounderPack