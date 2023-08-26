import type { NextApiRequest, NextApiResponse } from "next";
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: '2022-11-15',
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const paymentIntent = await stripe.paymentIntents.create({
          currency: "USD",
          amount: 100,
          payment_method_types:["card"]
        });
        console.log('INTENT:', paymentIntent.id, paymentIntent.client_secret, paymentIntent.amount)
        res.send({
          clientSecret: paymentIntent.client_secret,
          intentId: paymentIntent.id,
        });
    } catch (e: any) {
        console.log('intent error?', e);
        return res.status(400).send({
                error: {
                message: e.message,
            },
        });
    }
}
