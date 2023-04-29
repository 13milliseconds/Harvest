import { initializeApp, getApps, getApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore';
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: "AIzaSyCr7Svq5iaSbM-7TrJTs6HgUCwGOmBexUo",
  authDomain: "seedtofruit-54552.firebaseapp.com",
  projectId: "seedtofruit-54552",
  storageBucket: "seedtofruit-54552.appspot.com",
  messagingSenderId: "361588411403",
  appId: "1:361588411403:web:0b0889bb7765631e9d8b0e",
  measurementId: "G-4RF7G9YF4V"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
//const analytics = getAnalytics(app);
const db = getFirestore(app);

export {app, db}