// FIXME: shouldn't this page be removed? i don't think it's being used anymore
import HoveredButton from "@/components/HoveredButton"
import PreviewPackCard from "@/components/PreviewPackCard"
import { FOUNDERPACKS } from "@/utils/CONSTANTS"
import { PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/router"
import { MARKET_BACKGROUNDS } from "public/images"
import { useContext, useEffect, useState } from "react"
import success from "public/images/layout/success.png"
import processing from "public/images/layout/processing.svg"
import { UserContext } from "@/context/UserContext"
import { ClientContext } from "@/context/ClientContext/index"
import DeluxePacksWrapper from "@/components/DeluxePacksWrapper"

interface IFPack {
  id: string
  packData: {
    id: string
    type: string
    cardTypes: string[]
    rarityAllocations: string
    price: number
  }
}

const Packages = () => {
  const { intentId, setIntentId, setClientSecret } = useContext(ClientContext)
  const { isLoggedIn, fullUserData, fetchUserDetails } = useContext(UserContext)
  const [message, setMessage] = useState<string | null>(null)

  const router = useRouter()
  const { link } = router.query
  const stripe = useStripe()
  const elements = useElements()

  const data = FOUNDERPACKS[link as string]
  const rawQty = router.query.qty || "1"

  const [qty, setQty] = useState<number>(parseInt(rawQty as string)) // default to 1
  const [status, setStatus] = useState("")
  const [progress, setProgress] = useState(50)
  const [isProcessing, setIsProcessing] = useState<boolean>(false)

  useEffect(() => {
    fetch("/api/updatePaymentIntent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Connection: "keep-alive",
        Accept: "*/*",
      },
      body: JSON.stringify({
        intentId: intentId,
        selectedPrice: data.price * qty,
      }),
    })
      .then((r) => r.json())
      .then((response) => {
        // console.log("update response: ", response)
        setIntentId(response.updatedId)
        setClientSecret(response.updatedSecret)
      })
  }, [])

  // Todo: add success display
  const handleBuy = async (event: any) => {
    event.preventDefault()
    setMessage(null)
    if (!stripe) {
      console.log("ERROR IN STRIPE AND ELEMENTS!")
      return
    }

    const pack = data
    try {
      const { paymentIntent, error } = await stripe.confirmPayment({
        // @ts-expect-error
        elements,
        // @ts-expect-error
        redirect: "if_required",
      })

      if (error) {
        console.log("error while processing stripe payment", error)
        setMessage(error.message ? error.message : "Unknown error with payment.")
        return
      }

      if (paymentIntent) {
        console.log("INTENT:", paymentIntent)
        if (paymentIntent["status"] === "succeeded")
          // wait for a little bit
          await new Promise((resolve) => setTimeout(resolve, 250))
      }
      // we don't need to change the token balance here as it's a web2 purchase with real money

      //  add pack to users web2 assets
      const addPackToUserResult = await fetch("/api/updateUserWeb2Assets", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: fullUserData?.id,
          assets: [
            {
              id: pack.id,
              type: "founderpack",
              count: qty,
            },
          ],
        }),
      }).then((res) => res.json())

      console.log("addPackToUserResult", addPackToUserResult)
      fetchUserDetails()
      if (addPackToUserResult.status !== 200) throw new Error("error")

      // TODO: redirect if necessary or change state or whatever, add error handling

      // setProcessPhase("success");
    } catch (error) {
      console.log("error", error)
      // setProcessPhase("error");
    }
  }

  return (
    <DeluxePacksWrapper>
      <div className="details-wrapper">
        <Link href={`/premium-packs/packages/${data.title}`}>
          <PreviewPackCard card={data} buttonTitle="" />
        </Link>

        {status === "success" && (
          <div
            className="success-box"
            style={{
              backgroundImage: `url(/images/layout/fb/success-bg.png)`,
            }}
          >
            <h1>{data.title} Deluxe Pack</h1>
            <p>The pack contains plain assets</p>
            <Image src={success} alt="" />

            <HoveredButton
              bg={MARKET_BACKGROUNDS.explore_bg.src}
              hover={MARKET_BACKGROUNDS.explore_bg_hover.src}
              title="Show Collected"
              style={{
                width: "220px",
                height: "52px",
              }}
              onClick={() => router.push("/collection")}
            />
          </div>
        )}

        {status === "processing" && (
          <div
            className="success-box"
            style={{
              backgroundImage: `url(/images/layout/box-bg.png)`,
            }}
          >
            <h4>Your transfer is</h4>
            <h1>
              80 <span>USD</span>
            </h1>
            <p>The pack contains plain assets</p>
            <section>
              <div className="border" />
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 25,
                }}
              >
                <h2>Transaction Processing</h2>
                <div className={"progress"}>
                  <div className={"progressBar"} />
                  <div
                    className={"progressFill"}
                    style={{
                      transform: `rotate(${360 * progress}deg) `,
                    }}
                  />

                  <Image src={processing} alt="" />
                </div>
              </div>
            </section>
          </div>
        )}

        {!status && (
          <div className="founder-payments">
            <div className="payment-modal">
              <form onSubmit={handleBuy}>
                <PaymentElement id="payment-element" />
                <section>
                  <button
                    type="reset"
                    onClick={() => {
                      if (link) router.push(`/premium-packs/${link}`)
                    }}
                  >
                    Cancel
                  </button>
                  <button id="submit" type="submit" disabled={!isLoggedIn || isProcessing || !stripe || !elements}>
                    Pay ${data.price * qty}
                  </button>
                </section>
                {message && <div id="payment-message">{message}</div>}
              </form>
            </div>
          </div>
        )}
      </div>
    </DeluxePacksWrapper>
  )
}

export default Packages
