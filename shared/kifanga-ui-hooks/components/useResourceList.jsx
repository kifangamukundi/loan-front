import { useEffect, useState, useReducer } from 'react';
import { DashboardGetError } from 'kifanga-ui-nav';
import { useAuth, useDebounce } from '.';
import { fetchReducer, deleteReducer } from 'kifanga-ui-state';

const useResourceList = (
  url,
  resource, 
  baseResource, 
  setShowModal,
  setSelectedItem,
  defaultFilters = {depthRange: [0, 10]},
  defaultRange = '1, 3',
  defaultSortByColumn, 
  defaultSortOrder, 
  defaultPage = 1, 
  defaultLimit = 2, 
  defaultTotalPages = 1) => {
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
  const [sortByColumn, setSortByColumn] = useState(defaultSortByColumn);
  const [sortOrder, setSortOrder] = useState(defaultSortOrder);
  const [page, setPage] = useState(defaultPage);
  const [totalPages, setTotalPages] = useState(defaultTotalPages);
  const [limit, setLimit] = useState(defaultLimit);
  const [search, setSearch] = useState('');

  // new stuff
  const [selectedRange, setSelectedRange] = useState(defaultRange);
  const [selectedDateRange, setSelectedDateRange] = useState('last7days');

  const { axiosInstance } = useAuth(url);
  
  const fetchData = async () => {
    const { startDate, endDate } = calculateDateRange(selectedDateRange);
    try {
      dispatch({ type: 'FETCH_RESET' });
      dispatch({ type: 'FETCH_REQUEST' });

      const { data } = await axiosInstance.get(`${url}/${resource}`, {
        params: {
          filters: JSON.stringify({
            numberRange: selectedRange.split(',').map(Number),
            dateRange: [startDate, endDate],
          }),
          sortByColumn,
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
  };

  const debouncedFetchData = useDebounce(fetchData, 1500);

  useEffect(() => {
    // fetchData();
    debouncedFetchData();
  }, [filters, sortByColumn, sortOrder, page, limit, search, selectedRange, selectedDateRange, deleteData]);

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
  };

  const handleRangeSelectChange = (event) => {
    setPage(1);
    setSelectedRange(event.target.value);
  };

  const handleDateRangeSelectChange = (event) => {
    setSelectedDateRange(event.target.value);
  };

  const handleSortByColumnChange = (event) => {
    setPage(1);
    setSortByColumn(event.target.value);
  };

  const handleSortOrderChange = (event) => {
    setPage(1);
    setSortOrder(event.target.value);
  };
  
  const handleDeletion = async (item, itemName) => {
      const isNameMatched = itemName === itemName;
    
      if (isNameMatched) {
        try {
          deleteData.error = "";
          deleteDispatch({ type: 'DELETE_REQUEST' });
          const { data } = await axiosInstance.delete(`${url}/${baseResource}/${item.id}`);
          deleteDispatch({ type: 'DELETE_SUCCESS', payload: data });
          setShowModal(false);
          setSelectedItem(null);
          setPage(1);
          deleteDispatch({ type: 'DELETE_RESET' });
        } catch (error) {
          deleteDispatch({
            type: 'DELETE_FAIL',
            payload: GetError(error),
          });
          // deleteDispatch({ type: 'DELETE_RESET' });
        }
      }
    };
  
  const handleLimitChange = (event) => {
    setPage(1);
    setLimit(parseInt(event.target.value));
  };

  const handleSearchChange = (event) => {
    setPage(1);
    setSearch(event.target.value);
  };

  const handlePageChange = (direction) => {
    if (direction === 'next') {
      setPage(page + 1);
    } else if (direction === 'previous') {
      setPage(page - 1);
    }
  };

  const goToFirstPage = () => {
    setPage(1);
  };

  const goToPreviousPage = () => {
    if (page > 1) {
        setPage(page - 1);
    }
  };

  const goToNextPage = () => {
    if (page < totalPages) {
        setPage(page + 1);
    }
  };

  const goToLastPage = () => {
    setPage(totalPages);
  };

  // other methods
  const calculateDateRange = (selectedRange) => {
    const today = new Date();
  
    switch (selectedRange) {
      case 'today':
        return { startDate: today, endDate: today };
      case 'last7days':
        const last7Days = new Date(today);
        last7Days.setDate(today.getDate() - 6);
        return { startDate: last7Days, endDate: today };
      case 'last14days':
        const last14Days = new Date(today);
        last14Days.setDate(today.getDate() - 13);
        return { startDate: last14Days, endDate: today };
      case 'last30days':
        const last30Days = new Date(today);
        last30Days.setDate(today.getDate() - 29);
        return { startDate: last30Days, endDate: today };
      case 'last3months':
        const last3Months = new Date(today);
        last3Months.setMonth(today.getMonth() - 2);
        return { startDate: last3Months, endDate: today };
      case 'last6months':
        const last6Months = new Date(today);
        last6Months.setMonth(today.getMonth() - 5);
        return { startDate: last6Months, endDate: today };
      case 'lastyear':
        const lastYear = new Date(today);
        lastYear.setFullYear(today.getFullYear() - 1);
        return { startDate: lastYear, endDate: today };
      default:
        return { startDate: null, endDate: null };
    }
  };

  return {
    data,
    deleteData,
    filters,
    sortByColumn,
    sortOrder,
    page,
    limit,
    search,
    totalPages,
    selectedRange,
    selectedDateRange,
    handleRangeSelectChange,
    handleDateRangeSelectChange,
    handleFilterChange,
    handleSortByColumnChange,
    handleSortOrderChange,
    handleSearchChange,
    handleLimitChange,
    handlePageChange,
    handleDeletion,
    goToFirstPage,
    goToPreviousPage,
    goToNextPage,
    goToLastPage,
  };
};
export default useResourceList;