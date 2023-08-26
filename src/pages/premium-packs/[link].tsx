import { useRouter } from "next/router"
import { useContext, useState } from "react"
import CardCarousel from "@/components/CardCarousel"
import { FOUNDERPACKS } from "@/utils/CONSTANTS"
import plus from "public/images/icons/plus.svg"
import minus from "public/images/icons/minus.svg"
import Image from "next/image"
import { UserContext } from "@/context/UserContext"
import FpPurchaseStage from "@/components/FounderPacks/PurchaseStage"
import ErrorStage from "@/components/FounderPacks/ErrorStage"
import SuccessStage from "@/components/FounderPacks/SuccessStage"
import BuyButton from "@/components/FounderPacks/BuyButton"
import SoulboundDisclaimer from "@/components/SoulboundDisclaimer"
import DeluxePacksWrapper from "@/components/DeluxePacksWrapper"
import OpeningCarousel from "@/components/FounderPacks/OpeningCarousel"
import { FpOpeningStages } from "../collection/premium-packs/[link]"

const PurchaseStage = {
  preview: "preview",
  purchase: "purchase",
  success: "success",
  error: "error",
}

const FounderPack = () => {
  const router = useRouter()
  const { link } = router.query

  const { isLoggedIn, fullUserData, fetchUserDetails } = useContext(UserContext)

  const data = FOUNDERPACKS[link as string]

  const [qty, setQty] = useState(1)

  const [stage, setStage] = useState(PurchaseStage.preview)
  const [errorMessage, setErrorMessage] = useState("Unknown error")

  const maxQuantity = isLoggedIn ? Math.floor(fullUserData.web2Tokens / data.price) : 1

  const handleQtyChange = (increase: boolean) => {
    if (increase && qty < maxQuantity) {
      setQty(qty + 1)
    } else if (!increase && qty > 1) {
      setQty(qty - 1)
    }
  }

  const makePurchase = () => {
    let success = true
    if (!isLoggedIn) return

    setStage(PurchaseStage.purchase)
    setErrorMessage("Unknown error")

    const amount = -data.price * qty

    // since the amount is negative we need to multiply by -1
    if (-1 * amount > fullUserData.web2Tokens) {
      setStage(PurchaseStage.error)
      setErrorMessage("Not enough coins to make purchase")
      console.log("error is supposed to pop up here")
      return
    }

    fetch("/api/updateUserWeb2Tokens", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: fullUserData?.id,
        tokens: amount,
        type: 'buy-deluxepack'
      }),
    })
      .then((res) => res.json())
      .then((r) => {
        console.log("update tokens response", r)
        if (r.status !== 200) {
          setStage(PurchaseStage.error)
          setErrorMessage(r.message)
          success = false
          return
        }
      })

    console.log("token balance updated, first refetch here")
    fetchUserDetails()

    if (success) {
      fetch("/api/updateUserWeb2Assets", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: fullUserData?.id,
          assets: [
            {
              id: data.id,
              type: "founderpack",
              count: qty,
            },
          ],
        }),
      })
        .then((res) => res.json())
        .then((r) => {
          console.log("update assets response", r)
          if (r.status !== 200) {
            setStage(PurchaseStage.error)
            return
          }
        })

      setTimeout(() => {
        console.log("web2 assets updated, second refetch here")
        fetchUserDetails()
        setStage(PurchaseStage.success)
      }, 2500)
    }
  }

  return (
    <DeluxePacksWrapper>
      <div className="details-wrapper">
        <div>
          {stage === PurchaseStage.preview && (
            <>
              <div
                id="fp-main-container"
                style={{
                  backgroundImage: `url(${data.previewBg.src})`,
                }}
              >
                <div id="fp-info-container">
                  <h2>{data.title} deluxe pack</h2>
                  <p>{data.benefits.length} benefits.</p>
                  <h5>Contains off-chain assets. Not an NFT. Doesn't provide allocation. Can be Awakened.</h5>
                  <h3>
                    <span>
                      <Image src={"/images/new-store/ac-coin.svg"} alt="" width={50} height={50} />
                    </span>
                    <span>{data.price * qty} AC</span>
                  </h3>
                </div>
                <div id="fp-purchase-container">
                  <div id="pack-qty-label">
                    <h2>
                      {qty} Pack{qty > 1 && "s"}
                    </h2>
                    <div>
                      <Image
                        src={minus}
                        onClick={() => handleQtyChange(false)}
                        alt=""
                        style={{
                          opacity: qty > 1 ? 1 : 0.5,
                          cursor: qty > 1 ? "pointer" : "not-allowed",
                        }}
                      />

                      <Image
                        src={plus}
                        onClick={() => handleQtyChange(true)}
                        alt=""
                        style={{
                          opacity: qty === maxQuantity ? 0.5 : 1,
                          cursor: qty < maxQuantity ? "pointer" : "not-allowed",
                        }}
                      />
                    </div>
                  </div>
                  <div id="purchase-button">
                    <BuyButton callback={makePurchase} pack={data.title} text="BUY" />
                  </div>
                </div>
              </div>
              <div className="benefits-slider">
                <OpeningCarousel benefits={data.benefits} pack={data.title} stage={FpOpeningStages.preview} />
              </div>
              <SoulboundDisclaimer />
            </>
          )}
          {stage !== PurchaseStage.preview && (
            <div id="fp-purchase-process">
              {stage === PurchaseStage.purchase && <FpPurchaseStage />}
              {stage === PurchaseStage.error && (
                <ErrorStage error={errorMessage} callback={() => setStage(PurchaseStage.preview)} />
              )}
              {stage === PurchaseStage.success && (
                <SuccessStage
                  packType={data.title}
                  callback={() => {
                    router.push("/collection")
                  }}
                />
              )}
            </div>
          )}
        </div>
      </div>
    </DeluxePacksWrapper>
  )
}
export default FounderPack
