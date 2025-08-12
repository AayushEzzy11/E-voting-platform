'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState('overview');
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1500);
  };

  // Mock data
  const electionData = {
    totalVotes: 847532,
    turnoutRate: 68.4,
    countries: 156,
    candidates: [
      { name: 'Sarah Johnson', party: 'Progressive Alliance', votes: 342156, percentage: 40.4 },
      { name: 'Michael Chen', party: 'Economic Reform Party', votes: 289743, percentage: 34.2 },
      { name: 'Elena Rodriguez', party: 'Social Justice Coalition', votes: 143876, percentage: 17.0 },
      { name: 'Robert Thompson', party: 'Conservative Unity', votes: 71757, percentage: 8.4 }
    ],
    systemHealth: {
      blockchainStatus: 'Healthy',
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
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center mr-3">
                <i className="ri-vote-line text-white"></i>
              </div>
              <span className="font-['Pacifico'] text-2xl text-blue-900">VoteBridge</span>
              <span className="ml-3 px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full font-medium">ADMIN</span>
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
          <p className="text-lg text-gray-600">Monitor voter turnout, system health, and election results in real-time.</p>
        </div>

        {/* Tab Navigation */}
        <div className="flex space-x-2 mb-8 overflow-x-auto">
          <button onClick={() => setActiveTab('overview')} className={tabButtonClass('overview')}>
            Overview
          </button>
          <button onClick={() => setActiveTab('results')} className={tabButtonClass('results')}>
            Vote Results
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
              <div className="space-y-4">
                {electionData.candidates.slice(0, 2).map((candidate, index) => (
                  <div key={candidate.name} className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${
                        index === 0 ? 'bg-yellow-500' : 'bg-gray-400'
                      }`}>
                        {index + 1}
                      </div>
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
                  <div key={candidate.name} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-4">
                        <img
                          src={`https://readdy.ai/api/search-image?query=Professional%20headshot%20of%20political%20candidate%20$%7Bcandidate.name%7D%2C%20business%20attire%2C%20clean%20government%20office%20background%2C%20leadership%20portrait%2C%20high-quality%20campaign%20photo%2C%20blue%20and%20white%20color%20scheme&width=100&height=100&seq=admin-candidate-${index + 1}&orientation=squarish`}
                          alt={candidate.name}
                          className="w-16 h-16 rounded-full object-cover"
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

        {/* System Health Tab */}
        {activeTab === 'system' && (
          <div className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">System Status</h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Blockchain Network</span>
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                      <span className="text-green-600 font-medium">{electionData.systemHealth.blockchainStatus}</span>
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
                { time: '14:32:18', type: 'SUCCESS', message: 'Vote validated and recorded on blockchain', hash: '0x7f9fade1c0d5...' },
                { time: '14:31:45', type: 'SUCCESS', message: 'Identity verification completed', id: 'USER_8432' },
                { time: '14:30:22', type: 'WARNING', message: 'Multiple login attempts detected', ip: '192.168.1.42' },
                { time: '14:29:15', type: 'SUCCESS', message: 'Blockchain transaction confirmed', hash: '0x2a3b4c5d6e7f...' },
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