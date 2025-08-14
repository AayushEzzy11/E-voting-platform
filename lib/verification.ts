import { 
  sendEmailVerification,
  User,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  ConfirmationResult
} from "firebase/auth";
import { 
  collection, 
  doc, 
  setDoc, 
  getDoc, 
  updateDoc, 
  serverTimestamp,
  query,
  where,
  getDocs,
  addDoc
} from "firebase/firestore";
import { auth, db } from "./firebase";

// User Profile Interface
export interface UserProfile {
  uid: string;
  email: string;
  phoneNumber?: string;
  fullName: string;
  nationalId?: string;
  dateOfBirth?: string;
  address?: string;
  profilePicture?: string;
  isEmailVerified: boolean;
  isPhoneVerified: boolean;
  isIdVerified: boolean;
  verificationLevel: 'basic' | 'standard' | 'premium';
  registrationDate: any;
  lastLogin?: any;
  votingEligible: boolean;
  hasVoted: boolean;
}

// Verification Code Interface
export interface VerificationCode {
  code: string;
  type: 'email' | 'phone' | 'id';
  userId: string;
  expiresAt: any;
  verified: boolean;
  createdAt: any;
}

// ID Verification Interface
export interface IdVerification {
  userId: string;
  nationalId: string;
  idType: 'passport' | 'nationalId' | 'drivingLicense';
  documentImageUrl: string;
  status: 'pending' | 'approved' | 'rejected';
  submittedAt: any;
  reviewedAt?: any;
  reviewedBy?: string;
  rejectionReason?: string;
}

// 1. EMAIL VERIFICATION
export const sendEmailVerificationToUser = async (user: User) => {
  try {
    await sendEmailVerification(user);
    console.log("Verification email sent successfully");
    return true;
  } catch (error) {
    console.error("Error sending verification email:", error);
    throw error;
  }
};

// 2. PHONE VERIFICATION SETUP
export const setupPhoneVerification = (elementId: string) => {
  try {
    const recaptchaVerifier = new RecaptchaVerifier(auth, elementId, {
      'size': 'normal',
      'callback': () => {
        console.log("reCAPTCHA solved");
      },
      'expired-callback': () => {
        console.log("reCAPTCHA expired");
      }
    });
    return recaptchaVerifier;
  } catch (error) {
    console.error("Error setting up phone verification:", error);
    throw error;
  }
};

// 3. SEND PHONE VERIFICATION CODE
export const sendPhoneVerificationCode = async (
  phoneNumber: string, 
  recaptchaVerifier: RecaptchaVerifier
): Promise<ConfirmationResult> => {
  try {
    const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, recaptchaVerifier);
    return confirmationResult;
  } catch (error) {
    console.error("Error sending phone verification code:", error);
    throw error;
  }
};

// 4. VERIFY PHONE CODE
export const verifyPhoneCode = async (
  confirmationResult: ConfirmationResult, 
  code: string
) => {
  try {
    const result = await confirmationResult.confirm(code);
    return result;
  } catch (error) {
    console.error("Error verifying phone code:", error);
    throw error;
  }
};

// 5. CREATE USER PROFILE WITH VERIFICATION STATUS
export const createUserProfile = async (
  user: User, 
  additionalData: {
    fullName: string;
    phoneNumber?: string;
    nationalId?: string;
    dateOfBirth?: string;
    address?: string;
  }
) => {
  try {
    const userProfile: UserProfile = {
      uid: user.uid,
      email: user.email || '',
      phoneNumber: additionalData.phoneNumber,
      fullName: additionalData.fullName,
      nationalId: additionalData.nationalId,
      dateOfBirth: additionalData.dateOfBirth,
      address: additionalData.address,
      isEmailVerified: user.emailVerified,
      isPhoneVerified: false,
      isIdVerified: false,
      verificationLevel: 'basic',
      registrationDate: serverTimestamp(),
      votingEligible: false,
      hasVoted: false
    };

    await setDoc(doc(db, "users", user.uid), userProfile);
    return userProfile;
  } catch (error) {
    console.error("Error creating user profile:", error);
    throw error;
  }
};

// 6. UPDATE VERIFICATION STATUS
export const updateVerificationStatus = async (
  userId: string, 
  verificationType: 'email' | 'phone' | 'id',
  status: boolean
) => {
  try {
    const updateData: any = {};
    
    switch (verificationType) {
      case 'email':
        updateData.isEmailVerified = status;
        break;
      case 'phone':
        updateData.isPhoneVerified = status;
        break;
      case 'id':
        updateData.isIdVerified = status;
        break;
    }

    // Calculate verification level
    const userDoc = await getDoc(doc(db, "users", userId));
    if (userDoc.exists()) {
      const userData = userDoc.data() as UserProfile;
      const emailVerified = verificationType === 'email' ? status : userData.isEmailVerified;
      const phoneVerified = verificationType === 'phone' ? status : userData.isPhoneVerified;
      const idVerified = verificationType === 'id' ? status : userData.isIdVerified;

      if (emailVerified && phoneVerified && idVerified) {
        updateData.verificationLevel = 'premium';
        updateData.votingEligible = true;
      } else if (emailVerified && (phoneVerified || idVerified)) {
        updateData.verificationLevel = 'standard';
        updateData.votingEligible = true;
      } else {
        updateData.verificationLevel = 'basic';
        updateData.votingEligible = false;
      }
    }

    await updateDoc(doc(db, "users", userId), updateData);
    return true;
  } catch (error) {
    console.error("Error updating verification status:", error);
    throw error;
  }
};

