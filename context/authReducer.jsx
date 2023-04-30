
export const authActions = {
    // Generic
    SIGNIN: 'SIGNIN',
  }

export function authReducer(authState, action) {
    switch (action.type) {
      case authActions.SIGNIN: {
        return {...authState,
          user: action.payload.user
        };
      }
      default: {
        throw Error('Unknown action: ' + action.type);
      }
    }
  }