import { useReducer, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '.';
import { DashboardGetError } from 'kifanga-ui-nav';
import { createReducer } from 'kifanga-ui-state';

const useCreateResource = (url, resource) => {
  const { axiosInstance } = useAuth(url);
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
      const { data } = await axiosInstance.post(`${url}/${resource}`, dataToBeCreated);

      dispatch({ type: 'CREATE_SUCCESS', payload: data.data });
      if (redirectUrl) {
        router.replace(redirectUrl);
      }
    } catch (err) {
      const errorPayload = DashboardGetError(err);
      console.log("from hook")
      console.log(err.response.data)
      dispatch({ type: 'CREATE_FAIL', payload: errorPayload });
    }
  }, [axiosInstance, router, resource, url]);

  return {
    data,
    createResource,
  };
};

export default useCreateResource;