// 7. SUBMIT ID VERIFICATION
export const submitIdVerification = async (
  userId: string,
  nationalId: string,
  idType: 'passport' | 'nationalId' | 'drivingLicense',
  documentImageUrl: string
) => {
  try {
    const idVerification: IdVerification = {
      userId,
      nationalId,
      idType,
      documentImageUrl,
      status: 'pending',
      submittedAt: serverTimestamp()
    };

    await addDoc(collection(db, "idVerifications"), idVerification);
    return true;
  } catch (error) {
    console.error("Error submitting ID verification:", error);
    throw error;
  }
};

// 8. CHECK USER ELIGIBILITY
export const checkVotingEligibility = async (userId: string): Promise<{
  eligible: boolean;
  reason?: string;
  verificationLevel: string;
}> => {
  try {
    const userDoc = await getDoc(doc(db, "users", userId));
    
    if (!userDoc.exists()) {
      return {
        eligible: false,
        reason: "User profile not found",
        verificationLevel: 'none'
      };
    }

    const userData = userDoc.data() as UserProfile;

    // Check if user has already voted
    if (userData.hasVoted) {
      return {
        eligible: false,
        reason: "User has already voted",
        verificationLevel: userData.verificationLevel
      };
    }

    // Check verification level
    if (!userData.votingEligible) {
      return {
        eligible: false,
        reason: "Insufficient verification level. Please complete email and phone/ID verification.",
        verificationLevel: userData.verificationLevel
      };
    }

    // Check if user is within voting age (18+)
    if (userData.dateOfBirth) {
      const birthDate = new Date(userData.dateOfBirth);
      const today = new Date();
      const age = today.getFullYear() - birthDate.getFullYear();
      
      if (age < 18) {
        return {
          eligible: false,
          reason: "User must be 18 years or older to vote",
          verificationLevel: userData.verificationLevel
        };
      }
    }

    return {
      eligible: true,
      verificationLevel: userData.verificationLevel
    };
  } catch (error) {
    console.error("Error checking voting eligibility:", error);
    throw error;
  }
};

// 9. GENERATE VERIFICATION CODE
export const generateVerificationCode = async (
  userId: string,
  type: 'email' | 'phone' | 'id'
): Promise<string> => {
  try {
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    
    const verificationData: VerificationCode = {
      code,
      type,
      userId,
      expiresAt: new Date(Date.now() + 10 * 60 * 1000), // 10 minutes
      verified: false,
      createdAt: serverTimestamp()
    };

    await addDoc(collection(db, "verificationCodes"), verificationData);
    return code;
  } catch (error) {
    console.error("Error generating verification code:", error);
    throw error;
  }
};

// 10. VERIFY CODE
export const verifyCode = async (
  userId: string,
  code: string,
  type: 'email' | 'phone' | 'id'
): Promise<boolean> => {
  try {
    const codesRef = collection(db, "verificationCodes");
    const q = query(
      codesRef,
      where("userId", "==", userId),
      where("code", "==", code),
      where("type", "==", type),
      where("verified", "==", false)
    );
    
    const querySnapshot = await getDocs(q);
    
    if (querySnapshot.empty) {
      return false;
    }

    const codeDoc = querySnapshot.docs[0];
    const codeData = codeDoc.data() as VerificationCode;

    // Check if code has expired
    const now = new Date();
    const expiresAt = codeData.expiresAt.toDate();
    
    if (now > expiresAt) {
      return false;
    }

    // Mark code as verified
    await updateDoc(doc(db, "verificationCodes", codeDoc.id), {
      verified: true
    });

    // Update user verification status
    await updateVerificationStatus(userId, type, true);

    return true;
  } catch (error) {
    console.error("Error verifying code:", error);
    throw error;
  }
};

// 11. GET USER PROFILE
export const getUserProfile = async (userId: string): Promise<UserProfile | null> => {
  try {
    const userDoc = await getDoc(doc(db, "users", userId));
    
    if (userDoc.exists()) {
      return userDoc.data() as UserProfile;
    }
    
    return null;
  } catch (error) {
    console.error("Error getting user profile:", error);
    throw error;
  }
};

// 12. CHECK DUPLICATE NATIONAL ID
export const checkDuplicateNationalId = async (nationalId: string): Promise<boolean> => {
  try {
    const usersRef = collection(db, "users");
    const q = query(usersRef, where("nationalId", "==", nationalId));
    const querySnapshot = await getDocs(q);
    
    return !querySnapshot.empty;
  } catch (error) {
    console.error("Error checking duplicate national ID:", error);
    throw error;
  }
};
