import { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'
import Privacy from './Privacy'
import Terms from './Terms'

// Initialize Supabase client
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

function App() {
  const [currentPage, setCurrentPage] = useState('home')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null)
  const [country, setCountry] = useState('')

  // Handle routing
  useEffect(() => {
    const handleRouteChange = () => {
      const path = window.location.pathname
      if (path === '/privacy') {
        setCurrentPage('privacy')
      } else if (path === '/terms') {
        setCurrentPage('terms')
      } else {
        setCurrentPage('home')
      }
    }

    handleRouteChange()
    window.addEventListener('popstate', handleRouteChange)
    return () => window.removeEventListener('popstate', handleRouteChange)
  }, [])

  // Get country from URL parameters (from Facebook ads UTM)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    setCountry(params.get('country') || 'unknown')
  }, [])

  const handleDownloadClick = () => {
    setIsModalOpen(true)
  }

  const handleEmailSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus(null)

    try {
      const { error } = await supabase
        .from('waitlist')
        .insert([
          { 
            email: email,
            country: country,
            created_at: new Date().toISOString()
          }
        ])

      if (error) throw error

      setSubmitStatus('success')
      setEmail('')
      
      // Close modal after 2 seconds
      setTimeout(() => {
        setIsModalOpen(false)
        setSubmitStatus(null)
      }, 2000)
    } catch (error) {
      console.error('Error:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  // Show privacy page if route is /privacy
  if (currentPage === 'privacy') {
    return <Privacy />
  }

  // Show terms page if route is /terms
  if (currentPage === 'terms') {
    return <Terms />
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative px-6 pt-20 pb-32 md:pt-32 md:pb-48">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-semibold tracking-tight text-gray-900 mb-6">
            Confidence.
            <br />
            Redefined.
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-4 font-light">
            Transform your comfort in just 14 days.
          </p>
          <p className="text-lg md:text-xl text-gray-500 mb-12 font-light max-w-2xl mx-auto">
            A science-backed approach to reducing sensitivity and building lasting confidence.
          </p>
          
          <button 
            onClick={handleDownloadClick}
            className="inline-flex items-center px-8 py-4 bg-black text-white text-lg font-medium rounded-full hover:bg-gray-800 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            Download on the App Store
          </button>
        </div>
      </section>

      {/* Feature Grid */}
      <section className="px-6 py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 md:gap-12">
            
            {/* Feature 1: The Roadmap */}
            <div className="text-center md:text-left">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl mb-6 mx-auto md:mx-0 flex items-center justify-center">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                The Roadmap
              </h3>
              <p className="text-gray-600 leading-relaxed">
                A personalized 14-day progressive program designed by experts. Each day builds on the last, gradually expanding your comfort zone with precision and care.
              </p>
            </div>

            {/* Feature 2: The Haptic Trainer */}
            <div className="text-center md:text-left">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl mb-6 mx-auto md:mx-0 flex items-center justify-center">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                The Haptic Trainer
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Gentle vibration patterns guide your training sessions. Real-time feedback helps you understand your progress and stay motivated throughout your transformation.
              </p>
            </div>

            {/* Feature 3: The Science */}
            <div className="text-center md:text-left">
              <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-red-600 rounded-2xl mb-6 mx-auto md:mx-0 flex items-center justify-center">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                The Science
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Built on proven desensitization techniques used by medical professionals. Systematic exposure therapy combined with mindfulness creates lasting neurological adaptation.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Social Proof / Stats Section */}
      <section className="px-6 py-24">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-semibold text-gray-900 mb-16">
            Your journey starts here.
          </h2>
          <div className="grid md:grid-cols-3 gap-12">
            <div>
              <div className="text-5xl font-semibold text-gray-900 mb-2">14</div>
              <div className="text-gray-600">Days to transformation</div>
            </div>
            <div>
              <div className="text-5xl font-semibold text-gray-900 mb-2">5</div>
              <div className="text-gray-600">Minutes per day</div>
            </div>
            <div>
              <div className="text-5xl font-semibold text-gray-900 mb-2">Private</div>
              <div className="text-gray-600">Completely discreet</div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="px-6 py-24 bg-black text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-semibold mb-6">
            Ready to begin?
          </h2>
          <p className="text-xl text-gray-300 mb-12 font-light">
            Join thousands building confidence, one day at a time.
          </p>
          <button 
            onClick={handleDownloadClick}
            className="inline-flex items-center px-8 py-4 bg-white text-black text-lg font-medium rounded-full hover:bg-gray-100 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            Download on the App Store
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-12 bg-gray-50">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex items-center justify-center gap-4 text-sm mb-3">
            <a 
              href="/privacy" 
              onClick={(e) => {
                e.preventDefault()
                window.history.pushState({}, '', '/privacy')
                setCurrentPage('privacy')
                window.scrollTo(0, 0)
              }}
              className="text-gray-600 hover:text-gray-900 transition-colors underline"
            >
              Privacy Policy
            </a>
            <span className="text-gray-400">•</span>
            <a 
              href="/terms" 
              onClick={(e) => {
                e.preventDefault()
                window.history.pushState({}, '', '/terms')
                setCurrentPage('terms')
                window.scrollTo(0, 0)
              }}
              className="text-gray-600 hover:text-gray-900 transition-colors underline"
            >
              Terms of Service
            </a>
          </div>
          <p className="text-xs text-gray-500 mb-2">
            Medical Disclaimer: ReflexFlow is an educational habituation program and not a medical device. Use at your own risk.
          </p>
          <p className="text-gray-500 text-sm">© 2025 ReflexFlow. All rights reserved.</p>
        </div>
      </footer>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-6">
          <div className="bg-white rounded-3xl p-8 md:p-12 max-w-md w-full shadow-2xl relative">
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute top-6 right-6 text-gray-400 hover:text-gray-600"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mb-6 mx-auto flex items-center justify-center">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-3">
                Beta Access Full
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Join the waitlist for the next cohort. We'll notify you as soon as spots open up.
              </p>
            </div>

            {submitStatus === 'success' ? (
              <div className="text-center py-4">
                <div className="w-16 h-16 bg-green-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-gray-900 font-medium">You're on the list!</p>
              </div>
            ) : (
              <form onSubmit={handleEmailSubmit} className="space-y-4">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="w-full px-6 py-4 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-lg"
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-6 py-4 bg-black text-white font-medium rounded-full hover:bg-gray-800 transition-all duration-200 disabled:bg-gray-400 text-lg"
                >
                  {isSubmitting ? 'Joining...' : 'Join Waitlist'}
                </button>
                {submitStatus === 'error' && (
                  <p className="text-red-600 text-sm text-center">Something went wrong. Please try again.</p>
                )}
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default App
