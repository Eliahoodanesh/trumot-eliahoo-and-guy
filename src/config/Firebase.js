// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"; // Function to initialize Firebase app
import { getAnalytics } from "firebase/analytics"; // Function to enable Firebase Analytics
import { getFirestore, collection, getDocs } from "firebase/firestore"; // Firestore functions for database operations
import { getAuth } from 'firebase/auth'; // Function to handle Firebase Authentication
import { getStorage } from 'firebase/storage'; // Function to handle Firebase Storage

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDq--oOT-g45hVIxlF0xRA_QX0RpQm8WKE", // Your Firebase API key
  authDomain: "trumot-79f1b.firebaseapp.com", // Your Firebase app's authentication domain
  projectId: "trumot-79f1b", // Your Firebase project ID
  storageBucket: "trumot-79f1b.appspot.com", // Your Firebase Storage bucket
  messagingSenderId: "152578413143", // Sender ID for Cloud Messaging
  appId: "1:152578413143:web:1f0903530189f92e6f4912", // Unique identifier for the app
  measurementId: "G-DH16EW6GRM" // Measurement ID for Google Analytics
};

// Initialize Firebase
const app = initializeApp(firebaseConfig); // Initialize Firebase app with configuration
const analytics = getAnalytics(app); // Enable Firebase Analytics for the app
export const firestore = getFirestore(app); // Initialize Firestore and export the instance
export const auth = getAuth(app); // Initialize Firebase Authentication and export the instance
export const storage = getStorage(app); // Initialize Firebase Storage and export the instance
export { collection, getDocs }; // Export Firestore functions for use in other modules

export const db = getFirestore(app); // Export another reference to Firestore (optional)
export const imageDb = getStorage(app); // Export another reference to Firebase Storage (optional)
