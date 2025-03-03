'use client';
import React, { createContext, useContext, useEffect, useReducer } from 'react';
// import Cookies from 'js-cookie';

const DarkModeContext = createContext();

const initialState = {
  darkMode: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'TOGGLE_DARK_MODE':
      return { ...state, darkMode: !state.darkMode };
    case 'INITIALIZE_THEME':
      return { ...state, darkMode: action.payload };
    default:
      return state;
  }
};

const DarkModeProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const toggleDarkMode = () => {
    dispatch({ type: 'TOGGLE_DARK_MODE' });
    const updatedDarkMode = !state.darkMode;
    localStorage.setItem('darkMode', JSON.stringify(updatedDarkMode));
    // Cookies.set('darkMode', updatedDarkMode);
  };

  useEffect(() => {
    const initializeTheme = async () => {
      const themeInfo = localStorage.getItem('darkMode');
      // const cookieDarkMode = Cookies.get('darkMode');
      if (themeInfo) {
        const parsedThemeInfo = JSON.parse(themeInfo);
        dispatch({ type: 'INITIALIZE_THEME', payload: parsedThemeInfo });
      }
      // dispatch({ type: 'INITIALIZE_THEME', payload: cookieDarkMode === 'true' });
    };
    initializeTheme();
  }, []);

  const contextValue = {
    darkMode: state.darkMode,
    toggleDarkMode,
  };

  return (
    <DarkModeContext.Provider value={contextValue}>
      {children}
    </DarkModeContext.Provider>
  );
};

const useDarkMode = () => {
  const context = useContext(DarkModeContext);
  if (!context) {
    throw new Error('useDarkMode must be used within a DarkModeProvider');
  }
  return context;
};

export { DarkModeProvider, useDarkMode };
