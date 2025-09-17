import NextAuth from "next-auth"

declare module "next-auth" {
  interface Session {
    user: {
      id: string
      email: string
      name?: string
      image?: string
      subscriptionPlan?: string
      subscriptionStatus?: string
      subscriptionInterval?: string
      subscriptionCurrentPeriodEnd?: Date
    }
  }

  interface User {
    id: string
    email: string
    name?: string
    image?: string
    subscriptionPlan?: string
    subscriptionStatus?: string
    subscriptionInterval?: string
    subscriptionCurrentPeriodEnd?: Date
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    subscriptionPlan?: string
    subscriptionStatus?: string
    subscriptionInterval?: string
    subscriptionCurrentPeriodEnd?: Date
  }
} 