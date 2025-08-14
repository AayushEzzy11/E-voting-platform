'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

interface Candidate {
  id: string;
  name: string;
  party: string;
  image: string;
  manifesto: string;
}

export default function ConfirmPage() {
  const [isVoting, setIsVoting] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);
  const searchParams = useSearchParams();
  
  // Same candidate data as ballot page
  const candidates: Candidate[] = [
    {
      id: '1',
      name: 'Sher Bahadur Deuba',
      party: 'Nepali Congress',
      image: '/tree.png',
      manifesto:
        'Leading Nepal toward economic prosperity by safeguarding the constitution, generating mass employment, expanding infrastructure and social services, and promoting inclusive, sustainable development for all.',
    },
    {
      id: '2',
      name: 'Rajendra Prasad Lingden',
      party: 'Rastriya Prajantantra Party',
      image: '/halo.png',
      manifesto:
        'Calls for restoration of constitutional monarchy with ceremonial king, directly elected prime minister, Hindu-state identity with full religious freedom, a streamlined two-tier federal structure (abolishing provinces), and stronger local governance.',
    },
    {
      id: '3',
      name: 'Rabi Lamichhane',
      party: 'Rastriya Swatantra Party',
      image: '/ghanti.png',
      manifesto:
        'Advocates for economic freedom under capitalism, direct election of executive prime minister and chief ministers, enhanced social welfare (single-payer healthcare, food banks, anti-corruption measures), and decentralized but efficient governance.',
    },
    {
      id: '4',
      name: 'Khadga Prasad Sharma Oli',
      party: 'Nepal Communist Party (UML)',
      image: '/sun.png',
      manifesto:
        'Promises "Prosperous Nepal, Happy Nepalis" through ambitious economic goals—including boosting GDP to Rs 10 trillion (even Rs 100 trillion), raising per capita income to USD 2,400, providing free utilities (water and electricity), improving infrastructure, and fostering good governance and socialist-leaning prosperity.',
    },
  ];

  useEffect(() => {
    // Get selected candidate from URL params or localStorage
    const candidateId = searchParams.get('candidate') || localStorage.getItem('selectedCandidate');
    if (candidateId) {
      const candidate = candidates.find(c => c.id === candidateId);
      if (candidate) {
        setSelectedCandidate(candidate);
      }
    }
  }, [searchParams]);

  const handleCastVote = () => {
    setIsVoting(true);
    // Simulate secure vote processing
    setTimeout(() => {
      window.location.href = '/success';
    }, 4000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center cursor-pointer">
              <div className="flex items-center">
                <img
                  src="logo1.jpg"
                  alt="E-Vote Nepal Logo"
                  className="w-16 h-16 rounded-full mr-3"
                />
                <span className="font-['Pacifico'] text-2xl text-blue-900">E-Vote Nepal</span>
              </div>
            </Link>
            
            <div className="flex items-center space-x-4">
              <select className="px-3 py-1 rounded-lg border border-gray-300 text-sm bg-white pr-8">
                <option>English</option>
                <option>Nepali</option>
              </select>
            </div>
          </div>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">Step 3 of 4: Vote Confirmation</span>
            <span className="text-sm text-gray-600">75% Complete</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-blue-600 h-2 rounded-full w-3/4 transition-all duration-500"></div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-2xl shadow-xl p-8 lg:p-12">
          <div className="text-center mb-12">
            <div className="w-16 h-16 bg-orange-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <i className="ri-eye-line text-2xl text-white"></i>
            </div>
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Confirm Your Vote
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Please review your selection carefully. Once you cast your vote, it will be permanently secured with end-to-end encryption and cannot be changed.
            </p>
          </div>

          {/* Vote Summary */}
          {selectedCandidate ? (
            <div className="bg-blue-50 rounded-2xl p-8 mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6 text-center">Your Vote Summary</h2>
              
              <div className="flex items-center justify-center space-x-8 mb-8">
                <img
                  src={selectedCandidate.image}
                  alt={`${selectedCandidate.name} portrait`}
                  className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
                />
                
                <div className="text-center">
                  <h3 className="text-3xl font-bold text-gray-900 mb-2">{selectedCandidate.name}</h3>
                  <p className="text-xl text-blue-600 font-medium mb-4">{selectedCandidate.party}</p>
                  <div className="inline-flex items-center px-4 py-2 bg-green-100 text-green-800 rounded-full">
                    <i className="ri-check-line mr-2"></i>
                    Selected
                  </div>
                </div>
              </div>

              {/* Election Details */}
              <div className="grid md:grid-cols-2 gap-6 pt-6 border-t border-blue-200">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Election</h4>
                  <p className="text-gray-700">Nepal Overseas Voting System</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Constituency</h4>
                  <p className="text-gray-700">Registered Nepali Citizens Living Abroad</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Voter ID</h4>
                  <p className="text-gray-700">****-****-1234</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Date & Time</h4>
                  <p className="text-gray-700" suppressHydrationWarning={true}>
                    {new Date().toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-red-50 rounded-2xl p-8 mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4 text-center">No Candidate Selected</h2>
              <p className="text-center text-gray-600 mb-6">Please go back to the ballot and select a candidate first.</p>
              <div className="text-center">
                <Link
                  href="/ballot"
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  Back to Ballot
                </Link>
              </div>
            </div>
          )}

          {/* Security Disclaimer */}
          <div className="bg-red-50 border-l-4 border-red-400 p-6 mb-8">
            <div className="flex items-start">
              <i className="ri-alert-line text-red-400 mr-3 mt-1"></i>
              <div>
                <h3 className="font-semibold text-red-800 mb-2">Important Notice</h3>
                <p className="text-red-700 mb-3">
                  Your vote will be permanently secured with end-to-end encryption. This ensures privacy and prevents tampering, but also means your vote cannot be changed once submitted.
                </p>
                <ul className="text-red-700 text-sm space-y-1">
                  <li>• Your vote is anonymous and encrypted</li>
                  <li>• The encrypted record is immutable and permanent</li>
                  <li>• You will receive a transaction hash as proof of voting</li>
                  <li>• Election results will be publicly verifiable</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Voting Process */}
          {isVoting && (
            <div className="bg-blue-50 rounded-lg p-8 mb-8 text-center">
              <div className="animate-spin w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-6"></div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Processing Your Vote</h3>
              <p className="text-gray-600 mb-4">Please wait while we securely encrypt and record your vote...</p>
              
              <div className="space-y-2 text-sm text-gray-500">
                <div className="flex items-center justify-center">
                  <i className="ri-check-line text-green-600 mr-2"></i>
                  Encrypting vote data
                </div>
                <div className="flex items-center justify-center">
                  <div className="animate-spin w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full mr-2"></div>
                  Creating secure transaction
                </div>
                <div className="flex items-center justify-center text-gray-400">
                  <i className="ri-time-line mr-2"></i>
                  Confirming on network
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/ballot"
              className={`px-8 py-4 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-semibold text-lg text-center whitespace-nowrap ${
                isVoting ? 'opacity-50 cursor-not-allowed pointer-events-none' : 'cursor-pointer'
              }`}
            >
              Back to Ballot
            </Link>
            
            <button
              onClick={handleCastVote}
              disabled={isVoting}
              className={`px-8 py-4 rounded-xl font-semibold text-lg whitespace-nowrap transition-colors ${
                isVoting
                  ? 'bg-gray-400 text-white cursor-not-allowed'
                  : 'bg-red-600 text-white hover:bg-red-700 cursor-pointer'
              }`}
            >
              {isVoting ? 'Casting Vote...' : 'Cast Vote'}
            </button>
          </div>
          
          <p className="text-center text-sm text-gray-500 mt-6">
            By casting your vote, you acknowledge that you understand the permanent nature of encrypted recording.
          </p>
        </div>
      </div>
    </div>
  );
}