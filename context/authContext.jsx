import React, { createContext, useEffect, useContext, useState } from 'react'
import { initializeApp, getApps, getApp } from "firebase/app"
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth"
import {getFirestore} from 'firebase/firestore'


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
const auth = getAuth(app)
const db = getFirestore(app)

const AuthContext = createContext({
  user: null, 
  loading: true
});

const AuthContextProvider = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(() => {
      const user = auth.currentUser;
      return user;
    });
  
    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, firebaseUser => {
        console.log('in AUTH', firebaseUser)
        setLoading(true);
        if (firebaseUser) {
          setUser(firebaseUser)
          setLoading(false);
        } else {
          setUser(null)
          setLoading(false);
        }
      })
      return () => unsubscribe()
    }, [])
  
    return <AuthContext.Provider value={{user, loading}}>{children}</AuthContext.Provider>
  }

const useAuth = () => {
    return useContext(AuthContext)
};

const logout = () => {
  signOut(auth)
}

export {
    app,
    db, 
    auth,
    AuthContextProvider,
    useAuth,
    logout
}