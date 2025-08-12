'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function AuthPage() {
  const [step, setStep] = useState(1);
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [idUploaded, setIdUploaded] = useState(false);
  const [faceVerified, setFaceVerified] = useState(false);

  const handleFaceVerification = () => {
    setIsAuthenticating(true);
    setTimeout(() => {
      setFaceVerified(true);
      setIsAuthenticating(false);
    }, 3000);
  };

  const handleIdUpload = () => {
    setIdUploaded(true);
  };

  const canContinue = faceVerified && idUploaded;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center cursor-pointer">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center mr-3">
                <i className="ri-vote-line text-white"></i>
              </div>
              <span className="font-['Pacifico'] text-2xl text-blue-900">VoteBridge</span>
            </Link>
            
            <div className="flex items-center space-x-4">
              <select className="px-3 py-1 rounded-lg border border-gray-300 text-sm bg-white pr-8">
                <option>English</option>
                <option>Español</option>
                <option>Français</option>
                <option>中文</option>
              </select>
            </div>
          </div>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">Step 1 of 4: Identity Verification</span>
            <span className="text-sm text-gray-600">25% Complete</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-blue-600 h-2 rounded-full w-1/4 transition-all duration-500"></div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-2xl shadow-xl p-8 lg:p-12">
          <div className="text-center mb-12">
            <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <i className="ri-shield-user-line text-2xl text-white"></i>
            </div>
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Voter Identity Authentication
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              To ensure election integrity, we need to verify your identity using secure biometric authentication and government-issued identification.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Face Recognition */}
            <div className="space-y-6">
              <div className="text-center">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Face Recognition</h2>
                <p className="text-gray-600 mb-6">
                  Position your face within the frame for biometric verification
                </p>
                
                <div className="relative mx-auto w-64 h-64 mb-6">
                  <div className="absolute inset-0 rounded-full border-4 border-dashed border-blue-300 animate-pulse"></div>
                  <div className="w-full h-full bg-blue-50 rounded-full flex items-center justify-center">
                    {isAuthenticating ? (
                      <div className="text-center">
                        <div className="animate-spin w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-4"></div>
                        <p className="text-blue-600 font-medium">Authenticating...</p>
                      </div>
                    ) : faceVerified ? (
                      <div className="text-center">
                        <i className="ri-check-line text-6xl text-green-600 mb-2"></i>
                        <p className="text-green-600 font-medium">Verified</p>
                      </div>
                    ) : (
                      <div className="text-center">
                        <i className="ri-user-line text-6xl text-gray-400 mb-2"></i>
                        <p className="text-gray-500">Position your face here</p>
                      </div>
                    )}
                  </div>
                </div>
                
                <button
                  onClick={handleFaceVerification}
                  disabled={isAuthenticating || faceVerified}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-medium whitespace-nowrap cursor-pointer"
                >
                  {isAuthenticating ? 'Processing...' : faceVerified ? 'Verified' : 'Start Face Scan'}
                </button>
              </div>
            </div>

            {/* ID Upload */}
            <div className="space-y-6">
              <div className="text-center">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Government ID Upload</h2>
                <p className="text-gray-600 mb-6">
                  Upload a clear photo of your passport or national ID card
                </p>
                
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 mb-6 hover:border-blue-400 transition-colors">
                  {idUploaded ? (
                    <div className="text-center">
                      <i className="ri-file-check-line text-6xl text-green-600 mb-4"></i>
                      <p className="text-green-600 font-medium mb-2">ID Document Uploaded</p>
                      <p className="text-sm text-gray-500">passport_scan.jpg</p>
                    </div>
                  ) : (
                    <div className="text-center">
                      <i className="ri-upload-cloud-2-line text-6xl text-gray-400 mb-4"></i>
                      <p className="text-gray-600 font-medium mb-2">Drop your ID here or click to upload</p>
                      <p className="text-sm text-gray-500">Supports JPG, PNG up to 10MB</p>
                    </div>
                  )}
                </div>
                
                <button
                  onClick={handleIdUpload}
                  disabled={idUploaded}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-medium whitespace-nowrap cursor-pointer"
                >
                  {idUploaded ? 'ID Uploaded' : 'Upload ID Document'}
                </button>
              </div>
            </div>
          </div>

          {/* Alternative Login */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <div className="text-center">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Alternative Authentication</h3>
              <p className="text-gray-600 mb-6">
                You can also authenticate using your government-issued ID or passport number
              </p>
              
              <div className="max-w-md mx-auto space-y-4">
                <input
                  type="text"
                  placeholder="Enter Passport/ID Number"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent text-sm"
                />
                <button className="w-full px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium whitespace-nowrap cursor-pointer">
                  Verify with ID Number
                </button>
              </div>
            </div>
          </div>

          {/* Status Messages */}
          {(faceVerified || idUploaded) && (
            <div className="mt-8 p-4 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center">
                <i className="ri-check-line text-green-600 mr-2"></i>
                <p className="text-green-800">
                  {faceVerified && idUploaded 
                    ? 'Identity verification complete! You can now proceed to voting.'
                    : 'Partial verification complete. Please complete all steps to continue.'
                  }
                </p>
              </div>
            </div>
          )}

          {/* Continue Button */}
          <div className="mt-12 text-center">
            <Link 
              href={canContinue ? "/ballot" : "#"}
              className={`inline-block px-8 py-4 rounded-xl font-semibold text-lg whitespace-nowrap transition-colors ${
                canContinue
                  ? 'bg-blue-600 text-white hover:bg-blue-700 cursor-pointer'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              Continue to Ballot
            </Link>
            
            <p className="text-sm text-gray-500 mt-4">
              Your identity data is encrypted and stored securely according to election privacy laws.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}