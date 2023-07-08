import { dbDispatchContext } from '@/context/databaseContext';
import {dbActions} from '@/context/databaseReducer'
import { useState, useContext } from "react";
import { deleteUser } from '@firebase/auth'
import {db, auth} from '@/context/authContext'
import { 
  doc, 
  collection, 
  getDoc, 
  getDocs,
  addDoc,
  deleteDoc 
} from '@firebase/firestore'

export const useGetDocuments = (type) => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useContext(dbDispatchContext)

  const getDocuments = async () => {
    
    try {
      setLoading(true)
      const col = collection(db, type)
      const snapshot = await getDocs(col)
      const list = snapshot.docs.map(doc => {
        return {id: doc.id, data: doc.data()}
      })

      dispatch({
        type: dbActions.LOAD_DOCUMENTS,
        payload: {
          documents: list,
          type
        }
        })
    } catch (err) {
      setError(err.message || "Unexpected Error!");
    } finally {
      setLoading(false)
    }
  }

  return[
    loading, 
    error,
    getDocuments
  ]
}

export const useAddDocument = (type) => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useContext(dbDispatchContext)

  const addDocument = async (data) => {
    
    try {
      setError("")
      setLoading(true)
      const brandsCol = collection(db, type)
      const docRef = await addDoc(brandsCol, data);
      dispatch({
        type: dbActions.ADD_DOCUMENT,
        payload: {
            type,
            document: {
              id: docRef.id,
              data
            },
        }
        })
        return true
      } catch (err) {
        setError(err.message || "Unexpected Error!");
        return false
    } finally {
      setLoading(false)
    }
  }

  return[
    loading, 
    error,
    addDocument
  ]
}


export const useDeleteDocument = (type) => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useContext(dbDispatchContext)

  const deleteDocument = async (id) => {
    
    try {
      setLoading(true)
      await deleteDoc(doc(db, type, id))
      dispatch({
        type: dbActions.DELETE_DOCUMENT,
        payload: {
          type,
          id
        }
      })
    } catch (err) {
      setError(err.message || "Unexpected Error!");
    } finally {
      setLoading(false)
    }
  }

  return[
    loading, 
    error,
    deleteDocument
  ]
}

export const useGetUser = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useContext(dbDispatchContext)

  const getUser = async (id) => {
    try {
      setLoading(true)

      const docRef = doc(db, 'users', id);
      const docSnap = await getDoc(docRef)
      dispatch({
        type: dbActions.LOAD_USER,
        payload: {
          user: docSnap.data(),
        }
        })
    } catch (err) {
      setError(err.message || "Unexpected Error!");
    } finally {
      setLoading(false)
    }
  }

  return[
    loading, 
    error,
    getUser
  ]
}

export const useDeleteAccount = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useContext(dbDispatchContext)
  const user = auth.currentUser

  const deleteAccount = async (id) => {

    const docRef = doc(db, 'users', id);
    
    try {
      setLoading(true)
      deleteUser(user)
      await deleteDoc(docRef)
      dispatch({
        type: dbActions.DELETE_USER,
        payload: {}
        })
    } catch (err) {
      setError(err.message || "Unexpected Error!");
    } finally {
      setLoading(false)
    }
  }

  return[
    loading, 
    error,
    deleteAccount
  ]
}