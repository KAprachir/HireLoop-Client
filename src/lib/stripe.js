import 'server-only'

import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

export const PLAN_PRICE_ID = {
  'seeker-premium': 'price_1ThYSaPyz3NPEn2mYOyBiIfD',
  'seeker-pro': 'price_1ThV3ePyz3NPEn2mjgqefo7b',
  'recruiter-growth': 'price_1ThYTJPyz3NPEn2mXuC8TyS4',
  'recruiter-enterprise': 'price_1ThYTxPyz3NPEn2mMzNmWSKD'
}
