'use client';
import React, { createContext, useReducer, useEffect, useCallback } from 'react';
import { useAuth, useLocalStorage } from 'kifanga-ui-hooks';

const PermissionsContext = createContext();

const permissionsReducer = (state, action) => {
  switch (action.type) {
    case 'SET_PERMISSIONS':
      return { ...state, userPermissions: action.payload, isLoading: false };
    case 'LOADING':
      return { ...state, isLoading: action.payload };
    case 'FETCH_RESET':
      return { ...state, isLoading: true };
    case 'FETCH_FAIL':
      return { ...state, isLoading: false, error: action.payload };
    default:
      return state;
  }
};

const initialState = {
  userPermissions: [],
  isLoading: true,
  error: null,
};

const PermissionsProvider = ({ children, url }) => {
  const [state, dispatch] = useReducer(permissionsReducer, initialState);
  const [storedPermissions, setStoredPermissions] = useLocalStorage('userPermissions');

  const { axiosInstance } = useAuth(url);

  useEffect(() => {
    if (storedPermissions) {
      dispatch({ type: 'SET_PERMISSIONS', payload: storedPermissions });
    } else {
      dispatch({ type: 'SET_PERMISSIONS', payload: [] });
    }
  }, [storedPermissions]);

  const fetchPermissions = useCallback(async (base_url) => {
    dispatch({ type: 'FETCH_RESET' });

    try {
      const { data } = await axiosInstance.get(`${base_url}/users/permissions`);
      dispatch({ type: 'SET_PERMISSIONS', payload: data.data.permissions });
      setStoredPermissions(data.data.permissions);
    } catch (err) {
      const errorPayload = err?.response?.data?.message || 'Failed to fetch permissions';
      dispatch({ type: 'FETCH_FAIL', payload: errorPayload });
    }
  }, [axiosInstance, url, setStoredPermissions]);

  const contextValue = {
    userPermissions: state.userPermissions,
    isLoading: state.isLoading,
    error: state.error,
    fetchPermissions,
  };

  return (
    <PermissionsContext.Provider value={contextValue}>
      {children}
    </PermissionsContext.Provider>
  );
};

export { PermissionsProvider, PermissionsContext };
