// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA1zTXUKIlGXhxyp9nwvIW5QmeZqx88MZY",
  authDomain: "movie-review-app-31c28.firebaseapp.com",
  projectId: "movie-review-app-31c28",
  storageBucket: "movie-review-app-31c28.firebasestorage.app",
  messagingSenderId: "115168287659",
  appId: "1:115168287659:web:3827b7c7d106aa446450ee",
  measurementId: "G-Q83PX3DRX0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
