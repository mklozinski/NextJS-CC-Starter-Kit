import CredentialsProvider from 'next-auth/providers/credentials'
import GoogleProvider from 'next-auth/providers/google'
import GitHubProvider from 'next-auth/providers/github'
import bcrypt from 'bcryptjs'
import { prisma } from '@/lib/prisma'
import type { NextAuthOptions } from 'next-auth'

export const authOptions: NextAuthOptions = {
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID!,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
		}),
		GitHubProvider({
			clientId: process.env.GITHUB_ID!,
			clientSecret: process.env.GITHUB_SECRET!,
		}),
		CredentialsProvider({
			name: 'credentials',
			credentials: {
				email: { label: 'Email', type: 'email' },
				password: { label: 'Password', type: 'password' }
			},
			async authorize(credentials) {
				if (!credentials?.email || !credentials?.password) {
					return null
				}

				const user = await prisma.user.findUnique({
					where: {
						email: credentials.email
					}
				})

				if (!user || !user.active) {
					return null
				}

				const isPasswordValid = await bcrypt.compare(
					credentials.password,
					user.password || ''
				)

				if (!isPasswordValid) {
					return null
				}
				
				return {
					id: user.id,
					email: user.email ?? undefined,
					name: user.name ?? undefined,
					image: user.image ?? undefined,
					subscriptionPlan: user.subscriptionPlan ?? undefined,
					subscriptionStatus: user.subscriptionStatus ?? undefined,
					subscriptionInterval: user.subscriptionInterval ?? undefined,
					subscriptionCurrentPeriodEnd: user.subscriptionCurrentPeriodEnd ?? undefined,
				}
			}
		})
	],
	session: {
		strategy: 'jwt',
		maxAge: 30 * 24 * 60 * 60, // 30 days
		updateAge: 24 * 60 * 60, // 24 hours
	},
	callbacks: {
		async jwt({ token, user, trigger }) {
			if (user) {
				token.email = user.email
				token.id = user.id
				token.name = user.name
				token.image = user.image
				token.subscriptionPlan = user.subscriptionPlan
				token.subscriptionStatus = user.subscriptionStatus
				token.subscriptionInterval = user.subscriptionInterval
				token.subscriptionCurrentPeriodEnd = user.subscriptionCurrentPeriodEnd
			}
			
			// Force token refresh on update or fetch fresh subscription data
			if (trigger === 'update') {
				if (token.id) {
					const userWithSubscription = await prisma.user.findUnique({
						where: { id: token.id as string },
						select: {
							subscriptionPlan: true,
							subscriptionStatus: true,
							subscriptionInterval: true,
							subscriptionCurrentPeriodEnd: true,
							name: true,
							email: true,
							image: true,
						}
					})
					
					if (userWithSubscription) {
						token.subscriptionPlan = userWithSubscription.subscriptionPlan ?? undefined
						token.subscriptionStatus = userWithSubscription.subscriptionStatus ?? undefined
						token.subscriptionInterval = userWithSubscription.subscriptionInterval ?? undefined
						token.subscriptionCurrentPeriodEnd = userWithSubscription.subscriptionCurrentPeriodEnd ?? undefined
						token.name = userWithSubscription.name
						token.email = userWithSubscription.email
						token.image = userWithSubscription.image
					}
				}
			}
			
			return token
		},
		async session({ session, token }) {
			if (token && session.user) {
				session.user.id = token.sub as string
				session.user.email = token.email as string
				session.user.name = token.name as string
				session.user.image = token.image as string
				session.user.subscriptionPlan = token.subscriptionPlan as string
				session.user.subscriptionStatus = token.subscriptionStatus as string
				session.user.subscriptionInterval = token.subscriptionInterval as string
				session.user.subscriptionCurrentPeriodEnd = token.subscriptionCurrentPeriodEnd as Date
			}
			return session
		},
	},
	pages: {
		signIn: '/login',
	},
	events: {
		async signIn(message) {
			console.log('User signed in:', message.user.email)
		},
		async signOut() {
			console.log('User signed out')
		},
	},
	debug: process.env.NODE_ENV === 'development',
} 