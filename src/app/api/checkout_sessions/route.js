import { NextResponse } from 'next/server'
import { headers } from 'next/headers'

import { stripe } from '../../../lib/stripe'
import { PLAN_PRICE_ID } from '@/lib/stripe'
import { getUserSession } from '@/lib/core/session'

export async function POST (request) {
  try {
    const headersList = await headers()
    const origin = headersList.get('origin')

    // FIX 1: Properly await the asynchronous user data payload
    const user = await getUserSession()

    // Safety Guard: Force validation checking to prevent guest checkouts
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized. Please login.' },
        { status: 401 }
      )
    }

    // Determine content-type safely to parse either JSON or Form Data cleanly
    const contentType = request.headers.get('content-type') || ''
    let planId

    if (contentType.includes('application/json')) {
      const body = await request.json()
      planId = body.plan_id
    } else {
      const formData = await request.formData()
      planId = formData.get('plan_id')
    }

    // Resolve Price Identifier string
    const priceId = PLAN_PRICE_ID[planId]

    if (!priceId) {
      return NextResponse.json(
        { error: 'Invalid plan_id provided.' },
        { status: 400 }
      )
    }

    // Create Checkout Sessions with all structural requirements met
    const session = await stripe.checkout.sessions.create({
      customer_email: user.email,
      line_items: [
        {
          price: priceId,
          quantity: 1
        }
      ],
      mode: 'subscription',
      metadata: { planId },
      success_url: `${origin}/pricing/success?session_id={CHECKOUT_SESSION_ID}`,
      // FIX 2: Added mandatory fallback route if user hits the back button
      cancel_url: `${origin}/pricing`
    })

    // Return Redirect execution wrapper securely
    return NextResponse.redirect(session.url, 303)
  } catch (err) {
    console.error('Stripe Checkout Session Error:', err)
    return NextResponse.json(
      { error: err.message },
      { status: err.statusCode || 500 }
    )
  }
}
