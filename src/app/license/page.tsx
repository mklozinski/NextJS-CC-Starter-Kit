import { Button } from "@/components/ui/button"
import { Scale, Heart, Code, Users, Shield } from "lucide-react"
import Link from "next/link"

export default function LicensePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-black dark:to-gray-900">
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center">
              <Scale className="w-10 h-10 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl md:text-6xl mb-6">
            License
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            This Next.js Starter Kit is completely free and open source. 
            Use it to build your next SaaS, startup, or any project you have in mind.
          </p>
        </div>

        {/* License Type Cards */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {/* Open Source Card */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 border-2 border-green-200 dark:border-green-700">
            <div className="flex items-center mb-4">
              <Heart className="w-8 h-8 text-green-600 mr-3" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Open Source & Free</h2>
            </div>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              This starter kit is released under the MIT License, making it completely free for personal and commercial use.
            </p>
            <ul className="space-y-3">
              <li className="flex items-center text-gray-700 dark:text-gray-300">
                <span className="w-2 h-2 bg-green-600 rounded-full mr-3"></span>
                Use for personal projects
              </li>
              <li className="flex items-center text-gray-700 dark:text-gray-300">
                <span className="w-2 h-2 bg-green-600 rounded-full mr-3"></span>
                Use for commercial projects
              </li>
              <li className="flex items-center text-gray-700 dark:text-gray-300">
                <span className="w-2 h-2 bg-green-600 rounded-full mr-3"></span>
                Modify and distribute
              </li>
              <li className="flex items-center text-gray-700 dark:text-gray-300">
                <span className="w-2 h-2 bg-green-600 rounded-full mr-3"></span>
                No attribution required
              </li>
            </ul>
          </div>

          {/* Community Card */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center mb-4">
              <Users className="w-8 h-8 text-blue-600 mr-3" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Community Driven</h2>
            </div>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Built by developers, for developers. Contributions and feedback are always welcome.
            </p>
            <ul className="space-y-3">
              <li className="flex items-center text-gray-700 dark:text-gray-300">
                <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                Open to contributions
              </li>
              <li className="flex items-center text-gray-700 dark:text-gray-300">
                <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                Community support
              </li>
              <li className="flex items-center text-gray-700 dark:text-gray-300">
                <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                Regular updates
              </li>
              <li className="flex items-center text-gray-700 dark:text-gray-300">
                <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                Issue tracking
              </li>
            </ul>
          </div>
        </div>

        {/* What You Can Do Section */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-16">
          <div className="flex items-center mb-6">
            <Code className="w-8 h-8 text-purple-600 mr-3" />
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">What You Can Do</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">✅ Allowed</h3>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                <li>• Use for personal and commercial projects</li>
                <li>• Modify the code to fit your needs</li>
                <li>• Create SaaS products and startups</li>
                <li>• Sell products built with this starter kit</li>
                <li>• Fork and create your own versions</li>
                <li>• Use in client projects</li>
                <li>• Remove or change any branding</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">❌ Please Don&apos;t</h3>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                <li>• Resell the starter kit itself as-is</li>
                <li>• Claim you created the original starter kit</li>
                <li>• Create competing starter kit marketplaces</li>
                <li>• Remove the LICENSE file from your repo</li>
              </ul>
            </div>
          </div>
        </div>

        {/* MIT License Text */}
        <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-8 mb-16">
          <div className="flex items-center mb-6">
            <Shield className="w-8 h-8 text-gray-600 dark:text-gray-400 mr-3" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">MIT License</h2>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 font-mono text-sm text-gray-800 dark:text-gray-200 overflow-x-auto">
            <pre className="whitespace-pre-wrap">
{`MIT License

Copyright (c) ${new Date().getFullYear()} Next.js Starter Kit

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.`}
            </pre>
          </div>
        </div>

        {/* Third-Party Licenses */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-16">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Third-Party Dependencies</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            This starter kit includes several third-party libraries and services, each with their own licenses:
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Core Dependencies</h3>
              <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                <li>• <strong>Next.js</strong> - MIT License</li>
                <li>• <strong>React</strong> - MIT License</li>
                <li>• <strong>TypeScript</strong> - Apache 2.0</li>
                <li>• <strong>Tailwind CSS</strong> - MIT License</li>
                <li>• <strong>Prisma</strong> - Apache 2.0</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Services & Integrations</h3>
              <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                <li>• <strong>NextAuth.js</strong> - ISC License</li>
                <li>• <strong>Stripe</strong> - Commercial Service</li>
                <li>• <strong>Resend</strong> - Commercial Service</li>
                <li>• <strong>MongoDB</strong> - SSPL License</li>
                <li>• <strong>React Email</strong> - MIT License</li>
              </ul>
            </div>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-6">
            Please review the individual licenses of these dependencies for your specific use case.
          </p>
        </div>

        {/* Call to Action */}
        <div className="text-center bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg shadow-lg p-8 text-white">
          <h2 className="text-2xl font-bold mb-4">Ready to Build Something Amazing?</h2>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            Get started with this free, production-ready Next.js starter kit. 
            No hidden costs, no restrictions - just start building!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/">
              <Button
                size="lg"
                className="bg-white text-blue-600 hover:bg-gray-100 font-semibold"
              >
                View Instructions
              </Button>
            </Link>
            <a
              href="https://github.com/yourusername/nextjs-starter-kit"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-blue-600 font-semibold"
              >
                View on GitHub
              </Button>
            </a>
          </div>
        </div>

        {/* Contact Section */}
        <div className="mt-16 text-center">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Questions About Licensing?</h3>
          <p className="text-gray-600 dark:text-gray-300">
            If you have any questions about how you can use this starter kit, feel free to{" "}
            <a 
              href="https://github.com/yourusername/nextjs-starter-kit/issues" 
              className="text-blue-600 dark:text-blue-400 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              open an issue on GitHub
            </a>{" "}
            or reach out to the community.
          </p>
        </div>
      </main>
    </div>
  )
}
