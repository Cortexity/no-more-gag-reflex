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
    // Track InitiateCheckout event when user clicks Download button
    if (window.fbq) {
      window.fbq('track', 'InitiateCheckout', {
        content_name: 'ReflexFlow Waitlist',
        content_category: 'App Download',
        value: 0,
        currency: 'USD'
      });
    }
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

      // Track Lead event on successful email submission
      if (window.fbq) {
        window.fbq('track', 'Lead', {
          content_name: 'ReflexFlow Waitlist',
          content_category: 'Email Signup',
          value: 0,
          currency: 'USD',
          country: country
        });
      }

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
            Stop Gagging in 21 Days
          </p>
          <p className="text-xl md:text-2xl text-purple-300 mb-12 font-light">
            Go deeper with total oral confidence
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

      {/* How It Works Section */}
      <section className="relative px-6 py-24">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-white mb-4">
            How It Works
          </h2>
          <p className="text-center text-purple-200 text-lg mb-16 max-w-3xl mx-auto">
            Master your gag reflex with proven desensitization techniques
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            
            {/* Phase 1: Days 1-7 */}
            <div className="glass-dark rounded-3xl p-8 border-2 border-purple-500/30 hover:border-purple-500/50 transition-all duration-300">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-neon-purple-500 to-neon-pink-500 flex items-center justify-center mb-6 mx-auto neon-glow-purple">
                <span className="text-white font-bold text-2xl">1-7</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4 text-center">
                Foundation Phase
              </h3>
              <ul className="text-purple-200 leading-relaxed space-y-3">
                <li className="flex items-start gap-2">
                  <span className="text-purple-400 mt-1">•</span>
                  <span>Learn to control your gag reflex through gentle awareness exercises</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-400 mt-1">•</span>
                  <span>Identify your triggers and build baseline comfort</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-400 mt-1">•</span>
                  <span>Use structured breathing and relaxation techniques</span>
                </li>
              </ul>
            </div>

            {/* Phase 2: Days 8-14 */}
            <div className="glass-dark rounded-3xl p-8 border-2 border-purple-500/30 hover:border-purple-500/50 transition-all duration-300">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-neon-pink-500 to-neon-purple-500 flex items-center justify-center mb-6 mx-auto neon-glow-pink">
                <span className="text-white font-bold text-2xl">8-14</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4 text-center">
                Desensitization Phase
              </h3>
              <ul className="text-purple-200 leading-relaxed space-y-3">
                <li className="flex items-start gap-2">
                  <span className="text-pink-400 mt-1">•</span>
                  <span>Gradually reduce your gag reflex sensitivity</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-pink-400 mt-1">•</span>
                  <span>Build comfort going deeper with guided techniques</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-pink-400 mt-1">•</span>
                  <span>Get haptic feedback that retrains your natural response</span>
                </li>
              </ul>
            </div>

            {/* Phase 3: Days 15-21 */}
            <div className="glass-dark rounded-3xl p-8 border-2 border-neon-green-500/30 hover:border-neon-green-500/50 transition-all duration-300 neon-glow-green">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-neon-green-500 to-neon-purple-500 flex items-center justify-center mb-6 mx-auto neon-glow-green">
                <span className="text-white font-bold text-2xl">15-21</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4 text-center">
                Mastery Phase
              </h3>
              <ul className="text-purple-200 leading-relaxed space-y-3">
                <li className="flex items-start gap-2">
                  <span className="text-neon-green-400 mt-1">•</span>
                  <span>Achieve total oral confidence with advanced exercises</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-neon-green-400 mt-1">•</span>
                  <span>Master your gag reflex completely</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-neon-green-400 mt-1">•</span>
                  <span>Go as deep as you want without hesitation or discomfort</span>
                </li>
              </ul>
            </div>

          </div>
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
                  <span className="text-red-400 text-xl flex-shrink-0">×</span>
                  <p className="text-purple-200 leading-relaxed">Instant gagging, can't go deep</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-red-400 text-xl flex-shrink-0">×</span>
                  <p className="text-purple-200 leading-relaxed">Anxiety and self-consciousness</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-red-400 text-xl flex-shrink-0">×</span>
                  <p className="text-purple-200 leading-relaxed">Throat tension and discomfort</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-red-400 text-xl flex-shrink-0">×</span>
                  <p className="text-purple-200 leading-relaxed">Limited intimate confidence</p>
                </div>
              </div>
            </div>

            {/* After Card */}
            <div className="glass-dark rounded-3xl p-8 border-2 border-neon-green-500/30 hover:border-neon-green-500/50 transition-all duration-300 neon-glow-green">
              <h3 className="text-2xl font-bold text-neon-green-400 mb-6 text-center">
                21 Days with ReflexFlow
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <span className="text-neon-green-400 text-xl flex-shrink-0">✓</span>
                  <p className="text-white leading-relaxed font-medium">No more gagging - total control</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-neon-green-400 text-xl flex-shrink-0">✓</span>
                  <p className="text-white leading-relaxed font-medium">Go deeper without discomfort</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-neon-green-400 text-xl flex-shrink-0">✓</span>
                  <p className="text-white leading-relaxed font-medium">Relaxed throat, no tension</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-neon-green-400 text-xl flex-shrink-0">✓</span>
                  <p className="text-white leading-relaxed font-medium">Total oral confidence</p>
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
              <div className="w-16 h-16 rounded-2xl mb-6 flex items-center justify-center neon-glow-purple mx-auto" style={{
                background: 'linear-gradient(135deg, #00d4ff 0%, #a855f7 100%)'
              }}>
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4 text-center">
                The Roadmap
              </h3>
              <ul className="text-purple-200 leading-relaxed space-y-3">
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400 mt-1">•</span>
                  <span>Complete 21-day program to eliminate gagging</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400 mt-1">•</span>
                  <span>Daily exercises that build progressively</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400 mt-1">•</span>
                  <span>Gain comfort and confidence for deeper oral intimacy</span>
                </li>
              </ul>
            </div>

            {/* Feature 2: The Haptic Trainer */}
            <div className="glass-dark rounded-3xl p-8 hover:scale-105 transition-transform duration-300">
                <div className="w-16 h-16 rounded-2xl mb-6 flex items-center justify-center neon-glow-pink mx-auto" style={{
                  background: 'linear-gradient(135deg, #ff1493 0%, #a855f7 100%)'
              }}>
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4 text-center">
                The Haptic Trainer
              </h3>
              <ul className="text-purple-200 leading-relaxed space-y-3">
                <li className="flex items-start gap-2">
                  <span className="text-pink-400 mt-1">•</span>
                  <span>Phone vibration guides your training sessions</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-pink-400 mt-1">•</span>
                  <span>Get real-time feedback as you practice</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-pink-400 mt-1">•</span>
                  <span>Track your progress toward eliminating your gag reflex</span>
                </li>
              </ul>
            </div>

            {/* Feature 3: The Science */}
            <div className="glass-dark rounded-3xl p-8 hover:scale-105 transition-transform duration-300">
              <div className="w-16 h-16 rounded-2xl mb-6 flex items-center justify-center neon-glow-green mx-auto" style={{
                background: 'linear-gradient(135deg, #39ff14 0%, #00d4ff 100%)'
              }}>
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4 text-center">
                The Science
              </h3>
              <ul className="text-purple-200 leading-relaxed space-y-3">
                <li className="flex items-start gap-2">
                  <span className="text-neon-green-400 mt-1">•</span>
                  <span>Science-backed desensitization methods that work</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-neon-green-400 mt-1">•</span>
                  <span>Combines gradual exposure therapy with breathing techniques</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-neon-green-400 mt-1">•</span>
                  <span>Retrain your gag reflex permanently</span>
                </li>
              </ul>
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
              <div className="text-purple-200">Discreet</div>
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
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              Total Oral Confidence
            </h2>
            <p className="text-xl text-purple-200 mb-12 font-light">
              Eliminate your gag reflex for deeper intimacy
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
          <p className="text-purple-300 text-sm mb-3">Â© 2026 ReflexFlow. All rights reserved.</p>
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
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
                Join the Waitlist
              </h3>
              <p className="text-purple-200 leading-relaxed">
            Be first to get ReflexFlow and start your journey to deeper oral confidence in 21 days.
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
