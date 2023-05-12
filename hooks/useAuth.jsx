import { useState } from "react"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged} from "firebase/auth";
import { db, auth } from "../context/authContext";
import { doc, setDoc } from '@firebase/firestore';

export const useSignIn =  () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const signIn = async(values) => {
    setLoading(true)
    setError('')
    signInWithEmailAndPassword(auth, values.email, values.password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setLoading(false)
        setError({
          log: `Error #${errorCode}: ${errorMessage}`,
          status: true
        })
      });
  }

  return [
    loading,
    error,
    signIn
  ]
};


export const useSignOut =  () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  
  const signOut =  async () => {
    setLoading(true)
    console.log('signing out')

    signOut(auth)
    .then(() => {
      setLoading(false)
    })
    .catch((e) => {
      setError('There was an error signing out')
      console.log(e)
      setLoading(false)
    });
  }

  return [
    loading,
    error,
    signOut
  ]
};



export const useSignUp = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const signUp = async(values) => {
    setLoading(true)
    createUserWithEmailAndPassword(auth, values.email, values.password)
            .then((userCredential) => {
              // Signed in 
              setLoading(false)
              const user = userCredential.user;
              
              // Create a user profile
              const docRef = setDoc(doc(db, 'users', user.uid), {
                email: user.email
              }, { merge: true })
              
            })
            .catch((error) => {
              const errorCode = error.code;
              const errorMessage = error.message;
              setLoading(false)
              setError({
                code: errorCode,
                log: `Error #${errorCode}: ${errorMessage}`,
                status: true
              })
            });
  }

  return [
    loading,
    error,
    signUp
  ]
};

export const useAuthState = () => {
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null)

  if(auth) onAuthStateChanged(auth, (user) => {
      setLoading(true)
    if (user) {
      setUser(user)
      setLoading(false)
    } else {
      setUser(null)
      setLoading(false)
      setError('No user logged in')
    }
  });
  
  return[
    loading,    
    error, 
    user
  ]
}
