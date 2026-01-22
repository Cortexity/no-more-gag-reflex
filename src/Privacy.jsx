function Privacy() {
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
            Privacy Policy
          </h1>
          <p className="text-gray-500 mb-12">Last updated: January 22, 2026</p>

          {/* Introduction */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Introduction</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Welcome to ReflexFlow ("we," "our," or "us"). This Privacy Policy explains how we collect, use, and protect your information when you join our waitlist.
            </p>
          </section>

          {/* Data Collection */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Data Collection</h2>
            <p className="text-gray-600 leading-relaxed">
              We collect your email address solely to provide updates regarding the ReflexFlow Beta Program.
            </p>
          </section>

          {/* Usage */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Usage</h2>
            <p className="text-gray-600 leading-relaxed">
              Your data is securely stored via Supabase and is never sold, rented, or shared with third parties for marketing purposes.
            </p>
          </section>

          {/* Tracking */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Tracking</h2>
            <p className="text-gray-600 leading-relaxed">
              We use the Facebook Pixel to measure the effectiveness of our advertisements. This data is anonymized and used for optimization purposes only.
            </p>
          </section>

          {/* Your Rights */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Your Rights</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              You may request the removal of your email from our waitlist at any time by contacting:
            </p>
            <p className="text-gray-900 font-medium">
              joseph@cortexity.xyz
            </p>
          </section>

          {/* Medical Disclaimer */}
          <section className="mb-12 bg-amber-50 border-l-4 border-amber-500 p-6 rounded-r-lg">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
              <svg className="w-6 h-6 mr-2 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              Important Medical Disclaimer
            </h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                <strong>ReflexFlow is not a medical device and does not provide medical advice, diagnosis, or treatment.</strong>
              </p>
              <p>
                The information provided through ReflexFlow is for general informational and educational purposes only. It is not intended as a substitute for professional medical advice, diagnosis, or treatment.
              </p>
              <p>
                <strong>No Medical Results Guaranteed:</strong> ReflexFlow makes no claims, representations, or guarantees about specific medical outcomes, health improvements, or results. Individual experiences may vary significantly.
              </p>
              <p>
                <strong>Consult a Healthcare Professional:</strong> Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition or health objectives. Never disregard professional medical advice or delay in seeking it because of something you have read or learned through ReflexFlow.
              </p>
              <p>
                If you think you may have a medical emergency, call your doctor or emergency services immediately.
              </p>
              <p className="font-semibold">
                By joining our waitlist and using ReflexFlow, you acknowledge and agree that you understand this disclaimer and that ReflexFlow is not liable for any health outcomes or medical issues.
              </p>
            </div>
          </section>

          {/* Contact Us */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Contact Us</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              If you have any questions about this Privacy Policy, please contact us at:
            </p>
            <p className="text-gray-900 font-medium">
              joseph@cortexity.xyz
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
            <a href="/terms" onClick={(e) => {
              e.preventDefault()
              window.history.pushState({}, '', '/terms')
              window.dispatchEvent(new PopStateEvent('popstate'))
              window.scrollTo(0, 0)
            }} className="text-gray-600 hover:text-gray-900 transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Privacy
