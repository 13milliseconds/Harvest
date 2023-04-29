import React, { createContext, useReducer} from 'react'
import {databaseReducer} from './databaseReducer'

const initialDatabaseState = {
    loaded: false,
    loading: true,
    brands: {
      loaded: false, 
      documents: []
    },
    plants: {
      loaded: false, 
      documents: []
    },
    error: null
}

export const dbContext = createContext(null)
export const dbDispatchContext = createContext(null)

export function DatabaseProvider ({ children }) {
    const [database, dispatch] = useReducer(databaseReducer,initialDatabaseState);
  
    return (
      <dbContext.Provider value={database}>
        <dbDispatchContext.Provider value={dispatch}>
          {children}
        </dbDispatchContext.Provider>
      </dbContext.Provider>
    );
}

