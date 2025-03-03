import { useEffect, useState, useReducer, useCallback } from 'react';
import { DashboardGetError } from 'kifanga-ui-nav';
import { useAuth, useDebounce } from 'kifanga-ui-hooks';
import { fetchReducer, deleteReducer } from 'kifanga-ui-state';
import { BASE_URL } from '@/helpers';

const useGroupList = (
  setShowModal,
  setSelectedItem,
  defaultFilters = {},
  defaultSortOrder,
  defaultPage = 1,
  defaultLimit = 9,
  defaultTotalPages = 1
) => {
  const [data, dispatch] = useReducer(fetchReducer, {
    data: [],
    loading: false,
    success: false,
    error: null,
  });

  const [deleteData, deleteDispatch] = useReducer(deleteReducer, {
    data: [],
    loading: false,
    success: false,
    error: null,
  });

  const [filters, setFilters] = useState(defaultFilters);
  const [sortOrder, setSortOrder] = useState(defaultSortOrder);
  const [page, setPage] = useState(defaultPage);
  const [totalPages, setTotalPages] = useState(defaultTotalPages);
  const [limit, setLimit] = useState(defaultLimit);
  const [search, setSearch] = useState('');

  const { axiosInstance } = useAuth(BASE_URL);

  const fetchData = useCallback(async () => {
    dispatch({ type: 'FETCH_RESET' });
    dispatch({ type: 'FETCH_REQUEST' });

    try {
      const { data } = await axiosInstance.get(`${BASE_URL}/groups/paginate`, {
        params: {
          filters: JSON.stringify(filters),
          sortOrder,
          page,
          limit,
          search,
        },
      });

      dispatch({ type: 'FETCH_SUCCESS', payload: data.data });
      setTotalPages(Math.ceil(data.data.totalCount / limit));
    } catch (err) {
      const errorPayload = DashboardGetError(err);
      dispatch({ type: 'FETCH_FAIL', payload: errorPayload });
    }
  }, [axiosInstance, filters, sortOrder, page, limit, search]);

  const debouncedFetchData = useDebounce(fetchData, 250);

  useEffect(() => {
    debouncedFetchData();

    if (deleteData.success) {
      deleteDispatch({ type: 'DELETE_RESET' });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters, sortOrder, page, limit, search, deleteData.success]);

  const handleFilterChange = useCallback((event) => {
    const { name, value } = event.target;
    setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
  }, []);

  const handleSortOrderChange = useCallback((event) => {
    setPage(1);
    setSortOrder(event.target.value);
  }, []);

  const handleDeletion = useCallback(async (item, itemName) => {
    const isNameMatched = itemName === itemName;

    if (isNameMatched) {
      deleteDispatch({ type: 'DELETE_RESET' });
      deleteDispatch({ type: 'DELETE_REQUEST' });

      try {
        const { data } = await axiosInstance.delete(`${BASE_URL}/groups/by/${item.id}`);
        deleteDispatch({ type: 'DELETE_SUCCESS', payload: data });
        setShowModal(false);
        setSelectedItem(null);
        setPage(1);
      } catch (error) {
        deleteDispatch({
          type: 'DELETE_FAIL',
          payload: GetError(error),
        });
      }
    }
  }, [axiosInstance, setShowModal, setSelectedItem]);

  const handleLimitChange = useCallback((event) => {
    setPage(1);
    setLimit(parseInt(event.target.value, 10));
  }, []);

  const handleSearchChange = useCallback((event) => {
    setPage(1);
    setSearch(event.target.value);
  }, []);

  return {
    data,
    deleteData,
    filters,
    sortOrder,
    page,
    limit,
    search,
    totalPages,
    handleFilterChange,
    handleSortOrderChange,
    handleSearchChange,
    handleLimitChange,
    handleDeletion,
    goToFirstPage: () => setPage(1),
    goToPreviousPage: () => setPage((prev) => Math.max(prev - 1, 1)),
    goToNextPage: () => setPage((prev) => Math.min(prev + 1, totalPages)),
    goToLastPage: () => setPage(totalPages),
  };
};

export default useGroupList;