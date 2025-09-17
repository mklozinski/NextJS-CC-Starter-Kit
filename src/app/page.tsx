
import { Button } from "@/components/ui/button"
// Clean starter: images and FAQ removed

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-black dark:to-gray-900">
      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl md:text-6xl">Next.js CC Starter Kit</h1>
          <p className="mt-3 max-w-2xl mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl">
            Clean boilerplate with auth, Prisma (MongoDB), emails, and optional Stripe. Follow the steps below to start.
          </p>
          <div className="mt-8 flex justify-center space-x-4">
            <a
              href="https://github.com/mklozinski/NextJS-CC-Starter-Kit"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button size="lg">Open Dev Repo</Button>
            </a>
          </div>
        </div>

        {/* Getting Started Detailed Instructions */}
        <div className="mt-20 bg-white rounded-lg shadow-lg p-8">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center">Getting Started</h2>
            <p className="text-gray-600 mb-6 text-center">
              Fork or use this template, configure env vars, set up your database and Stripe, and start building.
            </p>

            <ol className="list-decimal list-inside space-y-6 text-gray-800">
              <li>
                <span className="font-semibold">Use the repo as a template</span>
                <div className="mt-2 text-sm text-gray-600">
                  Open the repository and click <span className="font-medium">Use this template</span> or fork it.
                </div>
                <div className="mt-3">
                  <a href="https://github.com/mklozinski/NextJS-CC-Starter-Kit" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Open repository</a>
                </div>
              </li>
              <li>
                <span className="font-semibold">Clone and install</span>
                <pre className="mt-2 bg-gray-900 text-gray-100 rounded-md p-4 overflow-x-auto text-sm">
{`git clone https://github.com/mklozinski/NextJS-CC-Starter-Kit my-app
cd my-app
npm install`}
                </pre>
              </li>
              <li>
                <span className="font-semibold">Configure environment variables</span>
                <div className="mt-2 text-sm text-gray-600">Copy the example file and fill values:</div>
                <pre className="mt-2 bg-gray-900 text-gray-100 rounded-md p-4 overflow-x-auto text-sm">
{`cp .env.example .env`}
                </pre>
                <div className="mt-2 text-sm text-gray-700">
                  Env keys to set:
                  <ul className="list-disc list-inside mt-2 space-y-1">
                    <li><code className="font-mono">DATABASE_URL</code></li>
                    <li><code className="font-mono">NEXTAUTH_URL</code>, <code className="font-mono">NEXT_PUBLIC_URL</code>, <code className="font-mono">NEXTAUTH_SECRET</code></li>
                    <li><code className="font-mono">GOOGLE_CLIENT_ID</code>, <code className="font-mono">GOOGLE_CLIENT_SECRET</code> (optional)</li>
                    <li><code className="font-mono">GITHUB_CLIENT_ID</code>, <code className="font-mono">GITHUB_CLIENT_SECRET</code> (optional)</li>
                    <li><code className="font-mono">NEXT_PUBLIC_GOOGLE_ANALYTICS</code> (optional)</li>
                    <li><code className="font-mono">RESEND_API_KEY</code>, <code className="font-mono">FROM_EMAIL</code>, <code className="font-mono">EMAIL_NAME</code></li>
                    <li><code className="font-mono">STRIPE_SECRET_KEY</code>, <code className="font-mono">STRIPE_WEBHOOK_SECRET</code></li>
                    <li><code className="font-mono">STRIPE_PRICE_PRO_MONTHLY</code>, <code className="font-mono">STRIPE_PRICE_PRO_YEARLY</code></li>
                    <li><code className="font-mono">STRIPE_PRICE_ULTRA_MONTHLY</code>, <code className="font-mono">STRIPE_PRICE_ULTRA_YEARLY</code></li>
                  </ul>
                </div>
              </li>
              <li>
                <span className="font-semibold">Set up the database (Prisma + MongoDB)</span>
                <pre className="mt-2 bg-gray-900 text-gray-100 rounded-md p-4 overflow-x-auto text-sm">
{`npx prisma db push
npm run seed`}
                </pre>
              </li>
              <li>
                <span className="font-semibold">Run the app</span>
                <pre className="mt-2 bg-gray-900 text-gray-100 rounded-md p-4 overflow-x-auto text-sm">
{`npm run dev`}
                </pre>
                <div className="mt-2 text-sm text-gray-600">Open http://localhost:3000</div>
              </li>
              <li>
                <span className="font-semibold">Enable Stripe webhooks (optional)</span>
                <pre className="mt-2 bg-gray-900 text-gray-100 rounded-md p-4 overflow-x-auto text-sm">
{`stripe listen --forward-to localhost:3000/api/stripe/webhook`}
                </pre>
                <div className="mt-2 text-sm text-gray-600">Copy the <span className="font-mono">whsec_*</span> value and set <span className="font-mono">STRIPE_WEBHOOK_SECRET</span> in <span className="font-mono">.env</span>.</div>
              </li>
            </ol>
          </div>
        </div>

        {/* Quick link to repo */}
        <div className="text-center mt-8">
          <a
            href="https://github.com/mklozinski/NextJS-CC-Starter-Kit"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Open Dev Repo
          </a>
        </div>

        {/* FAQ removed */}
      </main>
    </div>
  )
}
