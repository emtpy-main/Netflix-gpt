// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAYfMxPqi5s_nO6mT1PwVxb0wAla4ZReqU",
  authDomain: "netflixgpt-fe343.firebaseapp.com",
  projectId: "netflixgpt-fe343",
  storageBucket: "netflixgpt-fe343.firebasestorage.app",
  messagingSenderId: "59733765448",
  appId: "1:59733765448:web:bff3b872efeb3d075e577d",
  measurementId: "G-21EXNDYKJN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();