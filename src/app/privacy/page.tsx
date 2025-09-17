import { Shield, Eye, Lock, Users, FileText, Mail } from "lucide-react"

{/* This is from demo-website page. Adapt to your project. */}

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-black dark:to-gray-900">
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-green-600 rounded-full flex items-center justify-center">
              <Shield className="w-10 h-10 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl md:text-6xl mb-6">
            Privacy Policy
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Your privacy matters to us. This policy explains how we handle information 
            related to this free, open-source Next.js CC starter kit.
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
            Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>

        {/* Important Notice */}
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6 mb-12">
          <div className="flex items-start">
            <Eye className="w-6 h-6 text-blue-600 dark:text-blue-400 mt-1 mr-3 flex-shrink-0" />
            <div>
              <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-2">
                Important: This is a Free Starter Kit
              </h3>
              <p className="text-blue-800 dark:text-blue-200">
                This Next.js CC starter kit is completely free and open source. We don&apos;t collect personal data, 
                run analytics on your usage, or track you in any way. This privacy policy primarily covers 
                the demo website and any optional third-party services you might choose to integrate.
              </p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="space-y-12">
          {/* What We Collect */}
          <section className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
            <div className="flex items-center mb-6">
              <FileText className="w-8 h-8 text-purple-600 mr-3" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">What Information We Collect</h2>
            </div>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">From This Demo Website</h3>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                  <li>• <strong>Demo Account Data:</strong> If you test the authentication system using our demo accounts, no real personal data is stored</li>
                  <li>• <strong>Basic Analytics:</strong> We may use Google Analytics to understand how visitors interact with this demo site</li>
                  <li>• <strong>Error Logs:</strong> Technical logs for debugging and improving the demo experience</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">When You Use the Starter Kit</h3>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                  <li>• <strong>No Data Collection:</strong> The starter kit itself doesn&apos;t collect any data about you or your users</li>
                  <li>• <strong>Your Responsibility:</strong> Any data collection in your built application is entirely under your control</li>
                  <li>• <strong>Third-Party Services:</strong> If you choose to integrate services like Stripe, Google Analytics, etc., their privacy policies apply</li>
                </ul>
              </div>
            </div>
          </section>

          {/* How We Use Information */}
          <section className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
            <div className="flex items-center mb-6">
              <Users className="w-8 h-8 text-blue-600 mr-3" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">How We Use Information</h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Demo Website</h3>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                  <li>• Provide demo functionality</li>
                  <li>• Improve user experience</li>
                  <li>• Monitor site performance</li>
                  <li>• Fix bugs and issues</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Your Applications</h3>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                  <li>• We have no access to your data</li>
                  <li>• You control all data practices</li>
                  <li>• You must create your own privacy policy</li>
                  <li>• You&apos;re responsible for compliance</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Data Protection */}
          <section className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
            <div className="flex items-center mb-6">
              <Lock className="w-8 h-8 text-red-600 mr-3" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Data Protection & Security</h2>
            </div>
            
            <div className="space-y-4 text-gray-700 dark:text-gray-300">
              <p>
                <strong>For this demo website:</strong> We implement reasonable security measures to protect 
                any information collected through this demo site. However, no internet transmission is 100% secure.
              </p>
              <p>
                <strong>For your applications:</strong> The starter kit includes security best practices, but 
                you are responsible for:
              </p>
              <ul className="ml-6 space-y-1">
                <li>• Implementing proper security measures</li>
                <li>• Keeping dependencies updated</li>
                <li>• Conducting security audits</li>
                <li>• Protecting user data in your applications</li>
              </ul>
            </div>
          </section>

          {/* Third-Party Services */}
          <section className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
            <div className="flex items-center mb-6">
              <Users className="w-8 h-8 text-orange-600 mr-3" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Third-Party Services</h2>
            </div>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Included in Starter Kit</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  The starter kit includes integrations with various third-party services. 
                  When you use these services, their privacy policies apply:
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                    <li>• <strong>NextAuth.js:</strong> Authentication provider</li>
                    <li>• <strong>Google OAuth:</strong> Google&apos;s privacy policy</li>
                    <li>• <strong>GitHub OAuth:</strong> GitHub&apos;s privacy policy</li>
                    <li>• <strong>Stripe:</strong> Payment processing (if enabled)</li>
                  </ul>
                  <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                    <li>• <strong>Resend:</strong> Email service provider</li>
                    <li>• <strong>MongoDB:</strong> Database hosting</li>
                    <li>• <strong>Vercel:</strong> Hosting platform (if used)</li>
                    <li>• <strong>Google Analytics:</strong> Website analytics (optional)</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Your Rights */}
          <section className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
            <div className="flex items-center mb-6">
              <Shield className="w-8 h-8 text-green-600 mr-3" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Your Rights</h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Regarding This Demo</h3>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                  <li>• Request information about data we collect</li>
                  <li>• Ask for deletion of any demo account data</li>
                  <li>• Opt out of analytics tracking</li>
                  <li>• Contact us with privacy concerns</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">For Your Applications</h3>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                  <li>• You control all user data practices</li>
                  <li>• You must implement user rights (GDPR, etc.)</li>
                  <li>• You need your own privacy policy</li>
                  <li>• You handle all data requests</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Contact Information */}
          <section className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg shadow-lg p-8 text-white">
            <div className="flex items-center mb-6">
              <Mail className="w-8 h-8 text-white mr-3" />
              <h2 className="text-2xl font-bold text-white">Contact Us</h2>
            </div>
            
            <div className="space-y-4">
              <p className="text-blue-100">
                If you have any questions about this privacy policy or how we handle data, please contact us:
              </p>
              <div className="space-y-2">
                <p>
                  <strong>GitHub Issues:</strong>{" "}
                  <a 
                    href="https://github.com/mklozinski/NextJS-CC-Starter-Kit/issues" 
                    className="text-white hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Create an issue on GitHub
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
          </section>

          {/* Updates */}
          <section className="bg-gray-50 dark:bg-gray-900 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Policy Updates</h3>
            <p className="text-gray-700 dark:text-gray-300">
              We may update this privacy policy from time to time. Any changes will be posted on this page 
              with an updated &quot;Last updated&quot; date. For significant changes, we may provide additional notice 
              through our GitHub repository.
            </p>
          </section>
        </div>
      </main>
    </div>
  )
}
