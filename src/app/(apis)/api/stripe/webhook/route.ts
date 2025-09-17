import { NextResponse } from 'next/server'
import Stripe from 'stripe'
import { stripe } from '@/lib/stripe'
import { prisma } from '@/lib/prisma'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

function mapStripeIntervalToApp(interval?: string): 'monthly' | 'yearly' | undefined {
  if (interval === 'month') return 'monthly'
  if (interval === 'year') return 'yearly'
  return undefined
}

export async function POST(request: Request) {

  console.log('Stripe webhook received')

  const signature = request.headers.get('stripe-signature')
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET

  if (!signature || !webhookSecret) {
    return NextResponse.json({ error: 'Webhook signature missing' }, { status: 400 })
  }

  const body = await request.text()

  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
  } catch (err) {
    console.error('Webhook signature verification failed:', err)
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session
        const userId = session.metadata?.userId
        const plan = (session.metadata?.plan as 'pro' | 'ultra' | undefined) ?? undefined
        const intervalMeta = (session.metadata?.interval as 'monthly' | 'yearly' | undefined) ?? undefined

        const stripeCustomerId =
          typeof session.customer === 'string'
            ? session.customer
            : session.customer?.id
        const stripeSubscriptionId =
          typeof session.subscription === 'string'
            ? session.subscription
            : session.subscription?.id

        let subscription: Stripe.Subscription | undefined
        if (stripeSubscriptionId) {
          subscription = await stripe.subscriptions.retrieve(stripeSubscriptionId)
        }

        const subscriptionStatus = subscription?.status ?? 'active'
        const subscriptionCurrentPeriodEnd = subscription?.current_period_end
          ? new Date(subscription.current_period_end * 1000)
          : undefined
        const intervalFromSubscription = mapStripeIntervalToApp(
          subscription?.items?.data?.[0]?.price?.recurring?.interval
        )

        if (userId) {
          await prisma.user.update({
            where: { id: userId },
            data: {
              stripeCustomerId: stripeCustomerId ?? undefined,
              stripeSubscriptionId: stripeSubscriptionId ?? undefined,
              subscriptionPlan: plan ?? undefined,
              subscriptionInterval: intervalFromSubscription ?? intervalMeta,
              subscriptionStatus,
              subscriptionCurrentPeriodEnd,
            },
          })
        }
        break
      }

      case 'customer.subscription.updated': {
        const subscription = event.data.object as Stripe.Subscription
        const stripeSubscriptionId = subscription.id
        const stripeCustomerId =
          typeof subscription.customer === 'string'
            ? subscription.customer
            : subscription.customer?.id

        const subscriptionStatus = subscription.status
        const subscriptionCurrentPeriodEnd = new Date(
          subscription.current_period_end * 1000
        )
        const intervalFromSubscription = mapStripeIntervalToApp(
          subscription.items.data?.[0]?.price?.recurring?.interval
        )

        await prisma.user.updateMany({
          where: { stripeSubscriptionId },
          data: {
            stripeCustomerId: stripeCustomerId ?? undefined,
            subscriptionStatus,
            subscriptionCurrentPeriodEnd,
            subscriptionInterval: intervalFromSubscription ?? undefined,
          },
        })
        break
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription
        const stripeSubscriptionId = subscription.id

        await prisma.user.updateMany({
          where: { stripeSubscriptionId },
          data: {
            subscriptionStatus: 'canceled',
            subscriptionPlan: 'free',
            subscriptionInterval: undefined,
            stripeSubscriptionId: null,
          },
        })
        break
      }

      case 'invoice.paid':
      case 'invoice.payment_succeeded': {
        const invoice = event.data.object as Stripe.Invoice
        const stripeCustomerId =
          typeof invoice.customer === 'string' ? invoice.customer : invoice.customer?.id
        const stripeSubscriptionId =
          typeof invoice.subscription === 'string' ? invoice.subscription : invoice.subscription?.id

        let subscription: Stripe.Subscription | undefined
        if (stripeSubscriptionId) {
          subscription = await stripe.subscriptions.retrieve(stripeSubscriptionId)
        }

        const subscriptionStatus = subscription?.status ?? 'active'
        const subscriptionCurrentPeriodEnd = subscription?.current_period_end
          ? new Date(subscription.current_period_end * 1000)
          : undefined

        await prisma.user.updateMany({
          where: { stripeSubscriptionId },
          data: {
            stripeCustomerId: stripeCustomerId ?? undefined,
            subscriptionStatus,
            subscriptionCurrentPeriodEnd,
          },
        })
        break
      }

      case 'invoice.payment_failed': {
        const invoice = event.data.object as Stripe.Invoice
        const stripeCustomerId =
          typeof invoice.customer === 'string' ? invoice.customer : invoice.customer?.id
        const stripeSubscriptionId =
          typeof invoice.subscription === 'string' ? invoice.subscription : invoice.subscription?.id

        await prisma.user.updateMany({
          where: { stripeSubscriptionId },
          data: {
            stripeCustomerId: stripeCustomerId ?? undefined,
            subscriptionStatus: 'past_due',
          },
        })
        break
      }

      default:
        break
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('Webhook handler error:', error)
    return NextResponse.json({ error: 'Webhook handler error' }, { status: 500 })
  }
} 