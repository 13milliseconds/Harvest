import axios from 'axios'
import { dbDispatchContext } from '../context/databaseContext';
import {dbActions} from '../context/databaseReducer'
import { useState, useContext } from "react";

export const useAPI =  (apiFunc) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  const request = async (...args) => {
    try {
      const result = await apiFunc(...args);
      setData(result.data);
    } catch (err) {
      setError(err.message || "Unexpected Error!");
    } finally {
    }
  };

  return {
    data,
    error,
    request
  };
};

export const useGetDocuments = (type) => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useContext(dbDispatchContext)

  const getDocuments = async () => {
    
    try {
      setLoading(true)
      const documents = await axios.get('/api/' + type, {});
      dispatch({
        type: dbActions.LOAD_DOCUMENTS,
        payload: {
          documents: documents.data,
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
      const docRef = await axios.post('/api/' + type, data);
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
      await axios.delete(`/api/${type}/${id}`);
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
      const document = await axios.get(`/api/user/${id}`);
      console.log(id, document)
      dispatch({
        type: dbActions.LOAD_USER,
        payload: {
          user: document.data,
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