"use client"

import { Check, X } from "lucide-react"
import { useState } from 'react'
import { getPrice, getSavings } from '@/lib/prices'
import { Button } from "@/components/ui/button"

type BillingInterval = 'monthly' | 'yearly'

type PlanKey = 'free' | 'pro' | 'ultra'

export default function PricingPage() {
  const [isYearly, setIsYearly] = useState(false)
  const [loadingPlan, setLoadingPlan] = useState<PlanKey | null>(null)

  // Prices
  const proPriceMonthly = getPrice('pro', 'monthly')
  const proPriceYearlyTotal = getPrice('pro', 'yearly')

  const ultraPriceMonthly = getPrice('ultra', 'monthly')
  const ultraPriceYearlyTotal = getPrice('ultra', 'yearly')

  const proSavings = getSavings('pro')
  const ultraSavings = getSavings('ultra')

  async function subscribe(plan: Exclude<PlanKey, 'free'>) {
    try {
      setLoadingPlan(plan)
      const interval: BillingInterval = isYearly ? 'yearly' : 'monthly'
      const res = await fetch('/api/stripe/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plan, interval }),
      })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error((data as { error: string }).error || 'Request failed')
      }
      const { url } = await res.json()
      window.location.href = url
    } catch (error) {
      console.error('Pricing error:', error)
      alert('Please sign in to subscribe.')
    } finally {
      setLoadingPlan(null)
    }
  }

  return (
    <div className="w-full py-12 lg:py-24">
      {/* Monthly/Yearly Toggle */}
      <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl md:text-6xl text-center mb-12 lg:mb-24">Pricing (example)</h1>
      <div className="flex justify-center mb-12">
        <div className="flex items-center space-x-4 bg-gray-100 dark:bg-gray-800 p-2 px-4 rounded-full">
          <span className={`text-sm font-medium transition-colors ${!isYearly ? 'text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400'}`}>
            Monthly
          </span>

          {/* iPhone-style toggle */}
          <div
            className="relative w-14 h-8 cursor-pointer"
            onClick={() => setIsYearly(!isYearly)}
            aria-label="Toggle billing interval"
          >
            <div className={`absolute inset-0 rounded-full transition-colors duration-300 ${
              isYearly ? 'bg-blue-500' : 'bg-gray-300 dark:bg-gray-600'
            }`}>
              <div className={`absolute top-1 w-6 h-6 bg-white rounded-full shadow-md transition-transform duration-300 ${
                isYearly ? 'transform translate-x-6' : 'transform translate-x-1'
              }`} />
            </div>
          </div>

          <div className="flex flex-col items-start transition-all duration-100">
            <span className={`text-sm font-medium ${isYearly ? 'text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400'}`}>
              Yearly
            </span>
            <span className={`text-xs text-green-600 dark:text-green-400 ${!isYearly && "opacity-50"} font-medium`}>
              Save up to {proSavings}%
            </span>
          </div>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {/* Free Plan */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-8 flex flex-col gap-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-2">Free Plan</h3>
            <div className="text-4xl font-bold mb-2">$0</div>
            <p className="text-gray-600 dark:text-gray-400">Forever free</p>
          </div>

          <div className="space-y-4 text-sm">
            <div className="flex justify-between items-center">
              <span>Max Images per Batch</span>
              <span className="font-semibold">10</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Max File Size per Image</span>
              <span className="font-semibold">5MB</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Input Formats</span>
              <span className="font-semibold text-sm">JPG, PNG</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Output Formats</span>
              <span className="font-semibold">WebP</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Compression Modes</span>
              <span className="font-semibold">Lossy only</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Metadata Preservation</span>
              <X className="h-5 w-5 text-red-500" />
            </div>
            <div className="flex justify-between items-center">
              <span>Batch Processing</span>
              <span className="text-active">✓ Basic</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Watermarking</span>
              <X className="h-5 w-5 text-red-500" />
            </div>
            <div className="flex justify-between items-center">
              <span>Cloud Integration</span>
              <X className="h-5 w-5 text-red-500" />
            </div>
            <div className="flex justify-between items-center">
              <span>API</span>
              <X className="h-5 w-5 text-red-500" />
            </div>
            <div className="flex justify-between items-center">
              <span>Priority Support</span>
              <X className="h-5 w-5 text-red-500" />
            </div>
          </div>

          <Button size="lg" className="w-full mt-auto inline-flex items-center justify-center px-6 py-3 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white font-semibold hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
            Sign Up
          </Button>
        </div>

        {/* Pro Plan */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border-2 border-blue-500 p-8 relative flex flex-col gap-8">
          <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
            <span className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
              Most Popular
            </span>
          </div>

          <div className="text-center">
            <h3 className="text-2xl font-bold mb-2">Pro Plan ⭐</h3>
            <div className="flex items-center justify-center space-x-2">
              <div className="text-4xl font-bold relative">
                ${isYearly ? proPriceYearlyTotal : proPriceMonthly}
                {isYearly && (
                  <div className="flex flex-col absolute top-0 left-full">
                    <span className="text-xs text-green-600 dark:text-green-400 font-medium pl-1">
                      -{proSavings}%
                    </span>
                  </div>
                )}
              </div>
            </div>
            <p className="text-gray-600 dark:text-gray-400">per {isYearly ? "year" : "month"}</p>
          </div>

          <div className="space-y-4 text-sm">
            <div className="flex justify-between items-center">
              <span>Max Images per Batch</span>
              <span className="font-semibold">100</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Max File Size per Image</span>
              <span className="font-semibold">50MB</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Input Formats</span>
              <span className="font-semibold text-sm">JPG, PNG,  AVIF</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Output Formats</span>
              <span className="font-semibold text-sm">WebP, AVIF, PNG</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Compression Modes</span>
              <span className="font-semibold text-sm">Lossy, Lossless</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Metadata Preservation</span>
              <span className="text-active">✓ Optional</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Batch Processing</span>
              <span className="text-active text-sm">✓ With progress</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Watermarking</span>
              <X className="h-5 w-5 text-red-500" />
            </div>
            <div className="flex justify-between items-center">
              <span>Cloud Integration</span>
              <X className="h-5 w-5 text-red-500" />
            </div>
            <div className="flex justify-between items-center">
              <span>API</span>
              <span className="font-semibold">Limited</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Priority Support</span>
              <span className="font-semibold">Email support</span>
            </div>
          </div>

          <Button
            onClick={() => subscribe('pro')}
            disabled={loadingPlan !== null}
            size="lg"
            className="w-full mt-auto px-6 py-3 bg-blue-500 text-white font-semibold hover:bg-blue-600 transition-colors disabled:opacity-60"
          >
            {loadingPlan === 'pro' ? 'Redirecting…' : 'Choose Pro'}
          </Button>
        </div>

        {/* Ultra Plan */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-8 flex flex-col gap-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-2">Ultra Plan 🚀</h3>
            <div className="flex items-center justify-center space-x-2">
              <div className="text-4xl font-bold relative">
                ${isYearly ? ultraPriceYearlyTotal : ultraPriceMonthly}
                {isYearly && (
                  <div className="flex flex-col absolute top-0 left-full">
                    <span className="text-xs text-green-600 dark:text-green-400 font-medium pl-1">
                      -{ultraSavings}%
                    </span>
                  </div>
                )}
              </div>
            </div>
            <p className="text-gray-600 dark:text-gray-400">per {isYearly ? "year" : "month"}</p>
          </div>

          <div className="space-y-4 text-sm">
            <div className="flex justify-between items-center">
              <span>Max Images per Batch</span>
              <span className="font-semibold">Unlimited</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Max File Size per Image</span>
              <span className="font-semibold">150MB</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Input Formats</span>
              <span className="font-semibold text-sm">JPG, PNG,  AVIF, HEIC</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Output Formats</span>
              <span className="font-semibold text-sm">WebP, AVIF, PNG, JPG</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Compression Modes</span>
              <span className="font-semibold text-sm">Adjustable</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Metadata Preservation</span>
              <span className="text-active">✓ Optional</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Batch Processing</span>
              <span className="text-active text-sm">✓ With queue</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Watermarking</span>
              <span className="text-active">✓ Customizable</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Cloud Integration</span>
              <span className="text-active">✓ Included</span>
            </div>
            <div className="flex justify-between items-center">
              <span>API</span>
              <Check className="h-5 w-5 text-active" />
            </div>
            <div className="flex justify-between items-center">
              <span>Priority Support</span>
              <span className="font-semibold">Priority email</span>
            </div>
          </div>

          <Button
            onClick={() => subscribe('ultra')}
            disabled={loadingPlan !== null}
            size="lg"
            className="w-full mt-auto px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold hover:from-purple-600 hover:to-pink-600 transition-colors disabled:opacity-60"
          >
            {loadingPlan === 'ultra' ? 'Redirecting…' : 'Choose Ultra'}
          </Button>
        </div>
      </div>
    </div>
  )
}