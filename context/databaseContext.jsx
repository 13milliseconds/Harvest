import React, { createContext, useReducer} from 'react'

export const dbActions = {
    // Generic
    ADD_DOCUMENT: 'ADD_DOCUMENT',
    DELETE_DOCUMENT: 'DELETE_DOCUMENT',
    LOAD_DOCUMENTS: 'LOAD_DOCUMENTS',
  }

const initialDatabaseState = {
    loaded: false,
    loading: true,
    brands: [],
    plants: [],
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
      case dbActions.LOAD_DOCUMENTS: {
        return {...database,
          [action.payload.type]: action.payload.documents
        };
      }
      case dbActions.ADD_DOCUMENT: {
        let newDocumentList = [...database[action.payload.type], action.payload.document]
        return {...database,
          [action.payload.type]: newDocumentList
        };
      }
      case dbActions.DELETE_DOCUMENT: {
        let newDocumentList = database[action.payload.type].filter((document) => { return document.id !== action.payload.id })
        return {...database,
          [action.payload.type]: newDocumentList
        };
      }
      default: {
        throw Error('Unknown action: ' + action.type);
      }
    }
  }

