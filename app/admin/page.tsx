'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface Candidate {
  id: string;
  name: string;
  party: string;
  image: string;
  manifesto: string;
  votes: number;
  percentage: number;
}

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState('overview');
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1500);
  };

  // Same candidate data as ballot page with vote counts
  const candidates: Candidate[] = [
    {
      id: '1',
      name: 'Sher Bahadur Deuba',
      party: 'Nepali Congress',
      image: '/tree.png',
      manifesto: 'Leading Nepal toward economic prosperity by safeguarding the constitution, generating mass employment, expanding infrastructure and social services, and promoting inclusive, sustainable development for all.',
      votes: 342156,
      percentage: 40.4
    },
    {
      id: '2',
      name: 'Rajendra Prasad Lingden',
      party: 'Rastriya Prajantantra Party',
      image: '/halo.png',
      manifesto: 'Calls for restoration of constitutional monarchy with ceremonial king, directly elected prime minister, Hindu-state identity with full religious freedom, a streamlined two-tier federal structure (abolishing provinces), and stronger local governance.',
      votes: 289743,
      percentage: 34.2
    },
    {
      id: '3',
      name: 'Rabi Lamichhane',
      party: 'Rastriya Swatantra Party',
      image: '/ghanti.png',
      manifesto: 'Advocates for economic freedom under capitalism, direct election of executive prime minister and chief ministers, enhanced social welfare (single-payer healthcare, food banks, anti-corruption measures), and decentralized but efficient governance.',
      votes: 143876,
      percentage: 17.0
    },
    {
      id: '4',
      name: 'Khadga Prasad Sharma Oli',
      party: 'Nepal Communist Party (UML)',
      image: '/sun.png',
      manifesto: 'Promises "Prosperous Nepal, Happy Nepalis" through ambitious economic goals—including boosting GDP to Rs 10 trillion (even Rs 100 trillion), raising per capita income to USD 2,400, providing free utilities (water and electricity), improving infrastructure, and fostering good governance and socialist-leaning prosperity.',
      votes: 71757,
      percentage: 8.4
    }
  ];

  // Mock data
  const electionData = {
    totalVotes: 847532,
    turnoutRate: 68.4,
    countries: 156,
    candidates: candidates,
    systemHealth: {
      encryptionStatus: 'Healthy',
      networkLatency: '45ms',
      lastUpdate: new Date().toLocaleString(),
      validationRate: 99.8
    }
  };

  const tabButtonClass = (tabName: string) =>
    `px-6 py-3 rounded-full font-medium transition-colors whitespace-nowrap cursor-pointer ${
      activeTab === tabName
        ? 'bg-blue-600 text-white'
        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
    }`;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
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
                <span className="ml-3 px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full font-medium">ADMIN</span>
              </div>
            </Link>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={handleRefresh}
                disabled={refreshing}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 transition-colors whitespace-nowrap cursor-pointer"
              >
                {refreshing ? (
                  <>
                    <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full inline-block mr-2"></div>
                    Refreshing
                  </>
                ) : (
                  <>
                    <i className="ri-refresh-line mr-2"></i>
                    Refresh Data
                  </>
                )}
              </button>
              
              <select className="px-3 py-1 rounded-lg border border-gray-300 text-sm bg-white pr-8">
                <option>English</option>
                <option>Nepali</option>
              </select>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Election Administration Dashboard</h1>
          <p className="text-lg text-gray-600">Monitor voter turnout, system health, and election results for Nepal Overseas Voting System in real-time.</p>
        </div>

        {/* Tab Navigation */}
        <div className="flex space-x-2 mb-8 overflow-x-auto">
          <button onClick={() => setActiveTab('overview')} className={tabButtonClass('overview')}>
            Overview
          </button>
          <button onClick={() => setActiveTab('results')} className={tabButtonClass('results')}>
            Vote Results
          </button>
          <button onClick={() => setActiveTab('candidates')} className={tabButtonClass('candidates')}>
            Candidates
          </button>
          <button onClick={() => setActiveTab('system')} className={tabButtonClass('system')}>
            System Health
          </button>
          <button onClick={() => setActiveTab('logs')} className={tabButtonClass('logs')}>
            Validation Logs
          </button>
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Key Metrics */}
            <div className="grid lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <i className="ri-group-line text-2xl text-blue-600"></i>
                  </div>
                  <span className="text-green-600 text-sm font-medium">↑ Live</span>
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{electionData.totalVotes.toLocaleString()}</div>
                <div className="text-gray-600">Total Votes Cast</div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <i className="ri-bar-chart-line text-2xl text-green-600"></i>
                  </div>
                  <span className="text-blue-600 text-sm font-medium">{electionData.turnoutRate}%</span>
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{electionData.turnoutRate}%</div>
                <div className="text-gray-600">Voter Turnout Rate</div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <i className="ri-global-line text-2xl text-purple-600"></i>
                  </div>
                  <span className="text-purple-600 text-sm font-medium">Countries</span>
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{electionData.countries}</div>
                <div className="text-gray-600">Participating Countries</div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                    <i className="ri-shield-check-line text-2xl text-orange-600"></i>
                  </div>
                  <span className="text-green-600 text-sm font-medium">Secure</span>
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">99.8%</div>
                <div className="text-gray-600">Validation Rate</div>
              </div>
            </div>

            {/* Quick Results Preview */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Current Leading Results</h2>
              <div className="space-y-6">
                {electionData.candidates.slice(0, 2).map((candidate, index) => (
                  <div key={candidate.id} className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${
                        index === 0 ? 'bg-yellow-500' : 'bg-gray-400'
                      }`}>
                        {index + 1}
                      </div>
                      <img
                        src={candidate.image}
                        alt={candidate.name}
                        className="w-12 h-12 rounded-full object-cover border-2 border-gray-200"
                      />
                      <div>
                        <div className="font-semibold text-gray-900">{candidate.name}</div>
                        <div className="text-sm text-gray-600">{candidate.party}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-lg">{candidate.percentage}%</div>
                      <div className="text-sm text-gray-600">{candidate.votes.toLocaleString()} votes</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Results Tab */}
        {activeTab === 'results' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Detailed Vote Results</h2>
                <div className="text-sm text-gray-600">
                  Last updated: <span suppressHydrationWarning={true}>{new Date().toLocaleString()}</span>
                </div>
              </div>
              
              <div className="space-y-6">
                {electionData.candidates.map((candidate, index) => (
                  <div key={candidate.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-4">
                        <img
                          src={candidate.image}
                          alt={candidate.name}
                          className="w-16 h-16 rounded-full object-cover border-2 border-gray-200"
                        />
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">{candidate.name}</h3>
                          <p className="text-gray-600">{candidate.party}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-gray-900">{candidate.percentage}%</div>
                        <div className="text-gray-600">{candidate.votes.toLocaleString()} votes</div>
                      </div>
                    </div>
                    
                    {/* Vote Bar */}
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className="bg-blue-600 h-3 rounded-full transition-all duration-1000"
                        style={{ width: `${candidate.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Candidates Tab */}
        {activeTab === 'candidates' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Candidate Information</h2>
                <div className="text-sm text-gray-600">
                  Nepal Overseas Voting System - {candidates.length} Candidates
                </div>
              </div>
              
              <div className="grid gap-6">
                {candidates.map((candidate, index) => (
                  <div key={candidate.id} className="border border-gray-200 rounded-lg p-6">
                    <div className="flex items-start space-x-6">
                      <img
                        src={candidate.image}
                        alt={candidate.name}
                        className="w-24 h-24 rounded-full object-cover border-4 border-gray-200 flex-shrink-0"
                      />
                      
                      <div className="flex-grow">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h3 className="text-2xl font-semibold text-gray-900 mb-2">{candidate.name}</h3>
                            <p className="text-lg text-blue-600 font-medium mb-2">{candidate.party}</p>
                            <div className="inline-flex items-center px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-medium">
                              Candidate #{candidate.id}
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-bold text-gray-900">{candidate.percentage}%</div>
                            <div className="text-sm text-gray-600">{candidate.votes.toLocaleString()} votes</div>
                          </div>
                        </div>
                        
                        <div className="bg-gray-50 rounded-lg p-4">
                          <h4 className="font-semibold text-gray-900 mb-2">Platform Summary</h4>
                          <p className="text-gray-700 leading-relaxed">{candidate.manifesto}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* System Health Tab */}
        {activeTab === 'system' && (
          <div className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">System Status</h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Encryption Network</span>
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                      <span className="text-green-600 font-medium">{electionData.systemHealth.encryptionStatus}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Network Latency</span>
                    <span className="font-medium">{electionData.systemHealth.networkLatency}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Validation Success Rate</span>
                    <span className="font-medium text-green-600">{electionData.systemHealth.validationRate}%</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Last Health Check</span>
                    <span className="font-medium" suppressHydrationWarning={true}>{electionData.systemHealth.lastUpdate}</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Security Metrics</h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Failed Authentication Attempts</span>
                    <span className="font-medium text-yellow-600">23</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Blocked IP Addresses</span>
                    <span className="font-medium text-red-600">5</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">SSL Certificate Status</span>
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                      <span className="text-green-600 font-medium">Valid</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Database Encryption</span>
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                      <span className="text-green-600 font-medium">Active</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Validation Logs Tab */}
        {activeTab === 'logs' && (
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Recent Validation Events</h2>
            <div className="space-y-4">
              {[
                { time: '14:32:18', type: 'SUCCESS', message: 'Vote validated and encrypted successfully', hash: '0x7f9fade1c0d5...' },
                { time: '14:31:45', type: 'SUCCESS', message: 'Identity verification completed', id: 'USER_8432' },
                { time: '14:30:22', type: 'WARNING', message: 'Multiple login attempts detected', ip: '192.168.1.42' },
                { time: '14:29:15', type: 'SUCCESS', message: 'Secure transaction confirmed', hash: '0x2a3b4c5d6e7f...' },
                { time: '14:28:33', type: 'ERROR', message: 'Invalid authentication token rejected', id: 'INVALID_TOKEN' },
                { time: '14:27:56', type: 'SUCCESS', message: 'System health check completed', status: 'ALL_GREEN' }
              ].map((log, index) => (
                <div key={index} className="flex items-start space-x-4 p-4 border border-gray-200 rounded-lg">
                  <div className="flex-shrink-0">
                    <div className={`w-2 h-2 rounded-full mt-2 ${
                      log.type === 'SUCCESS' ? 'bg-green-500' :
                      log.type === 'WARNING' ? 'bg-yellow-500' : 'bg-red-500'
                    }`}></div>
                  </div>
                  <div className="flex-grow">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-gray-500">{log.time}</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        log.type === 'SUCCESS' ? 'bg-green-100 text-green-800' :
                        log.type === 'WARNING' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {log.type}
                      </span>
                    </div>
                    <p className="text-gray-900">{log.message}</p>
                    {(log.hash || log.id || log.ip || log.status) && (
                      <p className="text-sm text-gray-500 font-mono mt-1">
                        {log.hash || log.id || log.ip || log.status}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}