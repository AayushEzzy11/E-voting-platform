'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { User } from 'firebase/auth';
import { 
  sendEmailVerificationToUser,
  setupPhoneVerification,
  sendPhoneVerificationCode,
  verifyPhoneCode,
  createUserProfile,
  checkVotingEligibility,
  getUserProfile,
  submitIdVerification,
  checkDuplicateNationalId,
  UserProfile
} from '../lib/verification';

interface VerificationProcessProps {
  user: User | null;
  onVerificationComplete: (profile: UserProfile) => void;
}

interface VerificationStep {
  id: string;
  name: string;
  description: string;
  completed: boolean;
  required: boolean;
}

export const VerificationProcess: React.FC<VerificationProcessProps> = ({
  user,
  onVerificationComplete
}) => {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Form states
  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    nationalId: '',
    dateOfBirth: '',
    address: '',
    verificationCode: '',
    idType: 'nationalId' as 'passport' | 'nationalId' | 'drivingLicense'
  });

  // Phone verification states
  const [recaptchaVerifier, setRecaptchaVerifier] = useState<any>(null);
  const [confirmationResult, setConfirmationResult] = useState<any>(null);
  const [phoneVerificationSent, setPhoneVerificationSent] = useState(false);

  // ID upload state
  const [idImageFile, setIdImageFile] = useState<File | null>(null);
  const [idImagePreview, setIdImagePreview] = useState<string | null>(null);

  const verificationSteps: VerificationStep[] = [
    {
      id: 'profile',
      name: 'Complete Profile',
      description: 'Provide your personal information',
      completed: userProfile?.fullName ? true : false,
      required: true
    },
    {
      id: 'email',
      name: 'Verify Email',
      description: 'Confirm your email address',
      completed: userProfile?.isEmailVerified || false,
      required: true
    },
    {
      id: 'phone',
      name: 'Verify Phone',
      description: 'Confirm your phone number',
      completed: userProfile?.isPhoneVerified || false,
      required: true
    },
    {
      id: 'id',
      name: 'ID Verification',
      description: 'Upload government-issued ID',
      completed: userProfile?.isIdVerified || false,
      required: false
    }
  ];

  const loadUserProfile = useCallback(async () => {
    if (!user) return;
    
    try {
      const profile = await getUserProfile(user.uid);
      setUserProfile(profile);
      
      if (profile && profile.votingEligible) {
        onVerificationComplete(profile);
      }
    } catch (error) {
      console.error('Error loading user profile:', error);
    }
  }, [user, onVerificationComplete]);

  useEffect(() => {
    if (user) {
      loadUserProfile();
    }
  }, [user, loadUserProfile]);

  useEffect(() => {
    if (typeof window !== 'undefined' && !recaptchaVerifier) {
      try {
        const verifier = setupPhoneVerification('recaptcha-container');
        setRecaptchaVerifier(verifier);
      } catch (error) {
        console.error('Error setting up reCAPTCHA:', error);
      }
    }
  }, [recaptchaVerifier]); // Include recaptchaVerifier in dependencies

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCreateProfile = async () => {
    if (!user) return;
    
    setLoading(true);
    setError(null);
    
    try {
      // Validate required fields
      if (!formData.fullName || !formData.phoneNumber) {
        throw new Error('Please fill in all required fields');
      }

      // Check for duplicate national ID if provided
      if (formData.nationalId) {
        const isDuplicate = await checkDuplicateNationalId(formData.nationalId);
        if (isDuplicate) {
          throw new Error('This National ID is already registered');
        }
      }

      const profile = await createUserProfile(user, {
        fullName: formData.fullName,
        phoneNumber: formData.phoneNumber,
        nationalId: formData.nationalId,
        dateOfBirth: formData.dateOfBirth,
        address: formData.address
      });

      setUserProfile(profile);
      setSuccess('Profile created successfully!');
      setCurrentStep(1);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSendEmailVerification = async () => {
    if (!user) return;
    
    setLoading(true);
    setError(null);
    
    try {
      await sendEmailVerificationToUser(user);
      setSuccess('Verification email sent! Please check your inbox.');
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSendPhoneVerification = async () => {
    if (!recaptchaVerifier || !formData.phoneNumber) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const confirmation = await sendPhoneVerificationCode(
        formData.phoneNumber,
        recaptchaVerifier
      );
      setConfirmationResult(confirmation);
      setPhoneVerificationSent(true);
      setSuccess('Verification code sent to your phone!');
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyPhoneCode = async () => {
    if (!confirmationResult || !formData.verificationCode) return;
    
    setLoading(true);
    setError(null);
    
    try {
      await verifyPhoneCode(confirmationResult, formData.verificationCode);
      await loadUserProfile();
      setSuccess('Phone verified successfully!');
      setCurrentStep(3);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIdImageFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setIdImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmitIdVerification = async () => {
    if (!user || !idImageFile || !formData.nationalId) return;
    
    setLoading(true);
    setError(null);
    
    try {
      // In a real implementation, you would upload the image to Firebase Storage
      // and get the URL. For now, we'll use a placeholder URL
      const imageUrl = 'placeholder-url';
      
      await submitIdVerification(
        user.uid,
        formData.nationalId,
        formData.idType,
        imageUrl
      );
      
      setSuccess('ID verification submitted for review!');
      await loadUserProfile();
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const checkEligibility = async () => {
    if (!user) return;
    
    try {
      const eligibility = await checkVotingEligibility(user.uid);
      if (eligibility.eligible) {
        setSuccess('You are eligible to vote!');
        if (userProfile) {
          onVerificationComplete(userProfile);
        }
      } else {
        setError(eligibility.reason || 'You are not eligible to vote');
      }
    } catch (error: any) {
      setError(error.message);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0: // Profile Creation
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Complete Your Profile</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                name="fullName"
                placeholder="Full Name *"
                value={formData.fullName}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                required
              />
              <input
                type="tel"
                name="phoneNumber"
                placeholder="Phone Number *"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                required
              />
              <input
                type="text"
                name="nationalId"
                placeholder="National ID (Optional)"
                value={formData.nationalId}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="date"
                name="dateOfBirth"
                placeholder="Date of Birth"
                value={formData.dateOfBirth}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                name="address"
                placeholder="Address (Optional)"
                value={formData.address}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 md:col-span-2"
              />
            </div>
            <button
              onClick={handleCreateProfile}
              disabled={loading}
              className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? 'Creating Profile...' : 'Create Profile'}
            </button>
          </div>
        );

      case 1: // Email Verification
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Verify Your Email</h3>
            <p className="text-gray-600">
              We need to verify your email address: {user?.email}
            </p>
            {user?.emailVerified ? (
              <div className="text-green-600 font-semibold">
                ✓ Email already verified!
              </div>
            ) : (
              <button
                onClick={handleSendEmailVerification}
                disabled={loading}
                className="w-full bg-green-600 text-white p-3 rounded-lg hover:bg-green-700 disabled:opacity-50"
              >
                {loading ? 'Sending...' : 'Send Verification Email'}
              </button>
            )}
            <button
              onClick={() => setCurrentStep(2)}
              className="w-full bg-gray-600 text-white p-3 rounded-lg hover:bg-gray-700"
            >
              Continue to Phone Verification
            </button>
          </div>
        );

      case 2: // Phone Verification
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Verify Your Phone Number</h3>
            <div id="recaptcha-container"></div>
            
            {!phoneVerificationSent ? (
              <div>
                <p className="text-gray-600 mb-4">
                  Phone: {formData.phoneNumber}
                </p>
                <button
                  onClick={handleSendPhoneVerification}
                  disabled={loading}
                  className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 disabled:opacity-50"
                >
                  {loading ? 'Sending Code...' : 'Send Verification Code'}
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <input
                  type="text"
                  name="verificationCode"
                  placeholder="Enter 6-digit code"
                  value={formData.verificationCode}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  maxLength={6}
                />
                <button
                  onClick={handleVerifyPhoneCode}
                  disabled={loading}
                  className="w-full bg-green-600 text-white p-3 rounded-lg hover:bg-green-700 disabled:opacity-50"
                >
                  {loading ? 'Verifying...' : 'Verify Code'}
                </button>
              </div>
            )}
            
            <button
              onClick={() => setCurrentStep(3)}
              className="w-full bg-gray-600 text-white p-3 rounded-lg hover:bg-gray-700"
            >
              Skip to ID Verification
            </button>
          </div>
        );

      case 3: // ID Verification
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">ID Verification (Optional)</h3>
            <p className="text-gray-600">
              Upload a government-issued ID for enhanced security
            </p>
            
            <select
              name="idType"
              value={formData.idType}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="nationalId">National ID</option>
              <option value="passport">Passport</option>
              <option value="drivingLicense">Driving License</option>
            </select>

            <div className="border-2 border-dashed border-gray-300 p-6 rounded-lg text-center">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                id="id-upload"
              />
              <label
                htmlFor="id-upload"
                className="cursor-pointer text-blue-600 hover:text-blue-700"
              >
                {idImagePreview ? (
                  <Image
                    src={idImagePreview}
                    alt="ID Preview"
                    width={400}
                    height={256}
                    className="max-w-full max-h-64 mx-auto"
                  />
                ) : (
                  <div>
                    <div className="text-4xl mb-2">📄</div>
                    <p>Click to upload ID image</p>
                  </div>
                )}
              </label>
            </div>

            <button
              onClick={handleSubmitIdVerification}
              disabled={loading || !idImageFile}
              className="w-full bg-purple-600 text-white p-3 rounded-lg hover:bg-purple-700 disabled:opacity-50"
            >
              {loading ? 'Submitting...' : 'Submit ID Verification'}
            </button>

            <button
              onClick={checkEligibility}
              className="w-full bg-green-600 text-white p-3 rounded-lg hover:bg-green-700"
            >
              Check Voting Eligibility
            </button>
          </div>
        );

      default:
        return null;
    }
  };

  if (!user) {
    return (
      <div className="text-center p-8">
        <p className="text-gray-600">Please sign in to continue with verification</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-center mb-8">Account Verification</h2>
      
      {/* Progress Steps */}
      <div className="flex justify-between items-center mb-8">
        {verificationSteps.map((step, index) => (
          <div
            key={step.id}
            className={`flex flex-col items-center ${
              index <= currentStep ? 'text-blue-600' : 'text-gray-400'
            }`}
          >
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold mb-2 ${
                step.completed
                  ? 'bg-green-500'
                  : index <= currentStep
                  ? 'bg-blue-600'
                  : 'bg-gray-400'
              }`}
            >
              {step.completed ? '✓' : index + 1}
            </div>
            <div className="text-center">
              <div className="font-semibold text-sm">{step.name}</div>
              <div className="text-xs">{step.description}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Current Step Content */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        {renderStepContent()}
      </div>

      {/* Messages */}
      {error && (
        <div className="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
          {error}
        </div>
      )}
      
      {success && (
        <div className="mt-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
          {success}
        </div>
      )}

      {/* Verification Status */}
      {userProfile && (
        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <h4 className="font-semibold mb-2">Verification Status</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <span className="font-medium">Email:</span>
              <span className={userProfile.isEmailVerified ? 'text-green-600 ml-1' : 'text-red-600 ml-1'}>
                {userProfile.isEmailVerified ? '✓ Verified' : '✗ Pending'}
              </span>
            </div>
            <div>
              <span className="font-medium">Phone:</span>
              <span className={userProfile.isPhoneVerified ? 'text-green-600 ml-1' : 'text-red-600 ml-1'}>
                {userProfile.isPhoneVerified ? '✓ Verified' : '✗ Pending'}
              </span>
            </div>
            <div>
              <span className="font-medium">ID:</span>
              <span className={userProfile.isIdVerified ? 'text-green-600 ml-1' : 'text-yellow-600 ml-1'}>
                {userProfile.isIdVerified ? '✓ Verified' : '○ Optional'}
              </span>
            </div>
            <div>
              <span className="font-medium">Level:</span>
              <span className="ml-1 capitalize font-semibold">
                {userProfile.verificationLevel}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VerificationProcess;
