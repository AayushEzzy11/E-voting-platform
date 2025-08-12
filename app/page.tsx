'use client';

import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center mr-3">
                <i className="ri-vote-line text-white"></i>
              </div>
              <span className="font-['Pacifico'] text-2xl text-blue-900">VoteBridge</span>
            </div>
            
            {/* Language Selector */}
            <div className="flex items-center space-x-4">
              <select className="px-3 py-1 rounded-lg border border-gray-300 text-sm bg-white pr-8">
                <option>English</option>
                <option>Español</option>
                <option>Français</option>
                <option>中文</option>
              </select>
              <Link href="/auth" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors whitespace-nowrap cursor-pointer">
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
          style={{
            backgroundImage: "url('https://readdy.ai/api/search-image?query=Modern%20digital%20voting%20concept%20with%20global%20connectivity%2C%20citizens%20from%20different%20countries%20participating%20in%20democratic%20process%2C%20clean%20minimalist%20background%20with%20subtle%20blockchain%20network%20patterns%2C%20professional%20government-style%20blue%20and%20white%20color%20scheme%2C%20high-tech%20security%20elements%2C%20globe%20with%20voting%20symbols%2C%20futuristic%20democratic%20participation%20illustration&width=1920&height=1080&seq=hero-bg&orientation=landscape')"
          }}
        ></div>
        
        <div className="relative max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-left">
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Secure Online Voting for 
                <span className="text-blue-600"> Citizens Abroad</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Vote from anywhere with trust, privacy, and ease. Our blockchain-powered platform ensures your voice is heard, no matter where you are in the world.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Link href="/auth" className="px-8 py-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-semibold text-lg whitespace-nowrap cursor-pointer">
                  Get Started
                </Link>
                <Link href="#how-it-works" className="px-8 py-4 border-2 border-gray-300 text-gray-700 rounded-xl hover:border-blue-600 hover:text-blue-600 transition-colors font-semibold text-lg whitespace-nowrap cursor-pointer">
                  Learn More
                </Link>
              </div>
              
              {/* Trust Indicators */}
              <div className="flex items-center space-x-6 text-sm text-gray-500">
                <div className="flex items-center">
                  <i className="ri-shield-check-line text-green-600 mr-2"></i>
                  256-bit Encryption
                </div>
                <div className="flex items-center">
                  <i className="ri-links-line text-blue-600 mr-2"></i>
                  Blockchain Verified
                </div>
                <div className="flex items-center">
                  <i className="ri-global-line text-purple-600 mr-2"></i>
                  Global Access
                </div>
              </div>
            </div>
            
            <div className="relative">
              <img 
                src="https://readdy.ai/api/search-image?query=Professional%20illustration%20showing%20diverse%20international%20voters%20participating%20in%20secure%20digital%20election%2C%20people%20from%20different%20countries%20using%20smartphones%20and%20laptops%20to%20vote%2C%20clean%20modern%20interface%20design%2C%20government-approved%20security%20badges%2C%20blockchain%20network%20visualization%2C%20trust%20and%20democracy%20symbols%2C%20blue%20and%20white%20professional%20color%20scheme&width=600&height=600&seq=hero-main&orientation=squarish"
                alt="Global voting illustration"
                className="w-full h-auto rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">How VoteBridge Works</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our secure, step-by-step process ensures your vote is authenticated, private, and permanently recorded on the blockchain.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-8 rounded-2xl bg-blue-50 hover:bg-blue-100 transition-colors">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <i className="ri-shield-user-line text-2xl text-white"></i>
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Verify Identity</h3>
              <p className="text-gray-600 leading-relaxed">
                Secure authentication using government-issued ID and biometric verification to ensure voter eligibility.
              </p>
            </div>
            
            <div className="text-center p-8 rounded-2xl bg-green-50 hover:bg-green-100 transition-colors">
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <i className="ri-checkbox-line text-2xl text-white"></i>
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Cast Your Vote</h3>
              <p className="text-gray-600 leading-relaxed">
                Review candidates, make your selection, and confirm your choice with our intuitive voting interface.
              </p>
            </div>
            
            <div className="text-center p-8 rounded-2xl bg-purple-50 hover:bg-purple-100 transition-colors">
              <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <i className="ri-links-line text-2xl text-white"></i>
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Blockchain Security</h3>
              <p className="text-gray-600 leading-relaxed">
                Your vote is permanently recorded on the blockchain with a unique transaction hash for verification.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Security Features */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Built for Security & Accessibility
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                VoteBridge meets the highest standards of election security while remaining accessible to all citizens, regardless of their technical expertise or disabilities.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center mr-4 mt-1">
                    <i className="ri-shield-check-line text-white text-sm"></i>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">End-to-End Encryption</h3>
                    <p className="text-gray-600">All data is encrypted using military-grade 256-bit encryption protocols.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center mr-4 mt-1">
                    <i className="ri-eye-line text-white text-sm"></i>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">WCAG 2.1 AA Compliant</h3>
                    <p className="text-gray-600">Full accessibility support including screen readers and keyboard navigation.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center mr-4 mt-1">
                    <i className="ri-smartphone-line text-white text-sm"></i>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Mobile-First Design</h3>
                    <p className="text-gray-600">Optimized for all devices with responsive design and high contrast modes.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <img 
                src="https://readdy.ai/api/search-image?query=Digital%20security%20visualization%20showing%20encrypted%20voting%20data%2C%20blockchain%20network%20connections%2C%20cybersecurity%20shields%20protecting%20voter%20information%2C%20clean%20professional%20interface%20with%20security%20locks%20and%20verification%20checkmarks%2C%20government-grade%20security%20standards%20illustration%2C%20blue%20and%20green%20color%20scheme&width=600&height=600&seq=security-features&orientation=squarish"
                alt="Security features illustration"
                className="w-full h-auto rounded-2xl shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Make Your Voice Heard?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of citizens who have already voted securely from abroad using VoteBridge.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth" className="px-8 py-4 bg-white text-blue-600 rounded-xl hover:bg-gray-50 transition-colors font-semibold text-lg whitespace-nowrap cursor-pointer">
              Start Voting Now
            </Link>
            <Link href="/admin" className="px-8 py-4 border-2 border-white text-white rounded-xl hover:bg-white hover:text-blue-600 transition-colors font-semibold text-lg whitespace-nowrap cursor-pointer">
              Admin Dashboard
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center mr-3">
                  <i className="ri-vote-line text-white"></i>
                </div>
                <span className="font-['Pacifico'] text-2xl text-white">VoteBridge</span>
              </div>
              <p className="text-gray-400">
                Secure, accessible online voting for citizens living abroad.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-white mb-4">Platform</h3>
              <div className="space-y-2">
                <div><a href="#" className="hover:text-white transition-colors cursor-pointer">How it Works</a></div>
                <div><a href="#" className="hover:text-white transition-colors cursor-pointer">Security</a></div>
                <div><a href="#" className="hover:text-white transition-colors cursor-pointer">Accessibility</a></div>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold text-white mb-4">Support</h3>
              <div className="space-y-2">
                <div><a href="#" className="hover:text-white transition-colors cursor-pointer">Help Center</a></div>
                <div><a href="#" className="hover:text-white transition-colors cursor-pointer">Contact Us</a></div>
                <div><a href="#" className="hover:text-white transition-colors cursor-pointer">Technical Support</a></div>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold text-white mb-4">Legal</h3>
              <div className="space-y-2">
                <div><a href="#" className="hover:text-white transition-colors cursor-pointer">Privacy Policy</a></div>
                <div><a href="#" className="hover:text-white transition-colors cursor-pointer">Terms of Service</a></div>
                <div><a href="#" className="hover:text-white transition-colors cursor-pointer">Election Laws</a></div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 text-center">
            <p className="text-gray-400">
              © 2024 VoteBridge. All rights reserved. Powered by blockchain technology.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}