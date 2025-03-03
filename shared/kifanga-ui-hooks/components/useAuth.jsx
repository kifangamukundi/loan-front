import { useContext } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

import { useCookies, useLocalStorage } from 'kifanga-ui-hooks';
import { AuthContext } from 'kifanga-ui-state';

const useAuth = (url) => {
  const authContext = useContext(AuthContext);
  const { dispatch } = authContext;

  const [storedUserInfo, setStoredUserInfo, removeStoredUserInfo] = useLocalStorage('userInfo');
  // const [accessCookieValue, setAccessCookieValue, removeAccessCookieValue] = useCookies('_access');
  // const [refreshCookieValue, setRefreshCookieValue, removeRefreshCookieValue] = useCookies('_refresh');
  const { user } = storedUserInfo || {};
  const { accessToken, refreshToken } = user || {};

  const axiosInstance = axios.create({
    url,
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  axiosInstance.interceptors.request.use(async (req) => {
    const decodedAccessToken = jwtDecode(accessToken);
    const tokenExpiration = decodedAccessToken?.exp;
    const userId = decodedAccessToken?.sub;
    const currentTime = Math.floor(Date.now() / 1000);

    if (tokenExpiration < currentTime) {
      try {
        const decodedRefreshToken = jwtDecode(refreshToken);
        const refreshExpiration = decodedRefreshToken?.exp;

        if (refreshExpiration < currentTime) {
          dispatch({ type: 'LOGOUT' });
          removeStoredUserInfo();
          // removeAccessCookieValue();
          // removeRefreshCookieValue();
          window.location.href = '/login';
          return Promise.reject('Refresh token expired');
        }

        const { data } = await axios.post(`${url}/users/refresh`, {
          refreshToken: refreshToken,
          userId: userId,
        });

        const { accessToken: newAccessToken, refreshToken: newRefreshToken } = data.user;

        setStoredUserInfo({ ...storedUserInfo, user: { accessToken: newAccessToken, refreshToken: newRefreshToken } });

        // setAccessCookieValue({'_access': newAccessToken});
        // setRefreshCookieValue({'_refresh': newRefreshToken});

        req.headers.Authorization = `Bearer ${newAccessToken}`;
        return req;
      } catch (error) {
        dispatch({ type: 'LOGOUT' });
        return Promise.reject(error);
      }
    }

    return req;
  });

  return { axiosInstance };
};

export default useAuth;
