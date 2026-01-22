function Terms() {
  const handleBackClick = (e) => {
    e.preventDefault()
    window.history.pushState({}, '', '/')
    window.dispatchEvent(new PopStateEvent('popstate'))
    window.scrollTo(0, 0)
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="px-6 py-8 border-b border-gray-200">
        <div className="max-w-4xl mx-auto">
          <a href="/" onClick={handleBackClick} className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Home
          </a>
        </div>
      </header>

      {/* Content */}
      <main className="px-6 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-semibold text-gray-900 mb-4">
            Terms of Service
          </h1>
          <p className="text-gray-500 mb-12">Last updated: January 22, 2026</p>

          {/* Introduction */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Acceptance of Terms</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              By accessing or using ReflexFlow ("the App," "our Service"), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use the App.
            </p>
          </section>

          {/* Use of Service */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Use of Service</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              ReflexFlow provides educational content and physical habituation techniques for personal development and sensory conditioning. The App is intended for adults aged 18 and over.
            </p>
            <p className="text-gray-600 leading-relaxed mb-4">
              You agree to use the Service only for lawful purposes and in accordance with these Terms. You may not:
            </p>
            <ul className="space-y-2 text-gray-600 ml-6 mb-4">
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Use the Service in any way that violates applicable laws or regulations</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Attempt to reverse engineer, decompile, or disassemble the App</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Use the Service to harm, harass, or impersonate others</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Distribute viruses, malware, or other harmful code</span>
              </li>
            </ul>
          </section>

          {/* Medical Disclaimer */}
          <section className="mb-12 bg-amber-50 border-l-4 border-amber-500 p-6 rounded-r-lg">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
              <svg className="w-6 h-6 mr-2 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              3. Medical Disclaimer & Assumption of Risk
            </h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p className="font-semibold">
                ReflexFlow is NOT a medical device and does not provide medical advice, diagnosis, or treatment.
              </p>
              <p>
                The pharyngeal reflex (gag reflex) is a natural protective mechanism. By using this app, you acknowledge that you are voluntarily engaging in desensitization exercises.
              </p>
              <p>
                <strong>You must consult with a qualified healthcare professional</strong> before beginning any new physical training, especially if you have underlying gastrointestinal, neurological, or respiratory conditions.
              </p>
              <p className="font-semibold text-red-700">
                IMPORTANT: Never use these techniques while eating, drinking, or in any situation where a suppressed reflex could pose a choking hazard.
              </p>
              <p className="font-semibold">
                Use of this program is entirely at your own risk. ReflexFlow and its creators assume no liability for any injuries, health complications, or adverse outcomes resulting from use of the App.
              </p>
            </div>
          </section>

          {/* Waitlist & Beta Access */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Waitlist & Beta Access</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              By joining the ReflexFlow waitlist, you provide your email address to receive updates about the App's availability. Joining the waitlist does not guarantee access to the beta program or the final product.
            </p>
            <p className="text-gray-600 leading-relaxed">
              We reserve the right to limit, modify, or terminate beta access at any time without notice.
            </p>
          </section>

          {/* Intellectual Property */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Intellectual Property</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              All content, features, and functionality of ReflexFlow, including but not limited to text, graphics, logos, and software, are the exclusive property of ReflexFlow and are protected by copyright, trademark, and other intellectual property laws.
            </p>
            <p className="text-gray-600 leading-relaxed">
              You may not reproduce, distribute, modify, or create derivative works from any part of the Service without our explicit written permission.
            </p>
          </section>

          {/* Limitation of Liability */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Limitation of Liability</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              To the fullest extent permitted by law, ReflexFlow, its creators, officers, employees, and affiliates shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to:
            </p>
            <ul className="space-y-2 text-gray-600 ml-6 mb-4">
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Personal injury or health complications</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Loss of data or profits</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Service interruptions or errors</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Any other damages arising from your use of the App</span>
              </li>
            </ul>
            <p className="text-gray-600 leading-relaxed">
              Your use of ReflexFlow is at your sole risk. The Service is provided "as is" and "as available" without warranties of any kind, either express or implied.
            </p>
          </section>

          {/* Indemnification */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Indemnification</h2>
            <p className="text-gray-600 leading-relaxed">
              You agree to indemnify, defend, and hold harmless ReflexFlow and its affiliates from any claims, liabilities, damages, losses, or expenses arising from your use of the Service, your violation of these Terms, or your violation of any rights of another party.
            </p>
          </section>

          {/* Termination */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Termination</h2>
            <p className="text-gray-600 leading-relaxed">
              We reserve the right to terminate or suspend your access to the Service at any time, without notice, for conduct that we believe violates these Terms or is harmful to other users, us, or third parties, or for any other reason.
            </p>
          </section>

          {/* Changes to Terms */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Changes to Terms</h2>
            <p className="text-gray-600 leading-relaxed">
              We may modify these Terms at any time. We will notify you of any changes by updating the "Last updated" date at the top of this page. Your continued use of the Service after changes become effective constitutes your acceptance of the revised Terms.
            </p>
          </section>

          {/* Governing Law */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. Governing Law</h2>
            <p className="text-gray-600 leading-relaxed">
              These Terms shall be governed by and construed in accordance with the laws of the jurisdiction in which ReflexFlow operates, without regard to its conflict of law provisions.
            </p>
          </section>

          {/* Contact */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">11. Contact Us</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              If you have any questions about these Terms of Service, please contact us at:
            </p>
            <p className="text-gray-900 font-medium">
              joseph@cortexity.xyz
            </p>
          </section>

          {/* Acknowledgment */}
          <section className="mb-12 bg-gray-100 border border-gray-300 p-6 rounded-lg">
            <p className="text-gray-700 leading-relaxed">
              <strong>By using ReflexFlow, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service, including all disclaimers and limitations of liability.</strong>
            </p>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="px-6 py-12 bg-gray-50 border-t border-gray-200">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-gray-500 text-sm mb-3">© 2025 ReflexFlow. All rights reserved.</p>
          <div className="flex items-center justify-center gap-4 text-sm">
            <a href="/" onClick={handleBackClick} className="text-gray-600 hover:text-gray-900 transition-colors">
              Home
            </a>
            <span className="text-gray-400">•</span>
            <a href="/privacy" onClick={(e) => {
              e.preventDefault()
              window.history.pushState({}, '', '/privacy')
              window.dispatchEvent(new PopStateEvent('popstate'))
              window.scrollTo(0, 0)
            }} className="text-gray-600 hover:text-gray-900 transition-colors">
              Privacy Policy
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Terms
