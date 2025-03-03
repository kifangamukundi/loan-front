import { useReducer } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '.';

import { DashboardGetError } from 'kifanga-ui-nav';
import { updateReducer } from 'kifanga-ui-state';

const useResourceUpdateLoan = (url, resource, id) => {
  const { axiosInstance } = useAuth(url);
  const router = useRouter();

  const [approveData, approveDispatch] = useReducer(updateReducer, {
    data: [],
    loading: false,
    success: false,
    error: null,
  });

  const [rejectData, rejectDispatch] = useReducer(updateReducer, {
    data: [],
    loading: false,
    success: false,
    error: null,
  });

  const approveLoan = async (redirectUrl) => {
    try {
        approveDispatch({ type: 'UPDATE_REQUEST' });
        const { data } = await axiosInstance.patch(`${url}/${resource}/approve/${id}`);
    
        approveDispatch({ type: 'UPDATE_SUCCESS', payload: data.data.resource });
        if (redirectUrl) {
            router.replace(redirectUrl)
        }
    } catch (err) {
        const errorPayload = DashboardGetError(err);
        approveDispatch({ type: 'UPDATE_FAIL', payload: errorPayload });
    }
  };

  const rejectLoan = async (redirectUrl) => {
    try {
        rejectDispatch({ type: 'UPDATE_REQUEST' });
        const { data } = await axiosInstance.patch(`${url}/${resource}/reject/${id}`);
    
        rejectDispatch({ type: 'UPDATE_SUCCESS', payload: data.data.resource });
        if (redirectUrl) {
            router.replace(redirectUrl)
        }
    } catch (err) {
        const errorPayload = DashboardGetError(err);
        rejectDispatch({ type: 'UPDATE_FAIL', payload: errorPayload });
    }
  };

  return {
    approveData,
    approveLoan,
    rejectData,
    rejectLoan
  };
};

export default useResourceUpdateLoan;