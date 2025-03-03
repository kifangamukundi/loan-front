import { useReducer } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '.';

import { DashboardGetError } from 'kifanga-ui-nav';
import { updateReducer } from 'kifanga-ui-state';

const useResourceUpdate = (url, resource, id, formData, setFormData) => {
  const { axiosInstance } = useAuth(url);
  const router = useRouter();

  const [data, dispatch] = useReducer(updateReducer, {
    data: [],
    loading: false,
    success: false,
    error: null,
  });

  const updateResource = async (dataToBeUpdated, redirectUrl) => {
    try {
        dispatch({ type: 'UPDATE_REQUEST' });
        const { data } = await axiosInstance.patch(`${url}/${resource}/${id}`, dataToBeUpdated);
    
        dispatch({ type: 'UPDATE_SUCCESS', payload: data.data.resource });
        if (redirectUrl) {
            router.replace(redirectUrl)
        }
        const initialState = {};
        Object.keys(formData).forEach((fieldName) => {
          initialState[fieldName] = "";
        });
        setFormData(initialState);
    } catch (err) {
        const errorPayload = DashboardGetError(err);
        dispatch({ type: 'UPDATE_FAIL', payload: errorPayload });
    }
  };

  return {
    data,
    updateResource,
  };
};

export default useResourceUpdate;