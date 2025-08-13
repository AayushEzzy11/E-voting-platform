// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD1Ut7pgCPkYybSD90V6z22DqEnkd3uU4w",
  authDomain: "e-voting-platform-9dee0.firebaseapp.com",
  databaseURL: "https://e-voting-platform-9dee0-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "e-voting-platform-9dee0",
  storageBucket: "e-voting-platform-9dee0.firebasestorage.app",
  messagingSenderId: "545731276638",
  appId: "1:545731276638:web:9fd185d632aaa6244769cf",
  measurementId: "G-KBNYETZJ55"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export { app, analytics };

