import type { NextApiRequest, NextApiResponse } from 'next'
import Stripe from 'stripe'
import { buffer } from 'micro'

export const config = {
  api: {
    bodyParser: false,
  },
}

type Data = {
  name: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === 'POST') {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2022-11-15',
    })
    const sig = req.headers['stripe-signature']
    const buf = await buffer(req)
    let event
    try {
      event = await stripe.webhooks.constructEvent(
        buf,
        sig,
        process.env.STRIPE_WEBHOOK_SECRET
      )
      console.log('🚀 ~ file: stripeSync.ts:34 ~ event?.type:', event?.type)
      switch (event?.type) {
        case 'checkout.session.completed':
          const userId = event.data.object?.client_reference_id
          const paymentIntent = event.data.object?.payment_intent
          const checkoutSessionId = event.data.object?.id
          console.log(
            '🚀 ~ file: stripeSync.ts:37 ~  event.data.object:',
            event.data.object
          )
          console.log(
            '🚀 ~ file: stripeSync.ts:37 ~ paymentIntent:',
            paymentIntent
          )

          console.log(
            '🚀 ~ file: stripeSync.ts:35 ~ paymentIntentSucceeded:',
            userId
          )
          const checkoutSession = await stripe.checkout.sessions.retrieve(checkoutSessionId, {
            expand: ['line_items'],
          })
          console.log("🚀 ~ file: stripeSync.ts:54 ~ checkoutSession:", checkoutSession.line_items)
          //update the user publicmetadata with the new subscription data.
          break
        case 'customer.subscription.updated':
          //we should change the current subscription
          break
        case 'customer.subscription.deleted':
          //eset the user back to free.
          break
        case 'customer.subscription.paused':
          //reset to free tier
          break
        case 'customer.subscription.resumed':
          //update the tier
          break
        case 'invoice.paid':
          //update the tier
          break

        default:
          console.log(`Unhandled event type ${event?.type}`)
      }
      res.status(200).json({ received: true })
    } catch (err) {
      console.error(`Error verifying Stripe webhook: ${err.message}`)
      res.status(400).json({ error: `Webhook Error: ${err.message}` })
    }
  } else {
    res.setHeader('Allow', 'POST')
    res.status(405).end('Method Not Allowed')
  }
}
