import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { authOptions } from '@/lib/auth'
import { stripe } from '@/lib/stripe'

const changePlanSchema = z.object({
  newPlan: z.enum(['pro', 'ultra']),
  newInterval: z.enum(['monthly', 'yearly'])
})

function resolvePriceId(plan: 'pro' | 'ultra', interval: 'monthly' | 'yearly'): string {
  const envMap: Record<string, string | undefined> = {
    'pro.monthly': process.env.STRIPE_PRICE_PRO_MONTHLY,
    'pro.yearly': process.env.STRIPE_PRICE_PRO_YEARLY,
    'ultra.monthly': process.env.STRIPE_PRICE_ULTRA_MONTHLY,
    'ultra.yearly': process.env.STRIPE_PRICE_ULTRA_YEARLY,
  }
  const key = `${plan}.${interval}`
  const priceId = envMap[key]
  if (!priceId) {
    throw new Error(`Missing Stripe price id for ${key}`)
  }
  return priceId
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { newPlan, newInterval } = changePlanSchema.parse(body)

    // Get user's current subscription data
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: {
        stripeSubscriptionId: true,
        subscriptionPlan: true,
        subscriptionInterval: true,
      }
    })

    if (!user || !user.stripeSubscriptionId) {
      return NextResponse.json(
        { error: 'No active subscription found' },
        { status: 400 }
      )
    }

    if (user.subscriptionPlan === 'free') {
      return NextResponse.json(
        { error: 'Cannot change plan from free tier. Please subscribe first.' },
        { status: 400 }
      )
    }

    // Check if user is trying to change to the same plan
    if (user.subscriptionPlan === newPlan && user.subscriptionInterval === newInterval) {
      return NextResponse.json(
        { error: 'You are already on this plan' },
        { status: 400 }
      )
    }

    // Get the new price ID
    const newPriceId = resolvePriceId(newPlan, newInterval)

    // Retrieve the current subscription
    const subscription = await stripe.subscriptions.retrieve(user.stripeSubscriptionId)

    // Update the subscription with the new price
    const updatedSubscription = await stripe.subscriptions.update(user.stripeSubscriptionId, {
      items: [{
        id: subscription.items.data[0].id,
        price: newPriceId,
      }],
      proration_behavior: 'create_prorations',
    })

    // Update user data in database
    await prisma.user.update({
      where: { id: session.user.id },
      data: {
        subscriptionPlan: newPlan,
        subscriptionInterval: newInterval,
        subscriptionStatus: updatedSubscription.status,
        subscriptionCurrentPeriodEnd: new Date(updatedSubscription.current_period_end * 1000),
      }
    })

    return NextResponse.json({
      message: `Successfully changed plan to ${newPlan} (${newInterval})`,
      subscription: {
        plan: newPlan,
        interval: newInterval,
        status: updatedSubscription.status,
        currentPeriodEnd: new Date(updatedSubscription.current_period_end * 1000),
      }
    })
  } catch (error) {
    console.error('Change plan error:', error)
    return NextResponse.json(
      { error: 'Failed to change subscription plan' },
      { status: 500 }
    )
  }
} 