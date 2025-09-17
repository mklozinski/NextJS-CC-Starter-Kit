import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { authOptions } from '@/lib/auth'
import { stripe } from '@/lib/stripe'

const cancelSubscriptionSchema = z.object({
  action: z.literal('cancel')
})

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Get user subscription data
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: {
        subscriptionPlan: true,
        subscriptionStatus: true,
        subscriptionInterval: true,
        subscriptionCurrentPeriodEnd: true,
        stripeCustomerId: true,
        stripeSubscriptionId: true,
      }
    })

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      plan: user.subscriptionPlan || 'free',
      status: user.subscriptionStatus,
      interval: user.subscriptionInterval,
      currentPeriodEnd: user.subscriptionCurrentPeriodEnd,
      stripeCustomerId: user.stripeCustomerId,
      stripeSubscriptionId: user.stripeSubscriptionId,
    })
  } catch (error) {
    console.error('Get subscription error:', error)
    return NextResponse.json(
      { error: 'Failed to get subscription data' },
      { status: 500 }
    )
  }
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
    const { action } = cancelSubscriptionSchema.parse(body)

    if (action === 'cancel') {
      // Get user's subscription data
      const user = await prisma.user.findUnique({
        where: { id: session.user.id },
        select: {
          stripeSubscriptionId: true,
          subscriptionPlan: true,
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
          { error: 'Already on free plan' },
          { status: 400 }
        )
      }

      // Cancel subscription at period end
      await stripe.subscriptions.update(user.stripeSubscriptionId, {
        cancel_at_period_end: true,
      })

      // Update user status to indicate cancellation pending
      await prisma.user.update({
        where: { id: session.user.id },
        data: {
          subscriptionStatus: 'canceled',
        }
      })

      return NextResponse.json({
        message: 'Subscription will be canceled at the end of the current billing period'
      })
    }

    return NextResponse.json(
      { error: 'Invalid action' },
      { status: 400 }
    )
  } catch (error) {
    console.error('Subscription management error:', error)
    return NextResponse.json(
      { error: 'Failed to manage subscription' },
      { status: 500 }
    )
  }
} 