'use client';
import React, { createContext, useEffect, useReducer, useState } from 'react';

import { useLocalStorage } from 'kifanga-ui-hooks';

const AuthContext = createContext();

const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, userInfo: action.payload };
    case 'LOGOUT':
      return { ...state, userInfo: null };
    case 'LOADING':
      return { ...state, loading: action.payload };
    default:
      return state;
  }
};

const initialState = {
  userInfo: null,
  loading: false,
};

const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);
  const [loading, setLoading] = useState(true);
  const [storedUserInfo, setStoredUserInfo, removeStoredUserInfo] =
    useLocalStorage('userInfo');

  useEffect(() => {
    const initializeUserInfo = async () => {
      if (storedUserInfo) {
        dispatch({ type: 'LOGIN', payload: storedUserInfo });
      }
      setLoading(false);
    };

    initializeUserInfo();
  }, [storedUserInfo]);

  const contextValue = {
    userInfo: state.userInfo,
    loading: state.loading,
    dispatch: dispatch,
  };

  // this is causing children to become client side rendered look into it in the future
  // if (loading) {
  //   return <LoadingScreen />;
  // }

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };