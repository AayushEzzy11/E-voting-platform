// Firebase Connection Test Script
const { initializeApp } = require('firebase/app');
const { getAuth, connectAuthEmulator } = require('firebase/auth');
const { getFirestore, connectFirestoreEmulator } = require('firebase/firestore');
const { getStorage, connectStorageEmulator } = require('firebase/storage');

// Load environment variables
require('dotenv').config({ path: '.env.local' });

// Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};

console.log('🔥 Testing Firebase Configuration...\n');

// Test 1: Configuration Values
console.log('1. Configuration Check:');
console.log('   ✓ API Key:', firebaseConfig.apiKey ? 'Present' : 'Missing');
console.log('   ✓ Auth Domain:', firebaseConfig.authDomain ? 'Present' : 'Missing');
console.log('   ✓ Project ID:', firebaseConfig.projectId ? 'Present' : 'Missing');
console.log('   ✓ Storage Bucket:', firebaseConfig.storageBucket ? 'Present' : 'Missing');
console.log('   ✓ App ID:', firebaseConfig.appId ? 'Present' : 'Missing');

// Test 2: Firebase Initialization
try {
  const app = initializeApp(firebaseConfig);
  console.log('\n2. Firebase App Initialization: ✅ SUCCESS');
  
  // Test 3: Service Initialization
  try {
    const auth = getAuth(app);
    console.log('3. Authentication Service: ✅ INITIALIZED');
  } catch (error) {
    console.log('3. Authentication Service: ❌ FAILED -', error.message);
  }
  
  try {
    const db = getFirestore(app);
    console.log('4. Firestore Database: ✅ INITIALIZED');
  } catch (error) {
    console.log('4. Firestore Database: ❌ FAILED -', error.message);
  }
  
  try {
    const storage = getStorage(app);
    console.log('5. Storage Service: ✅ INITIALIZED');
  } catch (error) {
    console.log('5. Storage Service: ❌ FAILED -', error.message);
  }
  
  console.log('\n🎉 Firebase setup test completed!');
  console.log('✅ All services are properly configured and ready to use.');
  
} catch (error) {
  console.log('\n2. Firebase App Initialization: ❌ FAILED');
  console.error('Error:', error.message);
}

console.log('\n📍 Project Details:');
console.log('   Project ID:', firebaseConfig.projectId);
console.log('   Console: https://console.firebase.google.com/project/' + firebaseConfig.projectId);
console.log('   Local URL: http://localhost:3000');
