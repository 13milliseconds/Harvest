import React, { createContext, useEffect, useContext, useState } from 'react';
import {auth} from '../firebaseConfig'


const AuthContext = createContext(null);

const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
      const user = auth.currentUser;
  
      return user;
    });
  
    useEffect(() => {
      auth.onAuthStateChanged(firebaseUser => {
        setUser(firebaseUser);
      });
    }, [])
  
    return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>
  }

const useAuth = () => {
    const user = useContext(AuthContext);

    return user;
};

export {
    AuthContextProvider,
    useAuth
}