import { useEffect, useReducer } from 'react';
import { useAuth } from '.';

import { DashboardGetError } from 'kifanga-ui-nav';
import { fetchReducer } from 'kifanga-ui-state';

const useResourceSinglePost = ( url, resource, id, accessToken ) => {
    const { axiosInstance } = useAuth(url);

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

      const { data } = await axiosInstance.post(`${url}/${resource}/${id}`, { accessToken });

      dispatch({ type: 'FETCH_SUCCESS', payload: data.data });
    } catch (err) {
      const errorPayload = DashboardGetError(err);
      dispatch({ type: 'FETCH_FAIL', payload: errorPayload });
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  return {
    data,
  };
};
export default useResourceSinglePost;