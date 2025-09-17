"use client"

import {
  signIn,
  getProviders,
  useSession,
  type ClientSafeProvider,
  type LiteralUnion,
} from "next-auth/react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { redirect } from "next/navigation"

export default function SignIn() {
  const [providers, setProviders] =
    useState<Record<LiteralUnion<string>, ClientSafeProvider> | null>(null)
  const session = useSession()
  
  if (session.data?.user) {
    redirect("/")
  }
  useEffect(() => {
    const setUpProviders = async () => {
      const response = await getProviders()
      setProviders(response)
    }
    setUpProviders()
  }, [])
  
  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-black">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
            Choose your preferred sign-in method
          </p>
        </div>
        
        <div className="mt-8 space-y-4">
          {providers &&
            (Object.keys(providers) as Array<LiteralUnion<string>>).map(
              (providerKey) => {
                const provider = providers[providerKey]
                if (provider.name === "credentials") {
                  return (
                    <div
                      key={providerKey}
                      className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow dark:border dark:border-gray-700"
                    >
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                        Sign in with Email
                      </h3>
                      <form
                        onSubmit={(e) => {
                          e.preventDefault()
                          const formData = new FormData(
                            e.target as HTMLFormElement,
                          )
                          signIn("credentials", {
                            email: formData.get("email"),
                            password: formData.get("password"),
                            callbackUrl: "/",
                          })
                        }}
                        className="space-y-4"
                      >
                        <div>
                          <label htmlFor="email" className="sr-only">
                            Email address
                          </label>
                          <input
                            id="email"
                            name="email"
                            type="email"
                            autoComplete="email"
                            required
                            className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white bg-white dark:bg-gray-700 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                            placeholder="Email address"
                          />
                        </div>
                        <div>
                          <label htmlFor="password" className="sr-only">
                            Password
                          </label>
                          <input
                            id="password"
                            name="password"
                            type="password"
                            autoComplete="current-password"
                            required
                            className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white bg-white dark:bg-gray-700 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                            placeholder="Password"
                          />
                        </div>
                        <Button type="submit" className="w-full">
                          Sign in with Email
                        </Button>
                      </form>
                      <div className="mt-4 text-center">
                        <Link
                          href="/forgot-password"
                          className="text-sm text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
                        >
                          Forgot your password?
                        </Link>
                      </div>
                      <p className="mt-4 text-xs text-gray-600 dark:text-gray-400 text-center">
                        Demo credentials: user@example.com / password123
                      </p>
                    </div>
                  )
                }

                return (
                  <div
                    key={providerKey}
                    className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow dark:border dark:border-gray-700"
                  >
                    <Button
                      onClick={() => signIn(provider.id, { callbackUrl: "/" })}
                      className="w-full"
                      variant="outline"
                    >
                      Sign in with {provider.name}
                    </Button>
                  </div>
                )
              },
            )}
        </div>
        
        <div className="text-center">
          <Link
            href="/"
            className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
          >
            Back to home
          </Link>
        </div>
      </div>
    </div>
  )
} 