import { useContext, useReducer, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { createReducer, AuthContext } from 'kifanga-ui-state';
import { DashboardGetError } from 'kifanga-ui-nav';

const useLogin = (url, resource) => {
  const router = useRouter();

  const [data, dispatch] = useReducer(createReducer, {
    data: [],
    loading: false,
    success: false,
    error: null,
  });

  const authContext = useContext(AuthContext);
  const { userInfo, dispatch: ctxDispatch } = authContext;

  const createUser = useCallback(async (userToBeCreated) => {
    try {
      dispatch({ type: 'CREATE_REQUEST' });
      const { data } = await axios.post(`${url}/${resource}`, userToBeCreated);

      ctxDispatch({ type: 'LOGIN', payload: data });

      dispatch({ type: 'CREATE_SUCCESS', payload: data.data });

      localStorage.setItem('userInfo', JSON.stringify(data.data));
    } catch (err) {
      const errorPayload = DashboardGetError(err);
      dispatch({ type: 'CREATE_FAIL', payload: errorPayload });
    }
  }, [ctxDispatch, url, resource]);

  useEffect(() => {
    if (userInfo) {
      router.replace('/');
    }
  }, [router, userInfo]);

  return {
    data,
    createUser,
  };
};

export default useLogin;
