// Firebase Test with Anonymous Authentication
const { initializeApp } = require('firebase/app');
const { getAuth, signInAnonymously, signOut } = require('firebase/auth');
const { getFirestore, collection, doc, setDoc, getDoc, getDocs } = require('firebase/firestore');

require('dotenv').config({ path: '.env.local' });

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};

async function testFirebaseWithAuth() {
  console.log('🔥 Firebase Test with Authentication\n');
  
  try {
    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);
    const auth = getAuth(app);
    
    console.log('✅ Firebase initialized successfully');
    
    // Test Anonymous Authentication
    console.log('\n🔐 Testing Anonymous Authentication...');
    try {
      const userCredential = await signInAnonymously(auth);
      console.log('✅ Anonymous sign-in successful');
      console.log('   User ID:', userCredential.user.uid);
      
      // Now test Firestore with authentication
      console.log('\n📝 Testing Firestore with authenticated user...');
      const testDoc = doc(db, 'test', 'auth-test');
      await setDoc(testDoc, {
        message: 'Authenticated test',
        userId: userCredential.user.uid,
        timestamp: new Date().toISOString()
      });
      console.log('✅ Firestore write with authentication successful');
      
      // Test read
      const docSnap = await getDoc(testDoc);
      if (docSnap.exists()) {
        console.log('✅ Firestore read successful');
        console.log('   Data:', docSnap.data());
      }
      
      // Test adding candidates
      console.log('\n🏛️ Testing candidate creation...');
      const candidateDoc = doc(db, 'candidates', 'test-candidate');
      await setDoc(candidateDoc, {
        name: 'Test Candidate',
        party: 'Test Party',
        description: 'This is a test candidate',
        votes: 0
      });
      console.log('✅ Candidate creation successful');
      
      // Sign out
      console.log('\n🚪 Signing out...');
      await signOut(auth);
      console.log('✅ Sign out successful');
      
      console.log('\n🎉 ALL AUTHENTICATION TESTS PASSED!');
      
    } catch (authError) {
      console.log('❌ Authentication failed:', authError.message);
      console.log('\n💡 This might be because Anonymous Authentication is not enabled.');
      console.log('   Please enable it in the Firebase Console:');
      console.log('   https://console.firebase.google.com/project/' + firebaseConfig.projectId + '/authentication/providers');
    }
    
  } catch (error) {
    console.error('\\n❌ Test failed:', error.message);
  }
}

// Run the test
testFirebaseWithAuth();
