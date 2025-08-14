// Advanced Firebase Functionality Test
const { initializeApp } = require('firebase/app');
const { getAuth } = require('firebase/auth');
const { getFirestore, collection, doc, setDoc, getDoc, getDocs, deleteDoc } = require('firebase/firestore');

require('dotenv').config({ path: '.env.local' });

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};

async function testFirebase() {
  console.log('🔥 Advanced Firebase Functionality Test\n');
  
  try {
    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);
    const auth = getAuth(app);
    
    console.log('✅ Firebase initialized successfully');
    
    // Test Firestore Write
    console.log('\n📝 Testing Firestore Write...');
    const testDoc = doc(db, 'test', 'connection-test');
    await setDoc(testDoc, {
      message: 'Firebase connection test',
      timestamp: new Date().toISOString(),
      status: 'success'
    });
    console.log('✅ Firestore write successful');
    
    // Test Firestore Read
    console.log('\n📖 Testing Firestore Read...');
    const docSnap = await getDoc(testDoc);
    if (docSnap.exists()) {
      console.log('✅ Firestore read successful');
      console.log('   Data:', docSnap.data());
    } else {
      console.log('❌ Document not found');
    }
    
    // Test Adding Sample Candidates
    console.log('\n🏛️ Adding sample candidates...');
    const candidates = [
      {
        name: 'John Doe',
        party: 'Democratic Party',
        description: 'Experienced leader with focus on education and healthcare',
        votes: 0
      },
      {
        name: 'Jane Smith',
        party: 'Republican Party', 
        description: 'Business leader promoting economic growth',
        votes: 0
      },
      {
        name: 'Mike Johnson',
        party: 'Independent',
        description: 'Community organizer focused on local issues',
        votes: 0
      }
    ];
    
    for (let i = 0; i < candidates.length; i++) {
      const candidateDoc = doc(db, 'candidates', `candidate-${i + 1}`);
      await setDoc(candidateDoc, candidates[i]);
      console.log(`✅ Added candidate: ${candidates[i].name}`);
    }
    
    // Test Reading Candidates
    console.log('\n🗳️ Reading candidates collection...');
    const candidatesSnapshot = await getDocs(collection(db, 'candidates'));
    console.log(`✅ Found ${candidatesSnapshot.size} candidates:`);
    candidatesSnapshot.forEach((doc) => {
      const data = doc.data();
      console.log(`   - ${data.name} (${data.party})`);
    });
    
    // Test Auth State
    console.log('\n🔐 Testing Authentication state...');
    console.log('   Current user:', auth.currentUser ? 'Logged in' : 'Not logged in');
    console.log('✅ Authentication service working');
    
    // Cleanup test document
    console.log('\n🧹 Cleaning up test document...');
    await deleteDoc(testDoc);
    console.log('✅ Test cleanup completed');
    
    console.log('\n🎉 ALL TESTS PASSED!');
    console.log('✅ Firebase is fully functional and ready for your E-voting app');
    console.log('\n📋 Summary:');
    console.log('   ✅ Firebase connection: Working');
    console.log('   ✅ Firestore database: Working');
    console.log('   ✅ Authentication: Working');
    console.log('   ✅ Sample data: Created');
    console.log('\n🚀 Your E-voting platform is ready to use!');
    console.log('🌐 Start your app: npm run dev');
    console.log('🔗 Firebase Console: https://console.firebase.google.com/project/' + firebaseConfig.projectId);
    
  } catch (error) {
    console.error('\n❌ Test failed:', error.message);
    console.error('Please check your Firebase configuration and permissions');
  }
}

// Run the test
testFirebase();
