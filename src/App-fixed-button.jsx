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
    <div className="min-h-screen relative overflow-hidden" style={{
      background: 'radial-gradient(circle at center, #794C9A 0%, #4a2c5e 70%, #1a0b2e 100%)'
    }}>
      {/* Animated background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-neon-purple-500 rounded-full mix-blend-screen filter blur-3xl opacity-10 animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-neon-pink-500 rounded-full mix-blend-screen filter blur-3xl opacity-10 animate-pulse" style={{animationDelay: '1s'}}></div>
      </div>

      {/* Hero Section */}
      <section className="relative px-6 pt-20 pb-4 md:pt-32 md:pb-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-6xl md:text-8xl font-bold tracking-tight mb-6" style={{
            fontFamily: "'Allura', cursive",
            color: '#EFEAF1',
            textShadow: '0 0 15px rgba(239, 234, 241, 0.5)'
          }}>
            ReflexFlow
          </h1>
          <p className="text-3xl md:text-5xl font-bold text-white mb-4">
            Complete Habituation in 21 Days
          </p>
          <p className="text-xl md:text-2xl text-purple-300 mb-12 font-light">
            Master Sensitivity & Control
          </p>
          
          <button 
            onClick={handleDownloadClick}
            className="inline-flex items-center px-10 py-5 text-white text-lg font-bold rounded-full hover:scale-105 transition-all duration-300 animate-breathe"
            style={{
              background: 'linear-gradient(90deg, #a855f7 0%, #ff1493 100%)',
            }}
          >
            <svg className="w-6 h-6 mr-3" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
            </svg>
            Download on the App Store
          </button>
        </div>
      </section>

      {/* Visual Comparison Section */}
      <section className="relative px-6 py-8">
        <div className="max-w-5xl mx-auto">
          {/* Hero Asset - Brain Before/After */}
          <div className="text-center mb-12">
            <div className="inline-block" style={{
              filter: 'drop-shadow(0 0 30px rgba(168, 85, 247, 0.6)) drop-shadow(0 0 60px rgba(168, 85, 247, 0.3))'
            }}>
              <img 
                src="/brain_before_after.png" 
                alt="Brain Neural Adaptation - Before and After" 
                className="w-full max-w-3xl mx-auto rounded-2xl"
                onError={(e) => {
                  console.error('Image failed to load');
                  e.target.style.display = 'none';
                }}
              />
            </div>
          </div>

          {/* Before vs After Comparison Cards */}
          <div className="grid md:grid-cols-2 gap-8 relative">
            {/* Vertical Divider (Desktop Only) */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-purple-500/30 to-transparent"></div>

            {/* Before Card */}
            <div className="glass-dark rounded-3xl p-8 border-2 border-red-500/20 hover:border-red-500/40 transition-all duration-300">
              <h3 className="text-2xl font-bold text-red-400 mb-6 text-center">
                Before ReflexFlow
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <span className="text-red-400 text-xl flex-shrink-0">❌</span>
                  <p className="text-purple-200 leading-relaxed">High Sensitivity & Triggering</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-red-400 text-xl flex-shrink-0">❌</span>
                  <p className="text-purple-200 leading-relaxed">Performance Anxiety</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-red-400 text-xl flex-shrink-0">❌</span>
                  <p className="text-purple-200 leading-relaxed">Physical Tension & Gulping</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-red-400 text-xl flex-shrink-0">❌</span>
                  <p className="text-purple-200 leading-relaxed">Lack of Oral Confidence</p>
                </div>
              </div>
            </div>

            {/* After Card */}
            <div className="glass-dark rounded-3xl p-8 border-2 border-neon-green-500/30 hover:border-neon-green-500/50 transition-all duration-300 neon-glow-green">
              <h3 className="text-2xl font-bold text-neon-green-400 mb-6 text-center">
                After 21 Days
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <span className="text-neon-green-400 text-xl flex-shrink-0">✅</span>
                  <p className="text-white leading-relaxed font-medium">Controlled Sensory Threshold</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-neon-green-400 text-xl flex-shrink-0">✅</span>
                  <p className="text-white leading-relaxed font-medium">Calm Nasal Breathing</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-neon-green-400 text-xl flex-shrink-0">✅</span>
                  <p className="text-white leading-relaxed font-medium">Relaxed & Open Palate</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-neon-green-400 text-xl flex-shrink-0">✅</span>
                  <p className="text-white leading-relaxed font-medium">Total Intimacy Confidence</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Grid with Glassmorphism */}
      <section className="relative px-6 py-24">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            
            {/* Feature 1: The Roadmap */}
            <div className="glass-dark rounded-3xl p-8 hover:scale-105 transition-transform duration-300">
              <div className="w-16 h-16 rounded-2xl mb-6 flex items-center justify-center neon-glow-purple" style={{
                background: 'linear-gradient(135deg, #00d4ff 0%, #a855f7 100%)'
              }}>
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">
                The Roadmap
              </h3>
              <p className="text-purple-200 leading-relaxed">
                A personalized 21-day progressive program. Each day builds on the last, gradually expanding your comfort zone with precision and care.
              </p>
            </div>

            {/* Feature 2: The Haptic Trainer */}
            <div className="glass-dark rounded-3xl p-8 hover:scale-105 transition-transform duration-300">
              <div className="w-16 h-16 rounded-2xl mb-6 flex items-center justify-center neon-glow-pink" style={{
                background: 'linear-gradient(135deg, #ff1493 0%, #a855f7 100%)'
              }}>
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">
                The Haptic Trainer
              </h3>
              <p className="text-purple-200 leading-relaxed">
                Gentle vibration patterns guide your sessions. Real-time feedback helps you understand progress and stay motivated.
              </p>
            </div>

            {/* Feature 3: The Science */}
            <div className="glass-dark rounded-3xl p-8 hover:scale-105 transition-transform duration-300">
              <div className="w-16 h-16 rounded-2xl mb-6 flex items-center justify-center neon-glow-green" style={{
                background: 'linear-gradient(135deg, #39ff14 0%, #00d4ff 100%)'
              }}>
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">
                The Science
              </h3>
              <p className="text-purple-200 leading-relaxed">
                Built on proven desensitization techniques. Systematic exposure therapy combined with mindfulness creates lasting adaptation.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative px-6 py-2">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-white mb-16">
            Your journey starts here.
          </h2>
          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="text-6xl font-bold mb-2" style={{color: '#00d4ff', textShadow: '0 0 20px rgba(0, 212, 255, 0.6)'}}>21</div>
              <div className="text-purple-200">Days to mastery</div>
            </div>
            <div className="text-center">
              <div className="text-6xl font-bold mb-2" style={{color: '#ff1493', textShadow: '0 0 20px rgba(255, 20, 147, 0.6)'}}>5</div>
              <div className="text-purple-200">Minutes per day</div>
            </div>
            <div className="text-center">
              <div className="text-6xl font-bold mb-2" style={{color: '#39ff14', textShadow: '0 0 20px rgba(57, 255, 20, 0.6)'}}>100%</div>
              <div className="text-purple-200">Completely discreet</div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA with Neon Glow */}
      <section className="relative px-6 py-24">
        <div className="max-w-4xl mx-auto">
          {/* Lips Image */}
          {/* COMMENTED OUT - Lips Image
          <div className="text-center mb-20">
            <div className="inline-block" style={{
              filter: 'drop-shadow(0 0 30px rgba(168, 85, 247, 0.6)) drop-shadow(0 0 60px rgba(168, 85, 247, 0.3))'
            }}>
              <img 
                src="/lips_with_saliva_in_middle.png" 
                alt="Oral Confidence Transformation" 
                className="w-full max-w-md mx-auto rounded-2xl"
                onError={(e) => {
                  console.error('Image failed to load');
                  e.target.style.display = 'none';
                }}
              />
            </div>
          </div>
          */}

          {/* CTA Content */}
          <div className="text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              Unlock Your Full Potential
            </h2>
            <p className="text-xl text-purple-200 mb-12 font-light">
              Science-backed conditioning for intimate moments
            </p>
            <button 
              onClick={handleDownloadClick}
              className="inline-flex items-center px-10 py-5 text-white text-lg font-bold rounded-full hover:scale-105 transition-all duration-300 neon-glow-green"
              style={{
                background: 'linear-gradient(90deg, #39ff14 0%, #00d4ff 100%)'
              }}
            >
              <svg className="w-6 h-6 mr-3" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
              </svg>
              Download on the App Store
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative px-6 py-12 border-t border-purple-700/30">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-purple-300 text-sm mb-3">© 2026 ReflexFlow. All rights reserved.</p>
          <div className="flex items-center justify-center gap-4 text-sm mb-2">
            <a 
              href="/privacy" 
              onClick={(e) => {
                e.preventDefault()
                window.history.pushState({}, '', '/privacy')
                setCurrentPage('privacy')
                window.scrollTo(0, 0)
              }}
              className="text-purple-400 hover:text-purple-300 transition-colors underline"
            >
              Privacy Policy
            </a>
            <span className="text-purple-500">•</span>
            <a 
              href="/terms" 
              onClick={(e) => {
                e.preventDefault()
                window.history.pushState({}, '', '/terms')
                setCurrentPage('terms')
                window.scrollTo(0, 0)
              }}
              className="text-purple-400 hover:text-purple-300 transition-colors underline"
            >
              Terms of Service
            </a>
          </div>
          <p className="text-xs text-purple-400">
            Medical Disclaimer: ReflexFlow is an educational habituation program and not a medical device. Use at your own risk.
          </p>
        </div>
      </footer>

      {/* Modal with Glassmorphism */}
      {isModalOpen && (
        <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50 px-6" style={{
          background: 'rgba(5, 5, 5, 0.85)'
        }}>
          <div className="glass-dark rounded-3xl p-8 md:p-12 max-w-md w-full shadow-glass relative border-2 border-purple-500/30">
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute top-6 right-6 text-purple-300 hover:text-white transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="text-center mb-8">
              <div className="w-16 h-16 rounded-full mb-6 mx-auto flex items-center justify-center neon-glow-purple" style={{
                background: 'linear-gradient(135deg, #a855f7 0%, #ff1493 100%)'
              }}>
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
                Beta Access Full
              </h3>
              <p className="text-purple-200 leading-relaxed">
                Join the waitlist for the next cohort. We'll notify you as soon as spots open up.
              </p>
            </div>

            {submitStatus === 'success' ? (
              <div className="text-center py-4">
                <div className="w-16 h-16 bg-neon-green-500 rounded-full mx-auto mb-4 flex items-center justify-center neon-glow-green">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-white font-medium text-lg">You're on the list!</p>
              </div>
            ) : (
              <form onSubmit={handleEmailSubmit} className="space-y-4">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="w-full px-6 py-4 bg-white/5 border-2 border-purple-500/30 rounded-full focus:outline-none focus:border-purple-500 text-white placeholder-purple-300 text-lg backdrop-blur-sm"
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-6 py-4 text-white font-bold rounded-full hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed text-lg neon-glow-pink"
                  style={{
                    background: 'linear-gradient(90deg, #00d4ff 0%, #a855f7 50%, #ff1493 100%)'
                  }}
                >
                  {isSubmitting ? 'Joining...' : 'Join Waitlist'}
                </button>
                {submitStatus === 'error' && (
                  <p className="text-red-400 text-sm text-center">Something went wrong. Please try again.</p>
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
