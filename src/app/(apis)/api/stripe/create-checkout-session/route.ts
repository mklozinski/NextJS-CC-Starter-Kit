import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { z } from 'zod'
import { stripe } from '@/lib/stripe'
import { authOptions } from '@/lib/auth'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const requestSchema = z.object({
  plan: z.enum(['pro', 'ultra']),
  interval: z.enum(['monthly', 'yearly']),
})

function getBaseUrl() {
  return process.env.NEXTAUTH_URL || 'http://localhost:3000'
}

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
    if (!session?.user?.id || !session.user.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { plan, interval } = requestSchema.parse(body)

    const priceId = resolvePriceId(plan, interval)

    const successUrl = `${getBaseUrl()}/pricing?success=1&plan=${plan}`
    const cancelUrl = `${getBaseUrl()}/pricing?canceled=1`

    const checkoutSession = await stripe.checkout.sessions.create({
      mode: 'subscription',
      customer_email: session.user.email,
      payment_method_types: ['card'],
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: successUrl,
      cancel_url: cancelUrl,
      allow_promotion_codes: true,
      metadata: {
        userId: session.user.id,
        plan,
        interval,
      },
    })

    return NextResponse.json({ url: checkoutSession.url })
  } catch (error) {
    console.error('Create checkout session error:', error)
    return NextResponse.json({ error: 'Unable to create checkout session' }, { status: 500 })
  }
} 