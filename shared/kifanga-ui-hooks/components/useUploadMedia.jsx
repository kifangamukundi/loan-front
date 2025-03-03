import { useReducer, useRef, useState } from 'react';
import { useAuth } from '.';

import { DashboardGetError } from 'kifanga-ui-nav';
import { uploadReducer } from 'kifanga-ui-state';

const useUploadMedia = (url, uploadLimit, subfolder) => {
  const { axiosInstance } = useAuth(url);

  const [data, dispatch] = useReducer(uploadReducer, {
    data: [],
    loading: false,
    success: false,
    error: null,
  });

  const fileInputRef = useRef(null);
  const [defaultImage, setDefaultImage] = useState({});
  const [images, setImages] = useState([]);

  const isUploadDisabled = images.length >= uploadLimit;

  const fileUploadHandler = async (files) => {
    // Check if the limit has been reached before attempting to upload
    if (images.length + files.length > uploadLimit) {
      window.alert(`You can only upload a maximum of ${uploadLimit} images.`);
      return;
    }

    const formData = new FormData();

    // Append the subfolder to the FormData
    formData.append('subfolder', subfolder);

    for (let i = 0; i < files.length; i++) {
      formData.append('files', files[i]);
    }

    try {
      dispatch({ type: 'UPLOAD_REQUEST' });
      const { data } = await axiosInstance.post(`${url}/media/new`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const newImages = data.data.images.map((image) => ({
        secure_url: image.secure_url,
        public_id: image.public_id,
      }));

      setImages([...images, ...newImages]);

      // Check if a default image is already set
      if (!defaultImage.public_id) {
        // Set the default image only if it hasn't been set before
        if (newImages.length > 0) {
          const latestDefaultImage = newImages[newImages.length - 1];
          setDefaultImage(latestDefaultImage)
        }
      }

      dispatch({ type: 'UPLOAD_SUCCESS', payload: data.data.images });
    } catch (err) {
      dispatch({ type: 'UPLOAD_FAIL', payload: DashboardGetError(err) });
      window.alert(DashboardGetError(err));
    }
  };

  const handleFileInputChange = (event) => {
    const files = event.target.files;
    if (files.length > 0) {
      fileUploadHandler(files);
    }
  };

  const handleIconClick = () => {
    if (!isUploadDisabled && images.length < uploadLimit) {
      fileInputRef.current.click();
    } else if (images.length >= uploadLimit) {
      window.alert(`You can only upload a maximum of ${uploadLimit} images.`);
    }
  };

  return {
    fileInputRef,
    data,
    defaultImage,
    images,
    setImages,
    setDefaultImage,
    handleFileInputChange,
    handleIconClick,
    isUploadDisabled,
  };
};

export default useUploadMedia;