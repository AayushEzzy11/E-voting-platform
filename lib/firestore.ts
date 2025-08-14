import { 
  collection, 
  doc, 
  addDoc, 
  updateDoc, 
  getDoc, 
  getDocs, 
  query, 
  where,
  serverTimestamp 
} from "firebase/firestore";
import { db } from "./firebase";

// Enhanced Vote interface with verification data
export interface Vote {
  id?: string;
  userId: string;
  candidateId: string;
  candidateName: string;
  timestamp: any;
  verified: boolean;
  verificationLevel?: string;
  ipAddress?: string;
  userAgent?: string;
  voteHash?: string;
}

// Candidate interface
export interface Candidate {
  id?: string;
  name: string;
  party: string;
  description: string;
  imageUrl?: string;
  votes: number;
}

// Cast a vote with enhanced verification
export const castVote = async (userId: string, candidateId: string, candidateName: string) => {
  try {
    // Check user eligibility first
    const { checkVotingEligibility } = await import('./verification');
    const eligibility = await checkVotingEligibility(userId);
    
    if (!eligibility.eligible) {
      throw new Error(eligibility.reason || 'User is not eligible to vote');
    }

    // Check if user has already voted
    const votesRef = collection(db, "votes");
    const q = query(votesRef, where("userId", "==", userId));
    const existingVotes = await getDocs(q);
    
    if (!existingVotes.empty) {
      throw new Error("User has already voted");
    }

    // Add the vote with enhanced data
    const voteData: Omit<Vote, 'id'> = {
      userId,
      candidateId,
      candidateName,
      timestamp: serverTimestamp(),
      verified: true,
      verificationLevel: eligibility.verificationLevel,
      ipAddress: 'client-side', // In a real app, get this server-side
      userAgent: navigator.userAgent
    };
    
    const docRef = await addDoc(collection(db, "votes"), voteData);
    
    // Update candidate vote count
    const candidateRef = doc(db, "candidates", candidateId);
    const candidateDoc = await getDoc(candidateRef);
    
    if (candidateDoc.exists()) {
      const currentVotes = candidateDoc.data().votes || 0;
      await updateDoc(candidateRef, {
        votes: currentVotes + 1
      });
    }
    
    // Mark user as voted
    await updateDoc(doc(db, "users", userId), {
      hasVoted: true,
      voteTimestamp: serverTimestamp()
    });
    
    return docRef.id;
  } catch (error) {
    throw error;
  }
};

// Get all candidates
export const getCandidates = async (): Promise<Candidate[]> => {
  try {
    const querySnapshot = await getDocs(collection(db, "candidates"));
    const candidates: Candidate[] = [];
    
    querySnapshot.forEach((doc) => {
      candidates.push({
        id: doc.id,
        ...doc.data()
      } as Candidate);
    });
    
    return candidates;
  } catch (error) {
    throw error;
  }
};

// Add a new candidate (admin only)
export const addCandidate = async (candidate: Omit<Candidate, 'id' | 'votes'>) => {
  try {
    const candidateData = {
      ...candidate,
      votes: 0
    };
    
    const docRef = await addDoc(collection(db, "candidates"), candidateData);
    return docRef.id;
  } catch (error) {
    throw error;
  }
};

// Get voting results
export const getVotingResults = async () => {
  try {
    const candidates = await getCandidates();
    const votesSnapshot = await getDocs(collection(db, "votes"));
    
    return {
      totalVotes: votesSnapshot.size,
      candidates: candidates.sort((a, b) => b.votes - a.votes)
    };
  } catch (error) {
    throw error;
  }
};

// Check if user has voted
export const hasUserVoted = async (userId: string): Promise<boolean> => {
  try {
    const votesRef = collection(db, "votes");
    const q = query(votesRef, where("userId", "==", userId));
    const querySnapshot = await getDocs(q);
    
    return !querySnapshot.empty;
  } catch (error) {
    throw error;
  }
};
