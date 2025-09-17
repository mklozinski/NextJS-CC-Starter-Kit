"use client"

import { useSession } from "next-auth/react";
import Link from "next/link";
import { Copyright } from "lucide-react";

export default function Footer() {
  const isAuth = useSession();
  return (
    <footer className="border-t border-gray-300 dark:border-gray-800 bg-gradient-to-tr from-blue-50 to-indigo-100 dark:from-black dark:to-gray-900">
      <div className="max-w-7xl mx-auto py-12 lg:py-20 px-4 sm:px-6 lg:px-8 flex flex-col gap-4">
        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-1">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Next.js CC Starter Kit</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm italic">
              Production-ready boilerplate code for your next SaaS application.
            </p>
            <span className="mt-6 flex items-center gap-2">
              <Copyright className="w-4 h-4 text-gray-600 dark:text-gray-300" />  
              <span className="text-gray-600 dark:text-gray-300 text-sm italic">
                {new Date().getFullYear()} Mike Lozinski (mklozinski)
              </span>
            </span>
          </div>
          <div className="col-span-1">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Links</h3>
            <ul className="space-y-2 text-gray-600 dark:text-gray-300">
              <li><Link href="/">Home</Link></li>
              <li><Link href="/pricing">Pricing (Stripe example)</Link></li>
              <li><Link href="https://github.com/mklozinski/NextJS-CC-Starter-Kit">Github Repo</Link></li>
              {
                isAuth.status === "authenticated" ? (
                  <li><Link href="/dashboard">Dashboard</Link></li>
                ) : (
                  <>
                    <li><Link href="/login">Login</Link></li>
                    <li><Link href="/register">Register</Link></li>
                  </>
                )
              }
            </ul>
          </div>
          <div className="col-span-1">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Legal</h3>
            <ul className="space-y-2 text-gray-600 dark:text-gray-300">
              <li><Link href="/license">License</Link></li>
              <li><Link href="/privacy">Privacy Policy</Link></li>
              <li><Link href="/terms">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}