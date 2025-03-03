import { useEffect, useState } from 'react';

const useLocalStorage = (key, initialValue = null) => {
  const [value, setValue] = useState(() => {
    try {
      if (typeof window !== 'undefined') {
        // Perform localStorage action
        const storedValue = localStorage.getItem(key);
        return storedValue !== null ? JSON.parse(storedValue) : initialValue;
      }
    } catch (error) {
      console.error(`Error retrieving ${key} from local storage: ${error.message}`);
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      const storedValue = localStorage.getItem(key);
      if (storedValue !== null) {
        setValue(JSON.parse(storedValue));
      }
    } catch (error) {
      console.error(`Error retrieving ${key} from local storage: ${error.message}`);
    }
  }, [key]);

  const setStoredValue = (newValue) => {
    try {
      setValue(newValue);
      localStorage.setItem(key, JSON.stringify(newValue));
    } catch (error) {
      console.error(`Error setting ${key} in local storage: ${error.message}`);
    }
  };

  const removeStoredValue = () => {
    try {
      setValue(null);
      localStorage.removeItem(key);
    } catch (error) {
      console.error(`Error removing ${key} from local storage: ${error.message}`);
    }
  };

  return [value, setStoredValue, removeStoredValue];
};

export default useLocalStorage;