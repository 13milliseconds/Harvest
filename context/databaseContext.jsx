import React, { createContext, useReducer} from 'react'

export const dbActions = {
    LOAD_BRANDS: 'LOAD_BRANDS',
    ADD_BRAND: 'ADD_BRAND',
  }

const initialDatabaseState = {
    loaded: false,
    loading: true,
    brands: [],
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
  
  function databaseReducer(database, action) {
    switch (action.type) {
      case dbActions.LOAD_BRANDS: {
        return {...database,
          brands: action.payload.brands
        };
      }
      case dbActions.ADD_BRAND: {
        let newBrandList = [...database.brands, action.payload.brand]
        return {...database,
          brands: newBrandList
        };
      }
      default: {
        throw Error('Unknown action: ' + action.type);
      }
    }
  }

