import { useContext, useReducer, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

import { createReducer, AuthContext } from 'kifanga-ui-state';
import { DashboardGetError } from 'kifanga-ui-nav';

const useRegister = (url, resource) => {
  const router = useRouter();

  const [data, dispatch] = useReducer(createReducer, {
    data: [],
    loading: false,
    success: false,
    error: null,
  });

  const authContext = useContext(AuthContext);
  const { userInfo, dispatch: ctxDispatch } = authContext;

  const registerUser = useCallback(async (userToBeCreated, redirectUrl) => {
    try {
      dispatch({ type: 'CREATE_REQUEST' });
      const { data } = await axios.post(`${url}/${resource}`, userToBeCreated);

      ctxDispatch({ type: 'USER_REGISTER', payload: data });

      dispatch({ type: 'CREATE_SUCCESS', payload: data });

      if (redirectUrl) {
        router.replace(redirectUrl);
      }
    } catch (err) {
      const errorPayload = DashboardGetError(err);
      dispatch({ type: 'CREATE_FAIL', payload: errorPayload });
    }
  }, [ctxDispatch, url, resource, router]); // Add dependencies

  useEffect(() => {
    if (userInfo) {
      router.replace('/');
    }
  }, [router, userInfo]);

  return {
    data,
    registerUser,
  };
};

export default useRegister;
