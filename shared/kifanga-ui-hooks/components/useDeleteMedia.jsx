import { useReducer, useCallback } from 'react';
import { useAuth } from '.';
import { deleteReducer } from 'kifanga-ui-state';
import { DashboardGetError } from 'kifanga-ui-nav';

const useDeleteMedia = (url, resource) => {
  const { axiosInstance } = useAuth(url);

  const [data, dispatch] = useReducer(deleteReducer, {
    data: [],
    loading: false,
    success: false,
    error: null,
  });

  const deleteMedia = useCallback(async (mediaId, images, setImages, setDefaultImage) => {
    try {
      dispatch({ type: 'DELETE_REQUEST' });
      const { data } = await axiosInstance.post(`${url}/${resource}`, { public_id: mediaId });

      dispatch({ type: 'DELETE_SUCCESS', payload: data.data.images });

      const updatedImages = images.filter(image => image.public_id !== mediaId);
      setImages(updatedImages);

      if (updatedImages.length > 0) {
        const firstImageUrl = updatedImages[0];
        setDefaultImage(firstImageUrl);
      } else {
        setDefaultImage(`#`);
      }

    } catch (err) {
      const errorPayload = DashboardGetError(err);
      dispatch({ type: 'DELETE_FAIL', payload: errorPayload });
    }
  }, [axiosInstance, resource, url]);

  return {
    data,
    deleteMedia,
  };
};

export default useDeleteMedia;