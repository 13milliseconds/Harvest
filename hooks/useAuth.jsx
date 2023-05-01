import { useState } from "react"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged} from "firebase/auth";
import { auth } from '../firebaseConfig';

export const useSignIn =  () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const signIn = async(values) => {
    setLoading(true)
    signInWithEmailAndPassword(auth, values.email, values.password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        console.log(user.uid)
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setError(`Error #${errorCode}: ${errorMessage}`)
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
    //TODO: figure out why this runs forever
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
              console.log(user.uid)
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                setError(`Error #${errorCode}: ${errorMessage}`)
            });
  }

  return [
    loading,
    error,
    signUp
  ]
};

export const useAuthState = () => {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [user, setUser] = useState(null)

  onAuthStateChanged(auth, (user) => {
    setLoading(false)

    if (user) {
      const uid = user.uid;
      setUser(user)
    } else {
      setUser(null)
      setError('No user logged in')
    }
  });
  

  return[
    loading, 
    error, 
    user
  ]
}