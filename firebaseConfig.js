import { initializeApp, getApps, getApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore';
import { getAnalytics } from "firebase/analytics";
import { getAuth, signOut } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_APIKEY,
  authDomain: "seedtofruit-54552.firebaseapp.com",
  projectId: "seedtofruit-54552",
  storageBucket: "seedtofruit-54552.appspot.com",
  messagingSenderId: "361588411403",
  appId: "1:361588411403:web:0b0889bb7765631e9d8b0e",
  measurementId: "G-4RF7G9YF4V"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
// const analytics = getAnalytics(app);
const db = getFirestore(app)
const auth = getAuth(app)

export {app, db, auth}