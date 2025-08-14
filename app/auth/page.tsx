'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';

export default function AuthPage() {
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [faceVerified, setFaceVerified] = useState(false);
  const [idFile, setIdFile] = useState<File | null>(null);
  const [altIdNumber, setAltIdNumber] = useState('');
  const [altIdValid, setAltIdValid] = useState(false);
  const [cameraActive, setCameraActive] = useState(false);
  const [verificationMessage, setVerificationMessage] = useState('');

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Start camera
  const startCamera = async () => {
    try {
      setCameraActive(true);
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }
    } catch (err) {
      console.error('Error accessing camera:', err);
      setCameraActive(false);
    }
  };

  // Stop camera
  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach((track) => track.stop());
    }
    setCameraActive(false);
  };

  // Face + ID verification
  const handleFaceVerification = async () => {
    if (!idFile) {
      alert('Please upload your Government ID first.');
      return;
    }

    setIsAuthenticating(true);

    if (videoRef.current && canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d');
      canvasRef.current.width = videoRef.current.videoWidth;
      canvasRef.current.height = videoRef.current.videoHeight;
      ctx?.drawImage(videoRef.current, 0, 0);

      const faceImage = canvasRef.current.toDataURL('image/jpeg');

      const reader = new FileReader();
      reader.onloadend = async () => {
        const idImage = reader.result;

        try {
          const res = await fetch('/api/verifyface', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ faceImage, idImage })
          });

          const data = await res.json();
          setFaceVerified(data.success);
          setVerificationMessage(data.message);
        } catch (err) {
          console.error(err);
          setFaceVerified(false);
          setVerificationMessage('Verification failed due to network error.');
        } finally {
          setIsAuthenticating(false);
          stopCamera();
        }
      };
      reader.readAsDataURL(idFile);
    }
  };

  // Alternative ID validation
  const handleAltIdChange = (value: string) => {
    setAltIdNumber(value);
    setAltIdValid(value.trim().length >= 5);
  };

  // Can continue if face verified OR (ID file uploaded AND alt ID valid)
  const canContinue = faceVerified || (idFile && altIdValid);

  // Stop camera on unmount
  useEffect(() => {
    return () => stopCamera();
  }, []);

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
              <span className="font-serif text-2xl text-blue-900 font-semibold">E-Vote Nepal</span>
            </Link>
            <select className="px-3 py-1 rounded-lg border border-gray-300 text-sm bg-white pr-8">
              <option>English</option>
              <option>Español</option>
              <option>Français</option>
              <option>中文</option>
            </select>
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
              Verify your identity using secure biometric authentication and government-issued identification.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Face Recognition */}
            <div className="text-center">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Face Recognition</h2>
              <p className="text-gray-600 mb-6">Position your face within the frame</p>

              <div className="relative mx-auto w-64 h-64 mb-6 rounded-full overflow-hidden border-4 border-dashed border-blue-300">
                {cameraActive ? (
                  <video ref={videoRef} className="w-full h-full object-cover" />
                ) : faceVerified ? (
                  <div className="flex items-center justify-center w-full h-full bg-green-50">
                    <i className="ri-check-line text-6xl text-green-600"></i>
                  </div>
                ) : (
                  <div className="flex items-center justify-center w-full h-full bg-blue-50">
                    <i className="ri-user-line text-6xl text-gray-400"></i>
                  </div>
                )}
              </div>

              {!cameraActive && !faceVerified && (
                <button
                  onClick={startCamera}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Open Camera
                </button>
              )}

              {cameraActive && !faceVerified && (
                <button
                  onClick={handleFaceVerification}
                  className="px-6 py-3 mt-4 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                  Verify Face & ID
                </button>
              )}

              {isAuthenticating && (
                <p className="mt-4 text-blue-600">Authenticating...</p>
              )}
            </div>

            {/* ID Upload */}
            <div className="text-center">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Government ID Upload</h2>
              <p className="text-gray-600 mb-6">Upload your passport or national ID card</p>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 mb-6 hover:border-blue-400 transition-colors">
                {idFile ? (
                  <div>
                    <i className="ri-file-check-line text-6xl text-green-600 mb-4"></i>
                    <p className="text-green-600 font-medium">ID Document Selected</p>
                    <p className="text-sm text-gray-500">{idFile.name}</p>
                  </div>
                ) : (
                  <div>
                    <i className="ri-upload-cloud-2-line text-6xl text-gray-400 mb-4"></i>
                    <p className="text-gray-600 font-medium">Drop or click to upload</p>
                    <p className="text-sm text-gray-500">Supports JPG, PNG up to 10MB</p>
                  </div>
                )}
              </div>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setIdFile(e.target.files ? e.target.files[0] : null)}
                className="mb-4"
              />
            </div>
          </div>

          {/* Alternative Login */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <div className="text-center">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Alternative Authentication</h3>
              <p className="text-gray-600 mb-6">
                {idFile
                  ? 'Optional: Enter your ID number as backup verification'
                  : 'Required: Enter your ID number if no document is uploaded'}
              </p>
              <div className="max-w-md mx-auto space-y-4">
                <input
                  type="text"
                  placeholder="Enter Passport/ID Number"
                  value={altIdNumber}
                  onChange={(e) => handleAltIdChange(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600"
                />
                {!idFile && !altIdValid && altIdNumber.length > 0 && (
                  <p className="text-red-500 text-sm">ID must be at least 5 characters</p>
                )}
              </div>
            </div>
          </div>

          {/* Result message */}
          {verificationMessage && (
            <p className={`mt-6 text-center font-medium ${faceVerified ? 'text-green-600' : 'text-red-600'}`}>
              {verificationMessage}
            </p>
          )}

          {/* Continue Button */}
          <div className="mt-12 text-center">
            <Link
              href={canContinue ? '/ballot' : '#'}
              className={`inline-block px-8 py-4 rounded-xl font-semibold text-lg transition-colors ${
                canContinue
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              Continue to Ballot
            </Link>
          </div>
        </div>
      </div>

      {/* Hidden canvas for snapshot */}
      <canvas ref={canvasRef} className="hidden"></canvas>
    </div>
  );
}