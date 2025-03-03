import { useEffect, useReducer } from 'react';
import axios from 'axios';

import { DashboardGetError } from 'kifanga-ui-nav';
import { fetchReducer } from 'kifanga-ui-state';

const useFetchResourceOne = (url, resource) => {
    const [data, dispatch] = useReducer(fetchReducer, {
        data: [],
        loading: false,
        success: false,
        error: null,
    });

  
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

  useEffect(() => {
    fetchData();
  }, []);

  return {
    data,
  };
};
export default useFetchResourceOne;