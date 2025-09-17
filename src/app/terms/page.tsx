import { FileText, Scale, Shield, AlertTriangle, Users, Heart } from "lucide-react"
import Link from "next/link"

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-black dark:to-gray-900">
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center">
              <Scale className="w-10 h-10 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl md:text-6xl mb-6">
            Terms of Service
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Terms and conditions for using this free, open-source Next.js starter kit 
            and its demo website.
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
            Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>

        {/* Important Notice */}
        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-6 mb-12">
          <div className="flex items-start">
            <Heart className="w-6 h-6 text-green-600 dark:text-green-400 mt-1 mr-3 flex-shrink-0" />
            <div>
              <h3 className="text-lg font-semibold text-green-900 dark:text-green-100 mb-2">
                Free & Open Source
              </h3>
              <p className="text-green-800 dark:text-green-200">
                This starter kit is completely free to use, modify, and distribute. 
                These terms primarily govern the use of this demo website and clarify 
                your rights and responsibilities when using the starter kit.
              </p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="space-y-12">
          {/* Introduction */}
          <section className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
            <div className="flex items-center mb-6">
              <FileText className="w-8 h-8 text-blue-600 mr-3" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Introduction</h2>
            </div>
            
            <div className="space-y-4 text-gray-700 dark:text-gray-300">
              <p>
                By using this Next.js starter kit or accessing this demo website, you agree to be bound by these terms and conditions.
              </p>
              <p>
                This agreement takes effect when you:
              </p>
              <ul className="ml-6 space-y-1">
                <li>• Download or clone the starter kit</li>
                <li>• Use any part of the code in your projects</li>
                <li>• Access or interact with this demo website</li>
                <li>• Test the authentication or other features</li>
              </ul>
            </div>
          </section>

          {/* Product Description */}
          <section className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
            <div className="flex items-center mb-6">
              <Users className="w-8 h-8 text-purple-600 mr-3" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Product Description</h2>
            </div>
            
            <div className="space-y-4 text-gray-700 dark:text-gray-300">
              <p>
                The Next.js Starter Kit is a free, open-source boilerplate that provides:
              </p>
              <div className="grid md:grid-cols-2 gap-6 mt-4">
                <ul className="space-y-2">
                  <li>• Complete authentication system with NextAuth.js</li>
                  <li>• Database integration with Prisma and MongoDB</li>
                  <li>• Email functionality with React Email and Resend</li>
                  <li>• Payment processing with Stripe (optional)</li>
                </ul>
                <ul className="space-y-2">
                  <li>• Modern UI with Tailwind CSS</li>
                  <li>• Dark/light theme support</li>
                  <li>• TypeScript configuration</li>
                  <li>• Production-ready setup</li>
                </ul>
              </div>
              <p className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
                <strong>Access:</strong> The starter kit is available immediately through GitHub. 
                No purchase required, no account creation needed - just clone and start building!
              </p>
            </div>
          </section>

          {/* License and Usage */}
          <section className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
            <div className="flex items-center mb-6">
              <Shield className="w-8 h-8 text-green-600 mr-3" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">License and Permitted Use</h2>
            </div>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">✅ What You Can Do</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                    <li>• Use for personal projects</li>
                    <li>• Use for commercial projects</li>
                    <li>• Build and sell SaaS applications</li>
                    <li>• Modify the code as needed</li>
                    <li>• Use in client work</li>
                  </ul>
                  <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                    <li>• Create unlimited projects</li>
                    <li>• Fork and customize</li>
                    <li>• Remove or change branding</li>
                    <li>• Distribute your modified versions</li>
                    <li>• Use without attribution (though appreciated!)</li>
                  </ul>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">❌ Please Don&apos;t</h3>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                  <li>• Resell the starter kit itself as-is without significant modifications</li>
                  <li>• Claim you created the original starter kit</li>
                  <li>• Create competing starter kit marketplaces using our exact code</li>
                  <li>• Remove the MIT license file from your repositories</li>
                  <li>• Use our branding or claim official endorsement</li>
                </ul>
              </div>
            </div>
          </section>

          {/* No Refunds (Not Applicable) */}
          <section className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
            <div className="flex items-center mb-6">
              <Heart className="w-8 h-8 text-pink-600 mr-3" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">No Cost, No Refunds Needed</h2>
            </div>
            
            <div className="space-y-4 text-gray-700 dark:text-gray-300">
              <p>
                Since this starter kit is completely free, there are no refunds to process! 
                You can use it risk-free for any purpose.
              </p>
              <p>
                If you encounter issues or have suggestions, please:
              </p>
              <ul className="ml-6 space-y-1">
                <li>• Open an issue on our GitHub repository</li>
                <li>• Contribute improvements via pull requests</li>
                <li>• Share feedback with the community</li>
              </ul>
            </div>
          </section>

          {/* Disclaimer */}
          <section className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
            <div className="flex items-center mb-6">
              <AlertTriangle className="w-8 h-8 text-yellow-600 mr-3" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Disclaimer</h2>
            </div>
            
            <div className="space-y-4 text-gray-700 dark:text-gray-300">
              <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
                <p className="font-semibold text-yellow-800 dark:text-yellow-200 mb-2">
                  Important: &quot;As-Is&quot; Software
                </p>
                <p className="text-yellow-700 dark:text-yellow-300">
                  This starter kit is provided &quot;as-is&quot; without warranties of any kind. 
                  We do not guarantee it will meet your specific requirements or be bug-free.
                </p>
              </div>
              
              <div className="space-y-3">
                <p>
                  <strong>Security Responsibility:</strong> While we implement security best practices, 
                  you are responsible for:
                </p>
                <ul className="ml-6 space-y-1">
                  <li>• Conducting your own security audits</li>
                  <li>• Keeping dependencies updated</li>
                  <li>• Implementing proper security measures for production</li>
                  <li>• Protecting user data in your applications</li>
                  <li>• Ensuring compliance with applicable laws and regulations</li>
                </ul>

                <p>
                  <strong>Data Loss Protection:</strong> We are not liable for any data loss, 
                  security breaches, or damages that may occur from using this starter kit. 
                  Always maintain proper backups and security practices.
                </p>
              </div>
            </div>
          </section>

          {/* Limitation of Liability */}
          <section className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
            <div className="flex items-center mb-6">
              <Shield className="w-8 h-8 text-red-600 mr-3" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Limitation of Liability</h2>
            </div>
            
            <div className="space-y-4 text-gray-700 dark:text-gray-300">
              <p>
                To the maximum extent permitted by law, the creators and contributors of this starter kit 
                shall not be liable for any:
              </p>
              <ul className="ml-6 space-y-1">
                <li>• Direct, indirect, incidental, or consequential damages</li>
                <li>• Loss of profits, data, or business opportunities</li>
                <li>• Security breaches or data leaks in your applications</li>
                <li>• Issues arising from third-party services or dependencies</li>
                <li>• Problems caused by modifications you make to the code</li>
              </ul>
              
              <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg border border-gray-200 dark:border-gray-700 mt-4">
                <p className="font-semibold mb-2">Your Responsibilities:</p>
                <p>
                  You acknowledge that you use this starter kit at your own risk and are responsible 
                  for ensuring it meets your needs, security requirements, and legal obligations.
                </p>
              </div>
            </div>
          </section>

          {/* Third-Party Services */}
          <section className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
            <div className="flex items-center mb-6">
              <Users className="w-8 h-8 text-indigo-600 mr-3" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Third-Party Services</h2>
            </div>
            
            <div className="space-y-4 text-gray-700 dark:text-gray-300">
              <p>
                This starter kit integrates with various third-party services. When you use these services:
              </p>
              <ul className="ml-6 space-y-1">
                <li>• You agree to their respective terms of service</li>
                <li>• Their privacy policies and terms apply</li>
                <li>• You are responsible for any costs they may charge</li>
                <li>• We are not responsible for their availability or performance</li>
              </ul>
              
              <div className="grid md:grid-cols-2 gap-4 mt-4">
                <div>
                  <h4 className="font-semibold mb-2">Included Integrations:</h4>
                  <ul className="space-y-1 text-sm">
                    <li>• NextAuth.js (Authentication)</li>
                    <li>• Stripe (Payments - optional)</li>
                    <li>• Resend (Email service)</li>
                    <li>• MongoDB (Database)</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Your Responsibility:</h4>
                  <ul className="space-y-1 text-sm">
                    <li>• Review their terms and pricing</li>
                    <li>• Set up accounts as needed</li>
                    <li>• Configure API keys securely</li>
                    <li>• Monitor usage and costs</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Governing Law */}
          <section className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
            <div className="flex items-center mb-6">
              <Scale className="w-8 h-8 text-gray-600 mr-3" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Governing Law</h2>
            </div>
            
            <div className="space-y-4 text-gray-700 dark:text-gray-300">
              <p>
                These terms are governed by the laws of your jurisdiction. Since this is a free, 
                open-source project, we encourage resolving any issues through community discussion 
                and GitHub issues rather than legal proceedings.
              </p>
              <p>
                No joint venture, partnership, employment, or agency relationship exists between 
                you and the creators of this starter kit as a result of using this software.
              </p>
            </div>
          </section>

          {/* Contact & Updates */}
          <section className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg shadow-lg p-8 text-white">
            <h2 className="text-2xl font-bold text-white mb-6">Contact & Updates</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold mb-3">Questions or Issues?</h3>
                <div className="space-y-2">
                  <p>
                    <strong>GitHub Issues:</strong>{" "}
                    <a 
                      href="https://github.com/yourusername/nextjs-starter-kit/issues" 
                      className="text-white hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Report issues or ask questions
                    </a>
                  </p>
                  <p>
                    <strong>Email:</strong>{" "}
                    <a href="mailto:info@nextjs.cc" className="text-white hover:underline">
                      info@nextjs.cc
                    </a>
                  </p>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-3">Terms Updates</h3>
                <p className="text-blue-100">
                  We may update these terms occasionally. Changes will be posted here with 
                  an updated date. Continued use after changes constitutes acceptance of new terms.
                </p>
              </div>
            </div>
          </section>

          {/* Final Note */}
          <section className="text-center bg-gray-50 dark:bg-gray-900 rounded-lg p-6">
            <p className="text-gray-700 dark:text-gray-300">
              Thank you for using our free Next.js starter kit! We hope it helps you build amazing applications. 
              Check out our{" "}
              <Link href="/license" className="text-blue-600 dark:text-blue-400 hover:underline">
                License page
              </Link>{" "}
              for more details about usage rights, and our{" "}
              <Link href="/privacy" className="text-blue-600 dark:text-blue-400 hover:underline">
                Privacy Policy
              </Link>{" "}
              for information about data handling.
            </p>
          </section>
        </div>
      </main>
    </div>
  )
}
