"use client"

import { signIn, signOut, useSession } from "next-auth/react"
import { Button } from "@/components/ui/button"

export function SignInButton() {
  const { data: session, status } = useSession()

  if (status === "loading") {
    return <Button disabled>Loading...</Button>
  }

  if (session) {
    return (
      <div className="flex items-center gap-4">
        <span className="text-sm">
          Welcome, {session.user?.name || session.user?.email}!
        </span>
        <Button onClick={() => signOut()} variant="outline">
          Sign Out
        </Button>
      </div>
    )
  }

  return (
    <Button onClick={() => signIn()}>
      Sign In
    </Button>
  )
} 