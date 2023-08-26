import { Elements } from "@stripe/react-stripe-js"
import { Appearance, Stripe } from "@stripe/stripe-js"
import React, { useEffect, useState, useContext } from "react"
import { ClientContext } from "@/context/ClientContext/index"
import getStripe from "@/utils/get-stripe"

const cardFonts = [
  {
    src: "http://fonts.googleapis.com/css?family=Roboto:400,100,100italic,300,300italic,400italic,500,500italic,700,700italic,900italic,900",
    family: "Roboto",
  },
]

const appearance: Appearance = {
  theme: "night",
  variables: {
    colorPrimary: "white",
    borderRadius: "0px",
  },
  rules: {
    ".Input": {
      border: "none",
      borderBottom: "1px solid #7E7057",
      boxShadow: "none",
      backgroundColor: "transparent",
      borderRadius: "0px",
      fontFamily: "Roboto",
      fontWeight: "700",
      fontSize: "16px",
      letterSpacing: "0.08em",
      color: "#BAB3BB",
    },
    ".Label": {
      fontFamily: "Roboto",
      fontWeight: "300",
      fontSize: "16px",
      lineHeight: "19px",

      letterSpacing: "0.08em",

      color: "#D9D9D9",
      paddingLeft: ".5rem",
    },
  },
}

const getStripeInstance = async () => await getStripe()

const loadStripeAndCreateIntent = async () => {
  const { intentId, clientSecret } = await fetch("/api/createPaymentIntent", {
    method: "POST",
  }).then((r) => r.json())
  return {
    newIntentId: intentId,
    newClientSecret: clientSecret,
  }
}

const StripeElementsWrapper = (props: { children: any }) => {
  const { clientSecret, setClientSecret, intentId, setIntentId } = useContext(ClientContext)
  const [stripe, setStripe] = useState<Stripe | null>(null)

  const executeInitialStripeSettings = async () => {
    const stripeInstance = await getStripeInstance()
    if (stripeInstance) {
      setStripe(stripeInstance)
    }

    let existingIntent = null

    if (clientSecret) {
      console.log("fetch existitng")
      existingIntent = await stripeInstance?.retrievePaymentIntent(clientSecret)
    }
    console.log("there is an intent?", existingIntent)
    if (existingIntent) {
      if (existingIntent.paymentIntent?.status !== "succeeded") {
        setIntentId(existingIntent.paymentIntent?.id)
        setClientSecret(existingIntent.paymentIntent?.client_secret)
        return
      }
    }

    const { newIntentId, newClientSecret } = await loadStripeAndCreateIntent()
    if (stripeInstance && newIntentId && newClientSecret) {
      setIntentId(newIntentId)
      setClientSecret(newClientSecret)
    }
  }

  useEffect(() => {
    executeInitialStripeSettings()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      {stripe && clientSecret ? (
        <Elements
          key={intentId}
          stripe={stripe}
          options={{
            clientSecret,
            appearance,
            fonts: cardFonts,
          }}
        >
          {props.children}
        </Elements>
      ) : null}
    </>
  )
}

export default StripeElementsWrapper
