import { useEffect, useReducer } from 'react';
import axios from 'axios';

import { useAuth, useDebounce } from '.';

import { DashboardGetError } from 'kifanga-ui-nav';
import { createReducer, deleteReducer, fetchReducer, updateReducer } from 'kifanga-ui-state';

const useComment = (url, postId) => {
  const { axiosInstance } = useAuth(url);

  const [createCommentData, createCommentDispatch] = useReducer(createReducer, {
    data: [],
    loading: false,
    success: false,
    error: null,
  });

  const [updateCommentData, updateCommentDispatch] = useReducer(updateReducer, {
    data: [],
    loading: false,
    success: false,
    error: null,
  });

  const [deleteCommentData, deleteCommentDispatch] = useReducer(deleteReducer, {
    data: [],
    loading: false,
    success: false,
    error: null,
  });

  const [likeCommentData, likeCommentDispatch] = useReducer(updateReducer, {
    data: [],
    loading: false,
    success: false,
    error: null,
  });

  const [fetchCommentsData, fetchCommentsDispatch] = useReducer(fetchReducer, {
    data: [],
    loading: false,
    success: false,
    error: null,
  });

  const getComments = async () => {
    try {
      fetchCommentsDispatch({ type: 'FETCH_RESET' });
      fetchCommentsDispatch({ type: 'FETCH_REQUEST' });

      const { data } = await axios.get(`${url}/comments/by/${postId}`);

      fetchCommentsDispatch({ type: 'FETCH_SUCCESS', payload: data.data });
    } catch (err) {
      const errorPayload = DashboardGetError(err);
      fetchCommentsDispatch({ type: 'FETCH_FAIL', payload: errorPayload });
    }
  };

  const debouncedFetchCommentsData = useDebounce(getComments, 250);

  useEffect(() => {
    debouncedFetchCommentsData();
  }, [postId]);

  const createComment = async (dataToBeCreated) => {
    try {
        createCommentDispatch({ type: 'CREATE_REQUEST' });
        const { data } = await axiosInstance.post(`${url}/comments/create`, dataToBeCreated);
    
        createCommentDispatch({ type: 'CREATE_SUCCESS', payload: data.data });
        await getComments();
    } catch (err) {
        const errorPayload = DashboardGetError(err);
        createCommentDispatch({ type: 'CREATE_FAIL', payload: errorPayload });
    }
  };

  const updateComment = async (commentId, dataToBeUpdated) => {
    try {
        updateCommentDispatch({ type: 'UPDATE_REQUEST' });
        const { data } = await axiosInstance.patch(`${url}/comments/by/${commentId}`, dataToBeUpdated);
    
        updateCommentDispatch({ type: 'UPDATE_SUCCESS', payload: data.data });
        await getComments();
    } catch (err) {
        const errorPayload = DashboardGetError(err);
        updateCommentDispatch({ type: 'UPDATE_FAIL', payload: errorPayload });
    }
  };

  const deleteComment = async (commentId) => {
    try {
      deleteCommentDispatch({ type: 'DELETE_REQUEST' });
      const { data } = await axiosInstance.delete(`${url}/comments/by/${commentId}`);

      deleteCommentDispatch({ type: 'DELETE_SUCCESS', payload: data });
      await getComments();
    } catch (error) {
      deleteCommentDispatch({
        type: 'DELETE_FAIL',
        payload: GetError(error),
      });
    }
  };

  const likeComment = async (commentId) => {
    try {
        likeCommentDispatch({ type: 'CREATE_REQUEST' });
        const { data } = await axiosInstance.post(`${url}/comments/like/${commentId}`);
    
        likeCommentDispatch({ type: 'CREATE_SUCCESS', payload: data.data });
        await getComments();
    } catch (err) {
        const errorPayload = DashboardGetError(err);
        likeCommentDispatch({ type: 'CREATE_FAIL', payload: errorPayload });
    }
  };

  return {
    createCommentData,
    createComment,
    fetchCommentsData,
    updateCommentData,
    updateComment,
    deleteCommentData,
    deleteComment,
    likeCommentData,
    likeComment,
  };
};

export default useComment;