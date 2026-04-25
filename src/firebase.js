// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import {getAuth} from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDWZoheijcvqe_nNuqZWP6-uFbwDMuVrd8",
  authDomain: "real-time-chat-app-e1d29.firebaseapp.com",
  projectId: "real-time-chat-app-e1d29",
  storageBucket: "real-time-chat-app-e1d29.firebasestorage.app",
  messagingSenderId: "777899183065",
  appId: "1:777899183065:web:d106d089e6c71f51c5a7c8",
  measurementId: "G-2GY6YT844V"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

//Initialise service
export const auth = getAuth(app)
export const db = getFirestore (app)

