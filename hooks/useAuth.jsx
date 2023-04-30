import { authDispatchContext } from '../context/authContext'
import {authActions} from '../context/authReducer'
import { useState, useContext } from "react"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword} from "firebase/auth";
import { auth } from '../firebaseConfig';

export const useSignIn =  () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const dispatch = useContext(authDispatchContext)

  const signIn = async(values) => {
    setLoading(true)
    signInWithEmailAndPassword(auth, values.email, values.password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        dispatch({
          type: authActions.SIGNIN,
          payload: {
              user
          }
        })
        // ...
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

export const useSignUp =  () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const dispatch = useContext(authDispatchContext)

  const signUp = async(values) => {
    setLoading(true)
    createUserWithEmailAndPassword(auth, values.email, values.password)
            .then((userCredential) => {
              // Signed in 
              setLoading(false)
              const user = userCredential.user;
              dispatch({
                type: authActions.SIGNIN,
                payload: {
                    user
                }
              })
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