import React, { createContext, useReducer} from 'react'
import {authReducer} from './authReducer'

const initialAuthState = {
    user: null
}

export const authContext = createContext(null)
export const authDispatchContext = createContext(null)

export function AuthProvider ({ children }) {
    const [authState, dispatch] = useReducer(authReducer,initialAuthState);
  
    return (
      <authContext.Provider value={authState}>
        <authDispatchContext.Provider value={dispatch}>
          {children}
        </authDispatchContext.Provider>
      </authContext.Provider>
    );
}

