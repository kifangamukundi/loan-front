import { useContext, useReducer, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

import { createReducer, AuthContext } from 'kifanga-ui-state';
import { DashboardGetError } from 'kifanga-ui-nav';

const useReset = (url, resource) => {
  const router = useRouter();

  const [data, dispatch] = useReducer(createReducer, {
    data: [],
    loading: false,
    success: false,
    error: null,
  });

  const authContext = useContext(AuthContext);
  const { userInfo, dispatch: ctxDispatch } = authContext;

  const resetUser = useCallback(async (credentialsToBeReset, resetToken, userId, redirectUrl) => {
    const { password } = credentialsToBeReset;
    try {
      dispatch({ type: 'CREATE_REQUEST' });
      const { data } = await axios.put(`${url}/${resource}/${resetToken}/${userId}`, {
        password,
      });

      ctxDispatch({ type: 'USER_PASS_RESET', payload: data });

      dispatch({ type: 'CREATE_SUCCESS', payload: data });

      if (redirectUrl) {
        router.replace(redirectUrl);
      }
    } catch (err) {
      const errorPayload = DashboardGetError(err);
      dispatch({ type: 'CREATE_FAIL', payload: errorPayload });
    }
  }, [ctxDispatch, url, resource, router]);

  useEffect(() => {
    if (userInfo) {
      router.replace('/');
    }
  }, [router, userInfo]);

  return {
    data,
    resetUser,
  };
};

export default useReset;