'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Candidate {
  id: string;
  name: string;
  party: string;
  image: string;
  manifesto: string;
}

export default function SuccessPage() {
  const [showConfetti, setShowConfetti] = useState(true);
  const [copied, setCopied] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);
  
  // Mock transaction hash
  const transactionHash = '0x7f9fade1c0d57a7af66ab4ead7c2c2eb7b11a91385c26b4e1b4f4b4f4b4f4b4f';
  
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
    // Hide confetti after 5 seconds
    const timer = setTimeout(() => {
      setShowConfetti(false);
    }, 5000);
    
    // Get selected candidate from localStorage
    const candidateId = localStorage.getItem('selectedCandidate');
    if (candidateId) {
      const candidate = candidates.find(c => c.id === candidateId);
      if (candidate) {
        setSelectedCandidate(candidate);
      }
    }
    
    return () => clearTimeout(timer);
  }, []);

  const copyTransactionHash = () => {
    navigator.clipboard.writeText(transactionHash);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadReceipt = () => {
    // Mock receipt download
    const receiptData = `
VOTE RECEIPT - E-VOTE NEPAL
==========================

Election: 2024 Presidential Election
Constituency: Overseas Voters
Date: ${new Date().toLocaleString()}
Voter ID: ****-****-1234

Selected Candidate: ${selectedCandidate?.name || 'Unknown'}
Party: ${selectedCandidate?.party || 'Unknown'}

Transaction Hash: ${transactionHash}

This receipt serves as proof of your participation in the democratic process.
Your vote has been securely recorded using end-to-end encryption.

E-Vote Nepal - Secure Online Voting
    `;
    
    const element = document.createElement('a');
    const file = new Blob([receiptData], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = 'vote-receipt.txt';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-100 relative overflow-hidden">
      {/* Confetti Animation */}
      {showConfetti && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-bounce"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 3}s`
              }}
            >
              <div className={`w-2 h-2 ${['bg-blue-500', 'bg-green-500', 'bg-yellow-500', 'bg-red-500', 'bg-purple-500'][Math.floor(Math.random() * 5)]} rounded-full`}></div>
            </div>
          ))}
        </div>
      )}

      {/* Header */}
      <header className="bg-white/90 backdrop-blur-sm border-b border-gray-200 relative z-10">
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
      <div className="bg-white border-b border-gray-200 relative z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">Step 4 of 4: Vote Complete</span>
            <span className="text-sm text-green-600 font-semibold">100% Complete</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-green-600 h-2 rounded-full w-full transition-all duration-1000"></div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        <div className="bg-white rounded-2xl shadow-xl p-8 lg:p-12">
          {/* Success Icon */}
          <div className="text-center mb-12">
            <div className="w-24 h-24 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
              <i className="ri-check-line text-4xl text-white"></i>
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Your Vote Was Successfully Cast!
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Thank you for participating in the democratic process. Your vote has been securely recorded with end-to-end encryption and will be counted in the final tally.
            </p>
          </div>

          {/* Vote Confirmation Details */}
          <div className="bg-green-50 rounded-2xl p-8 mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6 text-center">Vote Confirmation</h2>
            
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="text-center md:text-left">
                <h3 className="font-semibold text-gray-900 mb-2">Your Selection</h3>
                <p className="text-2xl font-bold text-green-700 mb-1">{selectedCandidate?.name || 'Unknown Candidate'}</p>
                <p className="text-green-600">{selectedCandidate?.party || 'Unknown Party'}</p>
              </div>
              
              <div className="text-center md:text-right">
                <h3 className="font-semibold text-gray-900 mb-2">Vote Cast</h3>
                <p className="text-lg text-gray-700" suppressHydrationWarning={true}>
                  {new Date().toLocaleString()}
                </p>
                <p className="text-sm text-gray-500">Encrypted confirmed</p>
              </div>
            </div>

            {/* Transaction Hash */}
            <div className="border-t border-green-200 pt-6">
              <h3 className="font-semibold text-gray-900 mb-4">Transaction Hash</h3>
              <div className="flex items-center space-x-4 bg-white rounded-lg p-4">
                <code className="flex-1 text-sm text-gray-800 break-all font-mono">
                  {transactionHash}
                </code>
                <button
                  onClick={copyTransactionHash}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium whitespace-nowrap cursor-pointer"
                >
                  {copied ? (
                    <>
                      <i className="ri-check-line mr-1"></i>
                      Copied
                    </>
                  ) : (
                    <>
                      <i className="ri-file-copy-line mr-1"></i>
                      Copy
                    </>
                  )}
                </button>
              </div>
              <p className="text-sm text-gray-500 mt-2">
                Save this hash to verify your vote was recorded. You can use this for verification purposes.
              </p>
            </div>
          </div>

          {/* Receipt Download */}
          <div className="bg-blue-50 rounded-xl p-6 mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  <i className="ri-download-line mr-2"></i>
                  Download Receipt
                </h3>
                <p className="text-gray-600">
                  Get a detailed receipt of your vote for your records.
                </p>
              </div>
              <button
                onClick={downloadReceipt}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium whitespace-nowrap cursor-pointer"
              >
                Download
              </button>
          </div>
          </div>

          {/* Important Information */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 mb-8">
            <div className="flex items-start">
              <i className="ri-information-line text-yellow-600 mr-3 mt-1"></i>
              <div>
                <h3 className="font-semibold text-yellow-800 mb-2">What Happens Next?</h3>
                <ul className="text-yellow-700 space-y-2">
                  <li>• Your vote is now part of the immutable encrypted record</li>
                  <li>• Election results will be publicly available after the voting period closes</li>
                  <li>• You can verify your vote was counted using your transaction hash</li>
                  <li>• Official results will be announced by the election commission</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Voting Statistics */}
          <div className="bg-gray-50 rounded-xl p-6 mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">Live Election Statistics</h3>
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold text-blue-600 mb-2">847,532</div>
                <div className="text-gray-600">Total Votes Cast</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-green-600 mb-2">68.4%</div>
                <div className="text-gray-600">Voter Turnout</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-purple-600 mb-2">156</div>
                <div className="text-gray-600">Countries</div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="px-8 py-4 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-semibold text-lg text-center whitespace-nowrap cursor-pointer"
            >
              Return to Home
            </Link>
            
            <Link
              href="/admin"
              className="px-8 py-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-semibold text-lg text-center whitespace-nowrap cursor-pointer"
            >
              View Election Results
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}