import { useContext, useReducer, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { DashboardGetError } from 'kifanga-ui-nav';
import { AuthContext, createReducer } from 'kifanga-ui-state';

const useActivate = (url, resource) => {
  const router = useRouter();

  const [data, dispatch] = useReducer(createReducer, {
    data: [],
    loading: false, 
    success: false,
    error: null,
  });

  const authContext = useContext(AuthContext);
  const { dispatch: ctxDispatch } = authContext;

  const activateUser = useCallback(async (activationToken, userId, redirectUrl) => {
    try {
      dispatch({ type: 'CREATE_REQUEST' });
      const { data } = await axios.put(`${url}/${resource}/${activationToken}/${userId}`);

      ctxDispatch({ type: 'USER_ACTIVATE', payload: data });
      dispatch({ type: 'CREATE_SUCCESS', payload: data });

      if (redirectUrl) {
        router.replace(redirectUrl);
      }
    } catch (err) {
      const errorPayload = DashboardGetError(err);
      dispatch({ type: 'CREATE_FAIL', payload: errorPayload });
    }
  }, [ctxDispatch, router, url, resource]); // Added dependencies

  return {
    data,
    activateUser,
  };
};

export default useActivate;
