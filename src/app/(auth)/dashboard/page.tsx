"use client"

import { useSession, signOut } from "next-auth/react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { getPrice } from "@/lib/prices"

interface UpdateProfileData {
  name: string
  email: string
}

interface UpdatePasswordData {
  currentPassword: string
  newPassword: string
  confirmPassword: string
}

interface ApiResponse {
  message?: string
  error?: string
}

interface SubscriptionData {
  plan: string
  status?: string
  interval?: string
  currentPeriodEnd?: Date
  stripeCustomerId?: string
  stripeSubscriptionId?: string
}

type PlanType = 'free' | 'pro' | 'ultra'
type IntervalType = 'monthly' | 'yearly'

export default function Dashboard() {
  const { data: session, status, update } = useSession()
  const router = useRouter()
  
  // Form states
  const [profileData, setProfileData] = useState<UpdateProfileData>({
    name: "",
    email: ""
  })
  
  const [passwordData, setPasswordData] = useState<UpdatePasswordData>({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  })

  // Loading and message states
  const [isProfileLoading, setIsProfileLoading] = useState(false)
  const [isPasswordLoading, setIsPasswordLoading] = useState(false)
  const [profileMessage, setProfileMessage] = useState("")
  const [passwordMessage, setPasswordMessage] = useState("")
  const [profileError, setProfileError] = useState("")
  const [passwordError, setPasswordError] = useState("")

  // Subscription states
  const [subscriptionData, setSubscriptionData] = useState<SubscriptionData | null>(null)
  const [isSubscriptionLoading, setIsSubscriptionLoading] = useState(false)
  const [subscriptionMessage, setSubscriptionMessage] = useState("")
  const [subscriptionError, setSubscriptionError] = useState("")
  const [isChangingPlan, setIsChangingPlan] = useState(false)

  // Pricing data (from pricing page)
  const proPriceMonthly = getPrice('pro', 'monthly')
  const proPriceYearlyTotal = getPrice('pro', 'yearly')
  const proPriceYearlyMonthly = +(proPriceYearlyTotal / 12).toFixed(2)
  const ultraPriceMonthly = getPrice('ultra', 'monthly')
  const ultraPriceYearlyTotal = getPrice('ultra', 'yearly')
  const ultraPriceYearlyMonthly = +(ultraPriceYearlyTotal / 12).toFixed(2)

  // Initialize form data when session loads
  useEffect(() => {
    if (session?.user) {
      setProfileData({
        name: session.user.name || "",
        email: session.user.email || ""
      })
    }
  }, [session])

  // Load subscription data when session loads
  useEffect(() => {
    if (session?.user?.id) {
      loadSubscriptionData()
    }
  }, [session?.user?.id])

  // Redirect if not authenticated
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login")
    }
  }, [status, router])

  const loadSubscriptionData = async () => {
    try {
      setIsSubscriptionLoading(true)
      const response = await fetch("/api/user/subscription")
      const data = await response.json()

      if (response.ok) {
        setSubscriptionData(data)
      } else {
        setSubscriptionError(data.error || "Failed to load subscription data")
      }
    } catch (error) {
      console.error("Load subscription error:", error)
      setSubscriptionError("An error occurred while loading subscription data")
    } finally {
      setIsSubscriptionLoading(false)
    }
  }

  const handlePlanChange = async (newPlan: PlanType, newInterval: IntervalType) => {
    if (newPlan === 'free') {
      // Handle cancellation
      await handleCancelSubscription()
      return
    }

    try {
      setIsChangingPlan(true)
      setSubscriptionError("")
      setSubscriptionMessage("")

      const response = await fetch("/api/user/subscription/change-plan", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          newPlan,
          newInterval
        })
      })

      const data = await response.json()

      if (response.ok) {
        setSubscriptionMessage(data.message)
        await loadSubscriptionData()
        await update() // Refresh session data
      } else {
        setSubscriptionError(data.error || "Failed to change plan")
      }
    } catch (error) {
      console.error("Plan change error:", error)
      setSubscriptionError("An error occurred while changing your plan")
    } finally {
      setIsChangingPlan(false)
    }
  }

  const handleCancelSubscription = async () => {
    if (!confirm("Are you sure you want to cancel your subscription? It will remain active until the end of your current billing period.")) {
      return
    }

    try {
      setIsChangingPlan(true)
      setSubscriptionError("")
      setSubscriptionMessage("")

      const response = await fetch("/api/user/subscription", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          action: "cancel"
        })
      })

      const data = await response.json()

      if (response.ok) {
        setSubscriptionMessage(data.message)
        await loadSubscriptionData()
        await update() // Refresh session data
      } else {
        setSubscriptionError(data.error || "Failed to cancel subscription")
      }
    } catch (error) {
      console.error("Cancel subscription error:", error)
      setSubscriptionError("An error occurred while canceling your subscription")
    } finally {
      setIsChangingPlan(false)
    }
  }

  const handleUpgradeToNewPlan = async (plan: Exclude<PlanType, 'free'>, interval: IntervalType) => {
    try {
      setIsChangingPlan(true)
      const res = await fetch('/api/stripe/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plan, interval }),
      })
      
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data.error || 'Request failed')
      }
      
      const { url } = await res.json()
      window.location.href = url
    } catch (error) {
      console.error('Upgrade error:', error)
      setSubscriptionError('Failed to start upgrade process')
      setIsChangingPlan(false)
    }
  }

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsProfileLoading(true)
    setProfileError("")
    setProfileMessage("")

    try {
      const response = await fetch("/api/user/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(profileData)
      })

      const data: ApiResponse = await response.json()

      if (response.ok) {
        setProfileMessage("Profile updated successfully!")
        // Update the session with new data
        await update({
          name: profileData.name,
          email: profileData.email
        })
      } else {
        setProfileError(data.error || "Failed to update profile")
      }
    } catch (error) {
      console.error("Profile update error:", error)
      setProfileError("An error occurred while updating your profile")
    } finally {
      setIsProfileLoading(false)
    }
  }

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsPasswordLoading(true)
    setPasswordError("")
    setPasswordMessage("")

    // Client-side validation
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setPasswordError("New passwords do not match")
      setIsPasswordLoading(false)
      return
    }

    if (passwordData.newPassword.length < 6) {
      setPasswordError("New password must be at least 6 characters")
      setIsPasswordLoading(false)
      return
    }

    try {
      const response = await fetch("/api/user/password", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          currentPassword: passwordData.currentPassword,
          newPassword: passwordData.newPassword
        })
      })

      const data: ApiResponse = await response.json()

      if (response.ok) {
        setPasswordMessage("Password updated successfully!")
        setPasswordData({
          currentPassword: "",
          newPassword: "",
          confirmPassword: ""
        })
      } else {
        setPasswordError(data.error || "Failed to update password")
      }
    } catch (error) {
      console.error("Password update error:", error)
      setPasswordError("An error occurred while updating your password")
    } finally {
      setIsPasswordLoading(false)
    }
  }

  const handleSignOut = () => {
    signOut({ callbackUrl: "/login" })
  }

  const formatPlanName = (plan: string) => {
    switch (plan) {
      case 'free': return 'Free Plan'
      case 'pro': return 'Pro Plan'
      case 'ultra': return 'Ultra Plan'
      default: return plan
    }
  }

  const getPlanPrice = (plan: string, interval?: string) => {
    if (plan === 'free') return '$0'
    
    if (plan === 'pro') {
      return interval === 'yearly' ? `$${proPriceYearlyMonthly}/month` : `$${proPriceMonthly}/month`
    }
    
    if (plan === 'ultra') {
      return interval === 'yearly' ? `$${ultraPriceYearlyMonthly}/month` : `$${ultraPriceMonthly}/month`
    }
    
    return 'Unknown'
  }

  const formatDate = (date: Date | string | undefined) => {
    if (!date) return 'N/A'
    const d = typeof date === 'string' ? new Date(date) : date
    return d.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  }

  const getStatusColor = (status?: string) => {
    switch (status) {
      case 'active': return 'text-green-600 bg-green-100'
      case 'canceled': return 'text-red-600 bg-red-100'
      case 'past_due': return 'text-yellow-600 bg-yellow-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    )
  }

  if (!session) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Profile Overview */}
            <div className="lg:col-span-1">
              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                    Profile Overview
                  </h3>
                  
                  <div className="flex flex-col items-center">
                    <div className="w-24 h-24 bg-gray-300 rounded-full flex items-center justify-center mb-4">
                      {session.user.image ? (
                        <Image
                          src={session.user.image}
                          alt="Profile"
                          width={96}
                          height={96}
                          className="rounded-full"
                        />
                      ) : (
                        <span className="text-2xl font-semibold text-gray-600">
                          {(session.user.name || session.user.email || "U").charAt(0).toUpperCase()}
                        </span>
                      )}
                    </div>
                    
                    <div className="text-center space-y-2">
                      <h4 className="text-xl font-semibold text-gray-900">
                        {session.user.name || "No name set"}
                      </h4>
                      <p className="text-sm text-gray-500">{session.user.email}</p>
                      <p className="text-xs text-gray-400">User ID: {session.user.id}</p>
                      <Button
                        onClick={handleSignOut}
                        variant="outline"
                        size="sm"
                        className="mt-3"
                      >
                        Sign Out
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Profile Settings */}
            <div className="lg:col-span-2 space-y-6">
              
              {/* Update Profile Form */}
              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                    Update Profile
                  </h3>
                  
                  {profileMessage && (
                    <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
                      {profileMessage}
                    </div>
                  )}
                  
                  {profileError && (
                    <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                      {profileError}
                    </div>
                  )}

                  <form onSubmit={handleProfileSubmit} className="space-y-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                        Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        value={profileData.name}
                        onChange={(e) => setProfileData(prev => ({ ...prev, name: e.target.value }))}
                        className={cn(
                          "mt-1 appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300",
                          "placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500",
                          "focus:z-10 sm:text-sm"
                        )}
                        placeholder="Enter your name"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        value={profileData.email}
                        onChange={(e) => setProfileData(prev => ({ ...prev, email: e.target.value }))}
                        className={cn(
                          "mt-1 appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300",
                          "placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500",
                          "focus:z-10 sm:text-sm"
                        )}
                        placeholder="Enter your email"
                        required
                      />
                    </div>
                    
                    <Button 
                      type="submit" 
                      disabled={isProfileLoading}
                      className="w-full"
                    >
                      {isProfileLoading ? "Updating..." : "Update Profile"}
                    </Button>
                  </form>
                </div>
              </div>

              {/* Change Password Form */}
              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                    Change Password
                  </h3>
                  
                  {passwordMessage && (
                    <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
                      {passwordMessage}
                    </div>
                  )}
                  
                  {passwordError && (
                    <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                      {passwordError}
                    </div>
                  )}

                  <form onSubmit={handlePasswordSubmit} className="space-y-4">
                    <div>
                      <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700">
                        Current Password
                      </label>
                      <input
                        type="password"
                        id="currentPassword"
                        value={passwordData.currentPassword}
                        onChange={(e) => setPasswordData(prev => ({ ...prev, currentPassword: e.target.value }))}
                        className={cn(
                          "mt-1 appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300",
                          "placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500",
                          "focus:z-10 sm:text-sm"
                        )}
                        placeholder="Enter your current password"
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">
                        New Password
                      </label>
                      <input
                        type="password"
                        id="newPassword"
                        value={passwordData.newPassword}
                        onChange={(e) => setPasswordData(prev => ({ ...prev, newPassword: e.target.value }))}
                        className={cn(
                          "mt-1 appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300",
                          "placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500",
                          "focus:z-10 sm:text-sm"
                        )}
                        placeholder="Enter your new password"
                        minLength={6}
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                        Confirm New Password
                      </label>
                      <input
                        type="password"
                        id="confirmPassword"
                        value={passwordData.confirmPassword}
                        onChange={(e) => setPasswordData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                        className={cn(
                          "mt-1 appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300",
                          "placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500",
                          "focus:z-10 sm:text-sm"
                        )}
                        placeholder="Confirm your new password"
                        minLength={6}
                        required
                      />
                    </div>
                    
                    <Button 
                      type="submit" 
                      disabled={isPasswordLoading}
                      variant="destructive"
                      className="w-full"
                    >
                      {isPasswordLoading ? "Updating..." : "Change Password"}
                    </Button>
                  </form>
                </div>
              </div>

              {/* Subscription Management */}
              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                    Subscription Management
                  </h3>
                  
                  {subscriptionMessage && (
                    <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
                      {subscriptionMessage}
                    </div>
                  )}
                  
                  {subscriptionError && (
                    <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                      {subscriptionError}
                    </div>
                  )}

                  {isSubscriptionLoading ? (
                    <div className="text-center py-4">
                      <div className="text-sm text-gray-500">Loading subscription data...</div>
                    </div>
                  ) : subscriptionData ? (
                    <div className="space-y-6">
                      {/* Current Plan */}
                      <div className="border rounded-lg p-4 bg-gray-50">
                        <h4 className="font-semibold text-gray-900 mb-3">Current Plan</h4>
                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600">Plan:</span>
                            <span className="font-medium">{formatPlanName(subscriptionData.plan)}</span>
                          </div>
                          
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600">Price:</span>
                            <span className="font-medium">{getPlanPrice(subscriptionData.plan, subscriptionData.interval)}</span>
                          </div>
                          
                          {subscriptionData.interval && (
                            <div className="flex justify-between items-center">
                              <span className="text-sm text-gray-600">Billing:</span>
                              <span className="font-medium capitalize">{subscriptionData.interval}</span>
                            </div>
                          )}
                          
                          {subscriptionData.status && (
                            <div className="flex justify-between items-center">
                              <span className="text-sm text-gray-600">Status:</span>
                              <span className={cn("px-2 py-1 rounded-full text-xs font-medium", getStatusColor(subscriptionData.status))}>
                                {subscriptionData.status.charAt(0).toUpperCase() + subscriptionData.status.slice(1)}
                              </span>
                            </div>
                          )}
                          
                          {subscriptionData.currentPeriodEnd && (
                            <div className="flex justify-between items-center">
                              <span className="text-sm text-gray-600">Next billing date:</span>
                              <span className="font-medium">{formatDate(subscriptionData.currentPeriodEnd)}</span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Plan Options */}
                      {subscriptionData.plan !== 'free' && (
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-3">Change Plan</h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Pro Plan Options */}
                            {subscriptionData.plan !== 'pro' && (
                              <div className="border rounded-lg p-4">
                                <h5 className="font-medium text-gray-900 mb-2">Pro Plan</h5>
                                <div className="space-y-2 mb-3">
                                  <div className="text-sm text-gray-600">Monthly: ${proPriceMonthly}/month</div>
                                  <div className="text-sm text-gray-600">Yearly: ${proPriceYearlyMonthly}/month</div>
                                </div>
                                <div className="space-y-2">
                                  <Button
                                    onClick={() => handlePlanChange('pro', 'monthly')}
                                    disabled={isChangingPlan}
                                    variant="outline"
                                    size="sm"
                                    className="w-full"
                                  >
                                    {subscriptionData.plan === 'ultra' ? 'Downgrade to' : 'Change to'} Pro Monthly
                                  </Button>
                                  <Button
                                    onClick={() => handlePlanChange('pro', 'yearly')}
                                    disabled={isChangingPlan}
                                    variant="outline"
                                    size="sm"
                                    className="w-full"
                                  >
                                    {subscriptionData.plan === 'ultra' ? 'Downgrade to' : 'Change to'} Pro Yearly
                                  </Button>
                                </div>
                              </div>
                            )}

                            {/* Ultra Plan Options */}
                            {subscriptionData.plan !== 'ultra' && (
                              <div className="border rounded-lg p-4">
                                <h5 className="font-medium text-gray-900 mb-2">Ultra Plan</h5>
                                <div className="space-y-2 mb-3">
                                  <div className="text-sm text-gray-600">Monthly: ${ultraPriceMonthly}/month</div>
                                  <div className="text-sm text-gray-600">Yearly: ${ultraPriceYearlyMonthly}/month</div>
                                </div>
                                <div className="space-y-2">
                                  <Button
                                    onClick={() => handlePlanChange('ultra', 'monthly')}
                                    disabled={isChangingPlan}
                                    size="sm"
                                    className="w-full"
                                  >
                                    Upgrade to Ultra Monthly
                                  </Button>
                                  <Button
                                    onClick={() => handlePlanChange('ultra', 'yearly')}
                                    disabled={isChangingPlan}
                                    size="sm"
                                    className="w-full"
                                  >
                                    Upgrade to Ultra Yearly
                                  </Button>
                                </div>
                              </div>
                            )}

                            {/* Current Plan Interval Change */}
                            {subscriptionData.plan !== 'free' && subscriptionData.interval && (
                              <div className="border rounded-lg p-4 md:col-span-2">
                                <h5 className="font-medium text-gray-900 mb-2">Change Billing Interval</h5>
                                <div className="flex gap-2">
                                  {subscriptionData.interval !== 'monthly' && (
                                    <Button
                                      onClick={() => handlePlanChange(subscriptionData.plan as 'pro' | 'ultra', 'monthly')}
                                      disabled={isChangingPlan}
                                      variant="outline"
                                      size="sm"
                                    >
                                      Switch to Monthly
                                    </Button>
                                  )}
                                  {subscriptionData.interval !== 'yearly' && (
                                    <Button
                                      onClick={() => handlePlanChange(subscriptionData.plan as 'pro' | 'ultra', 'yearly')}
                                      disabled={isChangingPlan}
                                      variant="outline"
                                      size="sm"
                                    >
                                      Switch to Yearly (Save Money!)
                                    </Button>
                                  )}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      )}

                      {/* Free Plan Upgrade Options */}
                      {subscriptionData.plan === 'free' && (
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-3">Upgrade Your Plan</h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Pro Plan */}
                            <div className="border rounded-lg p-4">
                              <h5 className="font-medium text-gray-900 mb-2">Pro Plan</h5>
                              <div className="space-y-2 mb-3">
                                <div className="text-sm text-gray-600">Monthly: ${proPriceMonthly}/month</div>
                                <div className="text-sm text-gray-600">Yearly: ${proPriceYearlyMonthly}/month (Save {Math.round(((proPriceMonthly - proPriceYearlyMonthly) / proPriceMonthly) * 100)}%)</div>
                              </div>
                              <div className="space-y-2">
                                <Button
                                  onClick={() => handleUpgradeToNewPlan('pro', 'monthly')}
                                  disabled={isChangingPlan}
                                  size="sm"
                                  className="w-full"
                                >
                                  Upgrade to Pro Monthly
                                </Button>
                                <Button
                                  onClick={() => handleUpgradeToNewPlan('pro', 'yearly')}
                                  disabled={isChangingPlan}
                                  size="sm"
                                  className="w-full"
                                >
                                  Upgrade to Pro Yearly
                                </Button>
                              </div>
                            </div>

                            {/* Ultra Plan */}
                            <div className="border rounded-lg p-4">
                              <h5 className="font-medium text-gray-900 mb-2">Ultra Plan</h5>
                              <div className="space-y-2 mb-3">
                                <div className="text-sm text-gray-600">Monthly: ${ultraPriceMonthly}/month</div>
                                <div className="text-sm text-gray-600">Yearly: ${ultraPriceYearlyMonthly}/month (Save {Math.round(((ultraPriceMonthly - ultraPriceYearlyMonthly) / ultraPriceMonthly) * 100)}%)</div>
                              </div>
                              <div className="space-y-2">
                                <Button
                                  onClick={() => handleUpgradeToNewPlan('ultra', 'monthly')}
                                  disabled={isChangingPlan}
                                  size="sm"
                                  className="w-full"
                                >
                                  Upgrade to Ultra Monthly
                                </Button>
                                <Button
                                  onClick={() => handleUpgradeToNewPlan('ultra', 'yearly')}
                                  disabled={isChangingPlan}
                                  size="sm"
                                  className="w-full"
                                >
                                  Upgrade to Ultra Yearly
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Cancel Subscription */}
                      {subscriptionData.plan !== 'free' && subscriptionData.status === 'active' && (
                        <div className="border-t pt-4">
                          <h4 className="font-semibold text-gray-900 mb-2">Cancel Subscription</h4>
                          <p className="text-sm text-gray-600 mb-3">
                            Your subscription will remain active until the end of your current billing period.
                          </p>
                          <Button
                            onClick={handleCancelSubscription}
                            disabled={isChangingPlan}
                            variant="destructive"
                            size="sm"
                          >
                            {isChangingPlan ? "Processing..." : "Cancel Subscription"}
                          </Button>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="text-center py-4">
                      <div className="text-sm text-gray-500">No subscription data available</div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
