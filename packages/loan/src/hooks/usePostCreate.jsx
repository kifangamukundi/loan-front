import { useEffect, useReducer, useCallback } from 'react';
import { DashboardGetError } from 'kifanga-ui-nav';
import { useAuth, useDebounce } from 'kifanga-ui-hooks';
import { fetchReducer, deleteReducer, createReducer, updateReducer } from 'kifanga-ui-state';
import { BASE_URL } from '@/helpers';

const usePostCreate = (
  setShowModal,
  setShowModal2,
  setShowModal3,
  setSelected1,
  setShowModal4,
  setShowModal5,
  setShowModal6,
  setSelected2
) => {
  const [categoryData, categoryDataDispatch] = useReducer(fetchReducer, {
    data: [],
    loading: false,
    success: false,
    error: null,
  });
  
  const [tagData, tagDataDispatch] = useReducer(fetchReducer, {
    data: [],
    loading: false,
    success: false,
    error: null,
  });

  const [deleteCategoryData, deleteCategoryDispatch] = useReducer(deleteReducer, {
    data: [],
    loading: false,
    success: false,
    error: null,
  });

  const [deleteTagData, deleteTagDispatch] = useReducer(deleteReducer, {
    data: [],
    loading: false,
    success: false,
    error: null,
  });

  const [createCategoryData, createCategoryDispatch] = useReducer(createReducer, {
    data: [],
    loading: false,
    success: false,
    error: null,
  });

  const [createTagData, createTagDispatch] = useReducer(createReducer, {
    data: [],
    loading: false,
    success: false,
    error: null,
  });

  const [updateCategoryData, updateCategoryDispatch] = useReducer(updateReducer, {
    data: [],
    loading: false,
    success: false,
    error: null,
  });

  const [updateTagData, updateTagDispatch] = useReducer(updateReducer, {
    data: [],
    loading: false,
    success: false,
    error: null,
  });

  const { axiosInstance } = useAuth(BASE_URL);

  const fetchCategoriesData = useCallback(async () => {
    categoryDataDispatch({ type: 'FETCH_RESET' });
    categoryDataDispatch({ type: 'FETCH_REQUEST' });

    try {
      const { data } = await axiosInstance.get(`${BASE_URL}/categories/all`);
      categoryDataDispatch({ type: 'FETCH_SUCCESS', payload: data.data });
    } catch (err) {
      const errorPayload = DashboardGetError(err);
      categoryDataDispatch({ type: 'FETCH_FAIL', payload: errorPayload });
    }
  }, [axiosInstance]);

  const fetchTagsData = useCallback(async () => {
    tagDataDispatch({ type: 'FETCH_RESET' });
    tagDataDispatch({ type: 'FETCH_REQUEST' });

    try {
      const { data } = await axiosInstance.get(`${BASE_URL}/tags/all`);
      tagDataDispatch({ type: 'FETCH_SUCCESS', payload: data.data });
    } catch (err) {
      const errorPayload = DashboardGetError(err);
      tagDataDispatch({ type: 'FETCH_FAIL', payload: errorPayload });
    }
  }, [axiosInstance]);

  const debounceFetchCategories = useDebounce(fetchCategoriesData, 250);
  const debounceFetchTags = useDebounce(fetchTagsData, 250);

  useEffect(() => {
    debounceFetchCategories();
    if (deleteCategoryData.success) {
      deleteCategoryDispatch({ type: 'DELETE_RESET' });
    }
    if (createCategoryData.success) {
      createCategoryDispatch({ type: 'CREATE_RESET' });
    }
    if (updateCategoryData.success) {
      updateCategoryDispatch({ type: 'UPDATE_RESET' });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deleteCategoryData.success, createCategoryData.success, updateCategoryData.success]);

  useEffect(() => {
    debounceFetchTags();
    if (deleteTagData.success) {
      deleteTagDispatch({ type: 'DELETE_RESET' });
    }
    if (createTagData.success) {
      createTagDispatch({ type: 'CREATE_RESET' });
    }
    if (updateTagData.success) {
      updateTagDispatch({ type: 'UPDATE_RESET' });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deleteTagData.success, createTagData.success, updateTagData.success]);

  const handleCategoryDeletion = useCallback(async (item) => {
    deleteCategoryDispatch({ type: 'DELETE_RESET' });
    deleteCategoryDispatch({ type: 'DELETE_REQUEST' });

    try {
      const { data } = await axiosInstance.delete(`${BASE_URL}/categories/by/${item.value}`);
      deleteCategoryDispatch({ type: 'DELETE_SUCCESS', payload: data });
      setShowModal(false);
      setSelected1(null);
    } catch (error) {
      deleteCategoryDispatch({ type: 'DELETE_FAIL', payload: DashboardGetError(error) });
    }
  }, [axiosInstance, setShowModal, setSelected1]);

  const handleTagDeletion = useCallback(async (item) => {
    deleteTagDispatch({ type: 'DELETE_RESET' });
    deleteTagDispatch({ type: 'DELETE_REQUEST' });

    try {
      const { data } = await axiosInstance.delete(`${BASE_URL}/tags/by/${item.value}`);
      deleteTagDispatch({ type: 'DELETE_SUCCESS', payload: data });
      setShowModal4(false);
      setSelected2(null);
    } catch (error) {
      deleteTagDispatch({ type: 'DELETE_FAIL', payload: DashboardGetError(error) });
    }
  }, [axiosInstance, setShowModal4, setSelected2]);

  const handleCreateCategory = useCallback(async (dataToBeCreated) => {
    createCategoryDispatch({ type: 'CREATE_RESET' });
    createCategoryDispatch({ type: 'CREATE_REQUEST' });

    try {
      const { data } = await axiosInstance.post(`${BASE_URL}/categories/create`, dataToBeCreated);
      createCategoryDispatch({ type: 'CREATE_SUCCESS', payload: data });
      setShowModal2(false);
    } catch (err) {
      const errorPayload = DashboardGetError(err);
      createCategoryDispatch({ type: 'CREATE_FAIL', payload: errorPayload });
    }
  }, [axiosInstance, setShowModal2]);

  const handleCreateTag = useCallback(async (dataToBeCreated) => {
    createTagDispatch({ type: 'CREATE_RESET' });
    createTagDispatch({ type: 'CREATE_REQUEST' });

    try {
      const { data } = await axiosInstance.post(`${BASE_URL}/tags/create`, dataToBeCreated);
      createTagDispatch({ type: 'CREATE_SUCCESS', payload: data });
      setShowModal5(false);
    } catch (err) {
      const errorPayload = DashboardGetError(err);
      createTagDispatch({ type: 'CREATE_FAIL', payload: errorPayload });
    }
  }, [axiosInstance, setShowModal5]);

  const handleCategoryUpdate = useCallback(async (item, dataToBeUpdated) => {
    updateCategoryDispatch({ type: 'UPDATE_RESET' });
    updateCategoryDispatch({ type: 'UPDATE_REQUEST' });

    try {
      const { data } = await axiosInstance.patch(`${BASE_URL}/categories/by/${item.value}`, dataToBeUpdated);
      updateCategoryDispatch({ type: 'UPDATE_SUCCESS', payload: data });
      setShowModal3(false);
    } catch (err) {
      const errorPayload = DashboardGetError(err);
      updateCategoryDispatch({ type: 'UPDATE_FAIL', payload: errorPayload });
    }
  }, [axiosInstance, setShowModal3]);

  const handleTagUpdate = useCallback(async (item, dataToBeUpdated) => {
    updateTagDispatch({ type: 'UPDATE_RESET' });
    updateTagDispatch({ type: 'UPDATE_REQUEST' });

    try {
      const { data } = await axiosInstance.patch(`${BASE_URL}/tags/by/${item.value}`, dataToBeUpdated);
      updateTagDispatch({ type: 'UPDATE_SUCCESS', payload: data });
      setShowModal6(false);
    } catch (err) {
      const errorPayload = DashboardGetError(err);
      updateTagDispatch({ type: 'UPDATE_FAIL', payload: errorPayload });
    }
  }, [axiosInstance, setShowModal6]);

  return {
    categoryData,
    deleteCategoryData,
    createCategoryData,
    updateCategoryData,
    handleCategoryDeletion,
    handleCreateCategory,
    handleCategoryUpdate,
    tagData,
    deleteTagData,
    createTagData,
    updateTagData,
    handleTagDeletion,
    handleCreateTag,
    handleTagUpdate,
  };
};

export default usePostCreate;