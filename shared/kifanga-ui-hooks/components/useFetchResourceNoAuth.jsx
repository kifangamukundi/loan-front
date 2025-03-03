import { useReducer, useEffect } from 'react';
import axios from 'axios';

import { fetchReducer } from 'kifanga-ui-state';
import { DashboardGetError } from 'kifanga-ui-nav';

const useFetchResourceNoAuth = (url, resource) => {
  const [data, dispatch] = useReducer(fetchReducer, {
    data: [],
    loading: false,
    success: false,
    error: null,
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      dispatch({ type: 'FETCH_RESET' });
      dispatch({ type: 'FETCH_REQUEST' });

      const { data } = await axios.get(`${url}/${resource}`);

      dispatch({ type: 'FETCH_SUCCESS', payload: data.data });
    } catch (err) {
      const errorPayload = DashboardGetError(err);
      dispatch({ type: 'FETCH_FAIL', payload: errorPayload });
    }
  };

  return {
    data,
  };
};

export default useFetchResourceNoAuth;