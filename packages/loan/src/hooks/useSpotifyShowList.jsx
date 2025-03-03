import { useEffect, useReducer, useCallback } from 'react';
import { DashboardGetError } from 'kifanga-ui-nav';
import { useAuth, useDebounce } from 'kifanga-ui-hooks';
import { fetchReducer } from 'kifanga-ui-state';
import { BASE_URL } from '@/helpers';

const useSpotifyShowList = ({ isLoggedIn, accessToken }) => {
  const [data, dispatch] = useReducer(fetchReducer, {
    data: [],
    loading: false,
    success: false,
    error: null,
  });

  const { axiosInstance } = useAuth(BASE_URL);

  const fetchData = useCallback(async () => {
    dispatch({ type: 'FETCH_RESET' });
    dispatch({ type: 'FETCH_REQUEST' });

    try {
      const { data } = await axiosInstance.post(`${BASE_URL}/spotify/shows`, { accessToken });
      dispatch({ type: 'FETCH_SUCCESS', payload: data.data });
    } catch (err) {
      const errorPayload = DashboardGetError(err);
      dispatch({ type: 'FETCH_FAIL', payload: errorPayload });
    }
  }, [axiosInstance, accessToken]);

  const debouncedFetchData = useDebounce(fetchData, 250);

  useEffect(() => {
    if (isLoggedIn) {
      debouncedFetchData();
    }
  }, [isLoggedIn]);

  return {
    data,
  };
};

export default useSpotifyShowList;