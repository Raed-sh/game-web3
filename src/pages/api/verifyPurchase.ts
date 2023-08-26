import type { NextApiRequest, NextApiResponse } from "next"
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2022-11-15",
})

const TOKEN_PRICE_AND_AMOUNT = {
  250: 1000,
  500: 2100,
  1000: 4400,
  2000: 9000,
  5000: 23200,
  10000: 50000,
}

const getTokensFromAmount = (amount: number) => {
  let result = 0
  TOKEN_PRICE_AND_AMOUNT &&
    Object.keys(TOKEN_PRICE_AND_AMOUNT).map((storedAmount, index) => {
      if (parseInt(storedAmount) === amount) result = Object.values(TOKEN_PRICE_AND_AMOUNT)[index]
    })
  return result
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log("rec body", req.body)
  const { intentId } = req.body

  if (!intentId) {
    res.status(400).send({
      error: {
        message: "Missing the intentId",
      },
    })
    return
  }
  // }
  // const newAmount = parseFloat(selectedPrice) * 100;
  try {
    const paymentIntent = await stripe.paymentIntents.retrieve(intentId)
    // neither are changing here but send them just in case it's needed later
    if (paymentIntent.status === "succeeded") {
      console.log("making a request to BE using:", {
        id: req.body.id,
        tokens: getTokensFromAmount(paymentIntent.amount),
      })
      const response = await fetch(`${process.env.API_URL}/updateUserWeb2Tokens`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apikey: process.env.API_KEY as string,
        },
        body: JSON.stringify({
          id: req.body.id,
          tokens: getTokensFromAmount(paymentIntent.amount),
          type: "buy-ac",
        }),
      }).then((res) => res.json())
      console.log(response)
    }
    res.send({
      success: paymentIntent.status === "succeeded",
    })
  } catch (e: any) {
    return res.status(400).send({
      error: {
        message: e.message,
      },
    })
  }
}
