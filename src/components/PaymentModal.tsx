import React, { FC, useCallback, useEffect, useState, useRef, useContext } from "react"
import { Elements, PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js"
import { ClientContext } from "@/context/ClientContext/index"
import { UserContext } from "@/context/UserContext"
import { MARKET_ICONS, MARKET_IMGS } from "public/images"

export const PaymentModal: FC<any> = (props) => {
  const [isProcessing, setIsProcessing] = useState<boolean>(false)
  const [message, setMessage] = useState<string | null>(null)
  const [success, setSuccess] = useState<boolean>(false)

  const { clientSecret, intentId, setClientSecret, setIntentId } = useContext(ClientContext)
  const { isLoggedIn, fullUserData, fetchUserDetails } = useContext(UserContext)

  const stripe = useStripe()
  const elements = useElements()

  const handleSubmit = async (event: any) => {
    setIsProcessing(true)

    event.preventDefault()
    if (!stripe) {
      console.log("ERROR IN STRIPE AND ELEMENTS!")
      return
    }

    try {
      const { paymentIntent, error } = await stripe.confirmPayment({
        // @ts-expect-error
        elements,
        // @ts-expect-error
        redirect: "if_required",
      })

      if (error) {
        console.log("some sort of error", error)
        setMessage(error.message ? error.message : "Unknown error with payment.")
      }

      if (paymentIntent) {
        if (paymentIntent["status"] === "succeeded")
          // wait for a little bit
          await new Promise((resolve) => setTimeout(resolve, 250))
        setIsProcessing(false)
        let successCheck = await fetch("/api/verifyPurchase/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Connection: "keep-alive",
            Accept: "*/*",
          },
          body: JSON.stringify({
            id: fullUserData?.id,
            intentId: intentId,
          }),
        }).then((r) => r.json())
        console.log("success check result:", successCheck)
        if (successCheck.success) {
          props.callback()
          // setSuccess(true);
          console.log("balance how has to be manually updated")
          fetchUserDetails()
        }
      }

      console.log("resulting paymentIntent:", paymentIntent)
    } catch (e: any) {
      console.log("payment intent confirmation error", e)
    }

    // setIsProcessing(false);
  }

  // TODO: depending on purchaseMethod display the correct Payment Request Button for Google Pay or Apple Pay
  return (
    <div className="payment-modal">
      <form onSubmit={handleSubmit}>
        <PaymentElement id="payment-element" />
        <section>
          {/* <div className="button-solid">Cancel</div> */}
          <button className="button-solid" onClick={() => props.setBuyCrystal(undefined)}>
            Cancel
          </button>
          <button
            className="button-solid"
            disabled={!isLoggedIn || isProcessing || !stripe || !elements}
            id="submit"
            type="submit"
          >
            {isProcessing ? "Processing ... " : `Pay $${props.buyCrystal.price}`}
          </button>
        </section>
        {message && <div id="payment-message">{message}</div>}
      </form>
    </div>
  )
}

export default PaymentModal
