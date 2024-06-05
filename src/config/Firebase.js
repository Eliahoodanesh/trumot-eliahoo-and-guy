// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDq--oOT-g45hVIxlF0xRA_QX0RpQm8WKE",
  authDomain: "trumot-79f1b.firebaseapp.com",
  projectId: "trumot-79f1b",
  storageBucket: "trumot-79f1b.appspot.com",
  messagingSenderId: "152578413143",
  appId: "1:152578413143:web:1f0903530189f92e6f4912",
  measurementId: "G-DH16EW6GRM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const firestore = getFirestore(app); // Correct import path for getFirestore
export const auth = getAuth(app);
