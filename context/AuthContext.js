import {createContext, useEffect, useReducer} from 'react';

const INITIAL_STATE = {
  user:  null,
//   JSON.parse(localStorage.getItem("user"))
  loading: false,
  err: null,
};
export const AuthContext = createContext(INITIAL_STATE);
const AuthReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN_START':
      return {
        user: null,
        loading: true,
        err: null,
      };
    case 'LOGIN_SUCCESS':
      return {
        user: action.payload,
        loading: false,
        err: null,
      };
    case 'LOGIN_FAILURE':
      return {
        user: null,
        loading: false,
        err: action.payload,
      };
    case 'LOGOUT':
      return {
        user: null,
        loading: false,
        err: false,
      };
    default:
      return state;
  }
};
export const AuthContextProvider = ({children}) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);
//   useEffect(() => {
//     localStorage.setItem("user",JSON.stringify(state.user))
//   }, [state.user]);
  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        loading: state.loading,
        err: state.err,
        dispatch,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
