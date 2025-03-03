import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';

const useCookies = (key, initialValue = null) => {
  const [value, setValue] = useState(() => {
    try {
      const cookieValue = Cookies.get(key);
      return cookieValue !== undefined ? JSON.parse(cookieValue) : initialValue;
    } catch (error) {
      console.error(`Error retrieving ${key} from cookies: ${error.message}`);
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      const cookieValue = Cookies.get(key);
      if (cookieValue !== undefined) {
        setValue(JSON.parse(cookieValue));
      }
    } catch (error) {
      console.error(`Error retrieving ${key} from cookies: ${error.message}`);
    }
  }, [key]);

  const setCookieValue = (newValue) => {
    try {
      setValue(newValue);
      Cookies.set(key, JSON.stringify(newValue), { expires: 7 }); // Set expiration time as needed
    } catch (error) {
      console.error(`Error setting ${key} in cookies: ${error.message}`);
    }
  };

  const removeCookieValue = () => {
    try {
      setValue(null);
      Cookies.remove(key);
    } catch (error) {
      console.error(`Error removing ${key} from cookies: ${error.message}`);
    }
  };

  return [value, setCookieValue, removeCookieValue];
};

export default useCookies;
