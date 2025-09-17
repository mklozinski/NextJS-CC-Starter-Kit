/*
 * Prices are in USD
 * 
 * Free plan is free forever
 * Pro plan is $7/month or $60/year
 * Ultra plan is $10/month or $100/year
 */
export const prices = {
  free: {
    monthly: 0,
    yearly: 0,
  },
  pro: {
    monthly: 7,
    yearly: 60,
  },
  ultra: {
    monthly: 10,
    yearly: 100,
  },
}

/**
 * Get the price for a given plan and interval
 * @param plan - The plan to get the price for
 * @param interval - The interval to get the price for
 * @returns The price for the given plan and interval
 */
export const getPrice = (plan: keyof typeof prices, interval: 'monthly' | 'yearly') => {
  return prices[plan][interval]
}

/**
 * Get the savings for a given plan and interval
 * @param plan - The plan to get the savings for
 * @returns The savings for the given plan and interval
 */
export const getSavings = (plan: keyof typeof prices) => {
  const price = getPrice(plan, 'monthly')
  const priceYearly = getPrice(plan, 'yearly')
  const priceYearlyMonthly = +(priceYearly / 12).toFixed(2)

  // Avoid division by zero for free plans
  if (price === 0) {
    return 0
  }

  return Math.round(((price - priceYearlyMonthly) / price) * 100)
}
