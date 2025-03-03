import { useReducer, useEffect } from 'react';
import { useAuth, useDebounce } from '.';

import { fetchReducer } from 'kifanga-ui-state';
import { DashboardGetError } from 'kifanga-ui-nav';

const useFetchResource = (url, resource) => {
  const [data, dispatch] = useReducer(fetchReducer, {
    data: [],
    loading: false,
    success: false,
    error: null,
  });

  const { axiosInstance } = useAuth(url);

  const fetchData = async () => {
    try {
      dispatch({ type: 'FETCH_RESET' });
      dispatch({ type: 'FETCH_REQUEST' });

      const { data } = await axiosInstance.get(`${url}/${resource}`);

      dispatch({ type: 'FETCH_SUCCESS', payload: data.data });
    } catch (err) {
      const errorPayload = DashboardGetError(err);
      dispatch({ type: 'FETCH_FAIL', payload: errorPayload });
    }
  };

  const debouncedFetchData = useDebounce(fetchData, 1500);

  useEffect(() => {
    debouncedFetchData();
  }, []);

  return {
    data,
  };
};

export default useFetchResource;