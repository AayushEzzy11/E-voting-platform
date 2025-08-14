'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <img
                src="logo1.jpg"
                alt="E-Vote Nepal Logo"
                className="w-12 h-12 rounded-full mr-3"
              />
              <span className="font-['Pacifico'] text-2xl text-blue-900">E-Vote Nepal</span>
            </div>
            
            {/* Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#how-it-works" className="text-gray-600 hover:text-blue-600 transition-colors cursor-pointer">How it Works</a>
              <a href="#security" className="text-gray-600 hover:text-blue-600 transition-colors cursor-pointer">Security</a>
              <a href="#features" className="text-gray-600 hover:text-blue-600 transition-colors cursor-pointer">Features</a>
              <Link href="/admin" className="text-gray-600 hover:text-blue-600 transition-colors cursor-pointer">Results</Link>
            </nav>
            
            {/* Language Selector & CTA */}
            <div className="flex items-center space-x-4">
              <select className="hidden sm:block px-3 py-1 rounded-lg border border-gray-300 text-sm bg-white pr-8">
                <option>English</option>
                <option>नेपाली</option>
              </select>
              <Link href="/form" className="hidden sm:block px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors whitespace-nowrap cursor-pointer">
                Start Voting
              </Link>
              
              {/* Mobile menu button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <i className={`ri-${mobileMenuOpen ? 'close' : 'menu'}-line text-xl text-gray-600`}></i>
              </button>
            </div>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-b border-gray-200">
            <div className="px-4 py-4 space-y-4">
              <a href="#how-it-works" onClick={() => setMobileMenuOpen(false)} className="block text-gray-600 hover:text-blue-600 transition-colors cursor-pointer">
                How it Works
              </a>
              <a href="#security" onClick={() => setMobileMenuOpen(false)} className="block text-gray-600 hover:text-blue-600 transition-colors cursor-pointer">
                Security
              </a>
              <a href="#features" onClick={() => setMobileMenuOpen(false)} className="block text-gray-600 hover:text-blue-600 transition-colors cursor-pointer">
                Features
              </a>
              <Link href="/admin" onClick={() => setMobileMenuOpen(false)} className="block text-gray-600 hover:text-blue-600 transition-colors cursor-pointer">
                Results
              </Link>
              
              <div className="pt-4 border-t border-gray-200">
                <select className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm bg-white mb-4">
                  <option>English</option>
                  <option>नेपाली</option>
                </select>
                <Link href="/form" onClick={() => setMobileMenuOpen(false)} className="block w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-center cursor-pointer">
                  Start Voting
                </Link>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-100/20 to-purple-100/20"></div>
        <div className="absolute top-10 left-10 w-72 h-72 bg-blue-200/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-72 h-72 bg-purple-200/30 rounded-full blur-3xl"></div>
        
        <div className="relative max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-left">
              <div className="inline-flex items-center px-4 py-2 bg-blue-50 border border-blue-200 rounded-full text-blue-700 text-sm font-medium mb-6">
                <i className="ri-rocket-line mr-2"></i>
                Next-Generation Democracy Platform
              </div>
              
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                Shaping Tomorrow's Democracy,
                <br />
                <span className="text-blue-600">Today</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                E-Vote Nepal pioneers the future of democratic participation through revolutionary end-to-end encryption voting, AI-powered verification. Experience democracy redefined for the digital age.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Link href="/form" className="px-8 py-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all duration-300 font-semibold text-lg whitespace-nowrap cursor-pointer shadow-lg hover:shadow-xl">
                  <i className="ri-vote-line mr-2"></i>
                  Start Voting
                </Link>
                <Link href="#how-it-works" className="px-8 py-4 border-2 border-gray-300 text-gray-700 rounded-xl hover:border-blue-600 hover:text-blue-600 transition-all duration-300 font-semibold text-lg whitespace-nowrap cursor-pointer">
                  <i className="ri-play-circle-line mr-2"></i>
                  Watch Demo
                </Link>
              </div>
              
              {/* Trust Indicators */}
              <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500">
                <div className="flex items-center">
                  <i className="ri-brain-line text-green-600 mr-2"></i>
                  AI-Powered Verification
                </div>
                <div className="flex items-center">
                  <i className="ri-links-line text-blue-600 mr-2"></i>
                  End-to-end encryption
                </div>
                
                <div className="flex items-center">
                  <i className="ri-earth-line text-orange-600 mr-2"></i>
                  Future-Ready Platform
                </div>
              </div>
            </div>
            
            <div className="relative">
              {/* Hero illustration */}
              <div className="relative bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl p-8 shadow-2xl">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3 bg-white/20 rounded-lg p-3">
                      <i className="ri-shield-user-line text-2xl text-white"></i>
                      <div className="text-white">
                        <p className="font-semibold">Secure Identity Verification</p>
                        <p className="text-sm opacity-80">Biometric & ID Authentication</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3 bg-white/20 rounded-lg p-3">
                      <i className="ri-checkbox-circle-line text-2xl text-white"></i>
                      <div className="text-white">
                        <p className="font-semibold">Easy Vote Casting</p>
                        <p className="text-sm opacity-80">Intuitive Selection Interface</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3 bg-white/20 rounded-lg p-3">
                      <i className="ri-links-line text-2xl text-white"></i>
                      <div className="text-white">
                        <p className="font-semibold">End-to-End Encryption</p>
                        <p className="text-sm opacity-80">Secure & Private</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Floating elements */}
                <div className="absolute -top-4 -right-4 w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg animate-bounce">
                  <i className="ri-award-line text-2xl text-yellow-900"></i>
                </div>
                <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-green-400 rounded-full flex items-center justify-center shadow-lg animate-pulse">
                  <i className="ri-check-line text-xl text-green-900"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">How E-Vote Nepal Works</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our secure, step-by-step process ensures your vote is authenticated, private, and permanently recorded with advanced encryption and blockchain technology.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-8 rounded-2xl bg-blue-50 hover:bg-blue-100 transition-colors">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <i className="ri-shield-user-line text-2xl text-white"></i>
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Verify Identity</h3>
              <p className="text-gray-600 leading-relaxed">
                Secure authentication using government-issued ID and biometric verification to ensure voter eligibility and prevent fraud.
              </p>
            </div>
            
            <div className="text-center p-8 rounded-2xl bg-green-50 hover:bg-green-100 transition-colors">
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <i className="ri-checkbox-line text-2xl text-white"></i>
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Cast Your Vote</h3>
              <p className="text-gray-600 leading-relaxed">
                Review candidates and their policies, make your selection, and confirm your choice with our intuitive and secure voting interface.
              </p>
            </div>
            
            <div className="text-center p-8 rounded-2xl bg-purple-50 hover:bg-purple-100 transition-colors">
              <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <i className="ri-links-line text-2xl text-white"></i>
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Secure & Verify</h3>
              <p className="text-gray-600 leading-relaxed">
                Your vote is encrypted and permanently secured with blockchain technology and cryptographic verification for complete transparency and auditability.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">The Future of Democratic Participation</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Pioneering the next generation of digital democracy, E-Vote Nepal leverages emerging technologies to create an inclusive, accessible, and revolutionary voting experience for citizens worldwide.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                <i className="ri-vr-box-line text-2xl text-blue-600"></i>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Multi-Reality Experience</h3>
              <p className="text-gray-600">Vote through AR/VR interfaces, voice commands, neural links, or traditional devices - the future of accessibility.</p>
            </div>
            
            <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-6">
                <i className="ri-speak-line text-2xl text-green-600"></i>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Universal Communication</h3>
              <p className="text-gray-600">Real-time AI translation, voice synthesis, and neural interpretation supporting all global languages and communication methods.</p>
            </div>
            
            <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-6">
                <i className="ri-space-ship-line text-2xl text-purple-600"></i>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Temporal Democracy</h3>
              <p className="text-gray-600">Vote across time zones, space stations, and future colonies with quantum-synchronized election periods.</p>
            </div>
            
            <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-6">
                <i className="ri-computer-line text-2xl text-red-600"></i>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Predictive Democracy</h3>
              <p className="text-gray-600">AI-powered result prediction, quantum computing analysis, and holographic result visualization in real-time.</p>
            </div>
            
            <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-6">
                <i className="ri-robot-line text-2xl text-orange-600"></i>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">AI Democracy Assistant</h3>
              <p className="text-gray-600">24/7 AI companions provide personalized guidance, candidate matching, and democratic education through natural conversation.</p>
            </div>
            
            <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-6">
                <i className="ri-mind-map text-2xl text-indigo-600"></i>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Consciousness Privacy</h3>
              <p className="text-gray-600">Advanced neural encryption protects not just your vote, but your democratic thoughts and political consciousness from any intrusion.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Security Features */}
      <section id="security" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center px-4 py-2 bg-green-50 border border-green-200 rounded-full text-green-700 text-sm font-medium mb-6">
                <i className="ri-shield-check-line mr-2"></i>
                Bank-Level Security
              </div>
              
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Built for Security & Accessibility
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                E-Vote Nepal meets the highest standards of election security while remaining accessible to all citizens, regardless of their technical expertise or disabilities.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                    <i className="ri-shield-check-line text-white text-sm"></i>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">End-to-End Encryption</h3>
                    <p className="text-gray-600">All data is encrypted using military-grade 256-bit encryption protocols from your device to our secure servers.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                    <i className="ri-eye-line text-white text-sm"></i>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">WCAG 2.1 AA Compliant</h3>
                    <p className="text-gray-600">Full accessibility support including screen readers, keyboard navigation, and high contrast modes.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                    <i className="ri-fingerprint-line text-white text-sm"></i>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Biometric Verification</h3>
                    <p className="text-gray-600">Advanced facial recognition and ID verification ensure only eligible voters can participate.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-orange-600 rounded-full flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                    <i className="ri-links-line text-white text-sm"></i>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Cryptographic Transparency</h3>
                    <p className="text-gray-600">Every vote is recorded with immutable cryptographic signatures, ensuring complete transparency and auditability.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl p-8">
                <div className="grid grid-cols-2 gap-6">
                  <div className="bg-white p-6 rounded-2xl shadow-sm">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                      <i className="ri-shield-check-line text-2xl text-blue-600"></i>
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-2">SSL/TLS</h4>
                    <p className="text-sm text-gray-600">Encrypted connections</p>
                  </div>
                  
                  <div className="bg-white p-6 rounded-2xl shadow-sm">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                      <i className="ri-fingerprint-line text-2xl text-green-600"></i>
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-2">Biometric</h4>
                    <p className="text-sm text-gray-600">Face verification</p>
                  </div>
                  
                  <div className="bg-white p-6 rounded-2xl shadow-sm">
                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                      <i className="ri-links-line text-2xl text-purple-600"></i>
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-2">Cryptographic</h4>
                    <p className="text-sm text-gray-600">Immutable records</p>
                  </div>
                  
                  <div className="bg-white p-6 rounded-2xl shadow-sm">
                    <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                      <i className="ri-eye-off-line text-2xl text-orange-600"></i>
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-2">Anonymous</h4>
                    <p className="text-sm text-gray-600">Private voting</p>
                  </div>
                </div>
              </div>
              
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
            Join thousands of citizens who have already voted securely from abroad using E-Vote Nepal.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/form" className="px-8 py-4 bg-white text-blue-600 rounded-xl hover:bg-gray-50 transition-colors font-semibold text-lg whitespace-nowrap cursor-pointer">
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
                <span className="font-['Pacifico'] text-2xl text-white">E-Vote Nepal</span>
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
              © 2024 E-Vote Nepal. All rights reserved. Powered by end-to-end encryption technology.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}