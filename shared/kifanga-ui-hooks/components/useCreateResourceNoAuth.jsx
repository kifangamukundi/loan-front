import { useReducer, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { DashboardGetError } from 'kifanga-ui-nav';
import { createReducer } from 'kifanga-ui-state';

const useCreateResourceNoAuth = (url, resource) => {
  const router = useRouter();

  const [data, dispatch] = useReducer(createReducer, {
    data: [],
    loading: false,
    success: false,
    error: null,
  });

  const createResource = useCallback(async (dataToBeCreated, redirectUrl) => {
    try {
      dispatch({ type: 'CREATE_REQUEST' });
      const { data } = await axios.post(`${url}/${resource}`, dataToBeCreated);
    
      dispatch({ type: 'CREATE_SUCCESS', payload: data.data });
      if (redirectUrl) {
        router.replace(redirectUrl);
      }
    } catch (err) {
      const errorPayload = DashboardGetError(err);
      dispatch({ type: 'CREATE_FAIL', payload: errorPayload });
    }
  }, [router, url, resource]);

  return {
    data,
    createResource,
  };
};

export default useCreateResourceNoAuth;