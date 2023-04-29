
export const dbActions = {
    // Generic
    ADD_DOCUMENT: 'ADD_DOCUMENT',
    DELETE_DOCUMENT: 'DELETE_DOCUMENT',
    LOAD_DOCUMENTS: 'LOAD_DOCUMENTS',
  }

export function databaseReducer(database, action) {
    switch (action.type) {
      case dbActions.LOAD_DOCUMENTS: {
        return {...database,
          [action.payload.type]: {
            loaded: true,
            documents: action.payload.documents
          }
        };
      }
      case dbActions.ADD_DOCUMENT: {
        let newDocumentList = [...database[action.payload.type].documents, action.payload.document]
        return {...database,
          [action.payload.type]: {...database[action.payload.type], documents: newDocumentList}
        };
      }
      case dbActions.DELETE_DOCUMENT: {
        let newDocumentList = database[action.payload.type].documents.filter((document) => { return document.id !== action.payload.id })
        return {...database,
          [action.payload.type]: {...database[action.payload.type], documents: newDocumentList}
        };
      }
      default: {
        throw Error('Unknown action: ' + action.type);
      }
    }
  }