import type { NextApiRequest, NextApiResponse } from "next";
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: '2022-11-15',
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const {intentId, selectedPrice} = req.body;
    if (!intentId || !selectedPrice) {
        res.status(400).send({
        error: {
            message: "Missing either the intentId or the chosen price"
        }
        });
        return;
    }
    const newAmount = parseFloat(selectedPrice) * 100;
    try {
        const existingPaymentIntent = await stripe.paymentIntents.retrieve(intentId);

        if (existingPaymentIntent.status !== "succeeded") {
            const paymentIntent = await stripe.paymentIntents.update(
                intentId,
                {
                    amount: newAmount,
                }
            );
            console.log('updated', paymentIntent.amount)
            // neither are changing here but send them just in case it's needed later
            res.send({
                updatedId: paymentIntent.id,
                updatedSecret: paymentIntent.client_secret,
            })
        } else {
            const newPaymentIntent = await stripe.paymentIntents.create({
                currency: "USD",
                amount: 100,
                payment_method_types:["card"]
            })

            console.log('CREATED A NEW INTENT SINCE OLD ONE IS DONE FOR:', newPaymentIntent.id, newPaymentIntent.client_secret, newPaymentIntent.amount)
            res.send({
                updatedSecret: newPaymentIntent.client_secret,
                updatedId: newPaymentIntent.id,
            });
        }
    } catch (e: any) {
        return res.status(400).send({
        error: {
            message: e.message,
        },
        });
    }
}
