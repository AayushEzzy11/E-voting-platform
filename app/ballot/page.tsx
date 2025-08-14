// BALLOT
'use client';

import { useState } from 'react';
import Link from 'next/link';

interface Candidate {
  id: string;
  name: string;
  party: string;
  image: string;
  manifesto: string;
}

export default function BallotPage() {
  const [selectedCandidate, setSelectedCandidate] = useState<string>('');
  const [showManifesto, setShowManifesto] = useState<string>('');

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
        'Promises “Prosperous Nepal, Happy Nepalis” through ambitious economic goals—including boosting GDP to Rs 10 trillion (even Rs 100 trillion), raising per capita income to USD 2,400, providing free utilities (water and electricity), improving infrastructure, and fostering good governance and socialist-leaning prosperity.',
    },
  ];

  const handleCandidateSelect = (candidateId: string) => {
    setSelectedCandidate(candidateId);
    // Store selected candidate in localStorage for confirm page
    localStorage.setItem('selectedCandidate', candidateId);
  };

  const toggleManifesto = (candidateId: string) => {
    setShowManifesto(showManifesto === candidateId ? '' : candidateId);
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
            <span className="text-sm text-gray-600">
              Step 2 of 4: Ballot Selection
            </span>
            <span className="text-sm text-gray-600">50% Complete</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-blue-600 h-2 rounded-full w-1/2 transition-all duration-500"></div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-2xl shadow-xl p-8 lg:p-12">
          <div className="text-center mb-12">
            <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <i className="ri-checkbox-line text-2xl text-white"></i>
            </div>
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Choose Your Candidate
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Review each candidate's platform and select your choice for
              the upcoming election. Your selection will be encrypted and
              securely recorded.
            </p>
          </div>

          {/* Election Info */}
          <div className="bg-blue-50 rounded-lg p-6 mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-blue-900 mb-2">
                  Nepal Overseas Voting System
                </h2>
                <p className="text-blue-700">
                  For Registered Nepali Citizens Living Abroad
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm text-blue-600 mb-1">Election Date</p>
                <p className="text-blue-900 font-semibold">Demo — Open Now</p>
              </div>
            </div>
          </div>

          {/* Candidates */}
          <div className="space-y-6 mb-12">
            {candidates.map((candidate) => (
              <div
                key={candidate.id}
                onClick={() => handleCandidateSelect(candidate.id)}
                className={`border rounded-xl p-6 transition-colors cursor-pointer ${
                  selectedCandidate === candidate.id
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-blue-300'
                }`}
              >
                <div className="flex items-start space-x-6">
                  {/* Radio Button */}
                  <div className="flex items-center mt-2">
                    <input
                      type="radio"
                      id={`candidate-${candidate.id}`}
                      name="candidate"
                      value={candidate.id}
                      checked={selectedCandidate === candidate.id}
                      onChange={() => handleCandidateSelect(candidate.id)}
                      className="w-5 h-5 text-blue-600 border-gray-300 focus:ring-blue-600"
                    />
                  </div>

                  {/* Candidate Photo */}
                  <div className="flex-shrink-0">
                    <img
                      src={candidate.image}
                      alt={`${candidate.name} portrait`}
                      className="w-24 h-24 rounded-full object-cover border-4 border-gray-200"
                    />
                  </div>

                  {/* Candidate Info */}
                  <div className="flex-grow">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                          {candidate.name}
                        </h3>
                        <p className="text-blue-600 font-medium">
                          {candidate.party}
                        </p>
                      </div>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleManifesto(candidate.id);
                        }}
                        className="px-4 py-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors text-sm font-medium whitespace-nowrap cursor-pointer"
                      >
                        {showManifesto === candidate.id
                          ? 'Hide Platform'
                          : 'View Platform'}
                      </button>
                    </div>

                    {/* Manifesto */}
                    {showManifesto === candidate.id && (
                      <div className="bg-gray-50 rounded-lg p-4 mt-4">
                        <h4 className="font-semibold text-gray-900 mb-2">
                          Platform Summary
                        </h4>
                        <p className="text-gray-700 leading-relaxed">
                          {candidate.manifesto}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Selection Summary */}
          {selectedCandidate && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
              <div className="flex items-center">
                <i className="ri-check-line text-green-600 mr-3"></i>
                <div>
                  <p className="text-green-800 font-medium">
                    You have selected:{' '}
                    {candidates.find((c) => c.id === selectedCandidate)?.name}
                  </p>
                  <p className="text-green-700 text-sm">
                    {candidates.find((c) => c.id === selectedCandidate)?.party}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Voting Instructions */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-8">
            <div className="flex items-start">
              <i className="ri-information-line text-yellow-600 mr-3 mt-1"></i>
              <div>
                <h3 className="font-semibold text-yellow-800 mb-2">
                  Important Voting Information
                </h3>
                <ul className="text-yellow-700 text-sm space-y-1">
                  <li>• You can only vote once per election</li>
                  <li>• Your vote is final and cannot be changed after confirmation</li>
                  <li>• All votes are encrypted and securely recorded</li>
                  <li>• You will receive a confirmation receipt after voting</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/auth"
              className="px-8 py-4 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-semibold text-lg text-center whitespace-nowrap cursor-pointer"
            >
              Back to Authentication
            </Link>

            <Link
              href={selectedCandidate ? `/confirm?candidate=${selectedCandidate}` : '#'}
              className={`px-8 py-4 rounded-xl font-semibold text-lg text-center whitespace-nowrap transition-colors ${
                selectedCandidate
                  ? 'bg-blue-600 text-white hover:bg-blue-700 cursor-pointer'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              Confirm Selection
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}