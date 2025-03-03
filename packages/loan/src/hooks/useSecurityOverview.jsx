import { useEffect, useReducer, useCallback } from 'react';
import { DashboardGetError } from 'kifanga-ui-nav';
import { useAuth, useDebounce } from 'kifanga-ui-hooks';
import { fetchReducer } from 'kifanga-ui-state';
import { BASE_URL } from '@/helpers';

const useSecurityOverview = () => {
  const [rolesByUser, rolesByUserDispatch] = useReducer(fetchReducer, {
    data: [],
    loading: false,
    success: false,
    error: null,
  });

  const [permissionsByRoles, permissionsByRolesDispatch] = useReducer(fetchReducer, {
    data: [],
    loading: false,
    success: false,
    error: null,
  });

  const [usersByMonth, usersByMonthDispatch] = useReducer(fetchReducer, {
    data: [],
    loading: false,
    success: false,
    error: null,
  });

  const [agentsCount, agentsCountDispatch] = useReducer(fetchReducer, {
    data: [],
    loading: false,
    success: false,
    error: null,
  });

  const [officersCount, officersCountDispatch] = useReducer(fetchReducer, {
    data: [],
    loading: false,
    success: false,
    error: null,
  });

  const [usersCount, usersCountDispatch] = useReducer(fetchReducer, {
    data: [],
    loading: false,
    success: false,
    error: null,
  });

  const [rolesCount, rolesCountDispatch] = useReducer(fetchReducer, {
    data: [],
    loading: false,
    success: false,
    error: null,
  });

  const [permissionsCount, permissionsCountDispatch] = useReducer(fetchReducer, {
    data: [],
    loading: false,
    success: false,
    error: null,
  });

  const [groupsCount, groupsCountDispatch] = useReducer(fetchReducer, {
    data: [],
    loading: false,
    success: false,
    error: null,
  });

  const { axiosInstance } = useAuth(BASE_URL);

  const fetchRolesByUser = useCallback(async () => {
    rolesByUserDispatch({ type: 'FETCH_RESET' });
    rolesByUserDispatch({ type: 'FETCH_REQUEST' });

    try {
      const { data } = await axiosInstance.get(`${BASE_URL}/roles/by/users`);

      rolesByUserDispatch({ type: 'FETCH_SUCCESS', payload: data.data });
    } catch (err) {
      const errorPayload = DashboardGetError(err);
      rolesByUserDispatch({ type: 'FETCH_FAIL', payload: errorPayload });
    }
  }, [axiosInstance]);

  const debouncedFetchData = useDebounce(fetchRolesByUser, 250);

  const fetchPermissionsByRoles = useCallback(async () => {
    permissionsByRolesDispatch({ type: 'FETCH_RESET' });
    permissionsByRolesDispatch({ type: 'FETCH_REQUEST' });

    try {
      const { data } = await axiosInstance.get(`${BASE_URL}/permissions/by/roles`);

      permissionsByRolesDispatch({ type: 'FETCH_SUCCESS', payload: data.data });
    } catch (err) {
      const errorPayload = DashboardGetError(err);
      permissionsByRolesDispatch({ type: 'FETCH_FAIL', payload: errorPayload });
    }
  }, [axiosInstance]);

  const debouncedFetchData2 = useDebounce(fetchPermissionsByRoles, 250);

  const fetchUsersByMonth = useCallback(async () => {
    usersByMonthDispatch({ type: 'FETCH_RESET' });
    usersByMonthDispatch({ type: 'FETCH_REQUEST' });

    try {
      const { data } = await axiosInstance.get(`${BASE_URL}/users/by/month`);

      usersByMonthDispatch({ type: 'FETCH_SUCCESS', payload: data.data });
    } catch (err) {
      const errorPayload = DashboardGetError(err);
      usersByMonthDispatch({ type: 'FETCH_FAIL', payload: errorPayload });
    }
  }, [axiosInstance]);

  const debouncedFetchData3 = useDebounce(fetchUsersByMonth, 250);

  const fetchAgentsCount = useCallback(async () => {
    agentsCountDispatch({ type: 'FETCH_RESET' });
    agentsCountDispatch({ type: 'FETCH_REQUEST' });

    try {
      const { data } = await axiosInstance.get(`${BASE_URL}/agents/by/count`);

      agentsCountDispatch({ type: 'FETCH_SUCCESS', payload: data.data });
    } catch (err) {
      const errorPayload = DashboardGetError(err);
      agentsCountDispatch({ type: 'FETCH_FAIL', payload: errorPayload });
    }
  }, [axiosInstance]);

  const debouncedFetchData4 = useDebounce(fetchAgentsCount, 250);

  const fetchOfficersCount = useCallback(async () => {
    officersCountDispatch({ type: 'FETCH_RESET' });
    officersCountDispatch({ type: 'FETCH_REQUEST' });

    try {
      const { data } = await axiosInstance.get(`${BASE_URL}/officers/by/count`);

      officersCountDispatch({ type: 'FETCH_SUCCESS', payload: data.data });
    } catch (err) {
      const errorPayload = DashboardGetError(err);
      officersCountDispatch({ type: 'FETCH_FAIL', payload: errorPayload });
    }
  }, [axiosInstance]);

  const debouncedFetchData5 = useDebounce(fetchOfficersCount, 250);

  const fetchUsersCount = useCallback(async () => {
    usersCountDispatch({ type: 'FETCH_RESET' });
    usersCountDispatch({ type: 'FETCH_REQUEST' });

    try {
      const { data } = await axiosInstance.get(`${BASE_URL}/users/by/count`);

      usersCountDispatch({ type: 'FETCH_SUCCESS', payload: data.data });
    } catch (err) {
      const errorPayload = DashboardGetError(err);
      usersCountDispatch({ type: 'FETCH_FAIL', payload: errorPayload });
    }
  }, [axiosInstance]);

  const debouncedFetchData6 = useDebounce(fetchUsersCount, 250);

  const fetchRolesCount = useCallback(async () => {
    rolesCountDispatch({ type: 'FETCH_RESET' });
    rolesCountDispatch({ type: 'FETCH_REQUEST' });

    try {
      const { data } = await axiosInstance.get(`${BASE_URL}/roles/by/count`);

      rolesCountDispatch({ type: 'FETCH_SUCCESS', payload: data.data });
    } catch (err) {
      const errorPayload = DashboardGetError(err);
      rolesCountDispatch({ type: 'FETCH_FAIL', payload: errorPayload });
    }
  }, [axiosInstance]);

  const debouncedFetchData7 = useDebounce(fetchRolesCount, 250);

  const fetchPermissionsCount = useCallback(async () => {
    permissionsCountDispatch({ type: 'FETCH_RESET' });
    permissionsCountDispatch({ type: 'FETCH_REQUEST' });

    try {
      const { data } = await axiosInstance.get(`${BASE_URL}/permissions/by/count`);

      permissionsCountDispatch({ type: 'FETCH_SUCCESS', payload: data.data });
    } catch (err) {
      const errorPayload = DashboardGetError(err);
      permissionsCountDispatch({ type: 'FETCH_FAIL', payload: errorPayload });
    }
  }, [axiosInstance]);

  const debouncedFetchData8 = useDebounce(fetchPermissionsCount, 250);

  const fetchGroupsCount = useCallback(async () => {
    groupsCountDispatch({ type: 'FETCH_RESET' });
    groupsCountDispatch({ type: 'FETCH_REQUEST' });

    try {
      const { data } = await axiosInstance.get(`${BASE_URL}/groups/by/count`);

      groupsCountDispatch({ type: 'FETCH_SUCCESS', payload: data.data });
    } catch (err) {
      const errorPayload = DashboardGetError(err);
      groupsCountDispatch({ type: 'FETCH_FAIL', payload: errorPayload });
    }
  }, [axiosInstance]);

  const debouncedFetchData9 = useDebounce(fetchGroupsCount, 250);

  useEffect(() => {
    debouncedFetchData();
    debouncedFetchData2();
    debouncedFetchData3();
    debouncedFetchData4();
    debouncedFetchData5();
    debouncedFetchData6();
    debouncedFetchData7();
    debouncedFetchData8();
    debouncedFetchData9();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    rolesByUser,
    permissionsByRoles,
    usersByMonth,
    agentsCount,
    officersCount,
    usersCount,
    rolesCount,
    permissionsCount,
    groupsCount,
  };
};

export default useSecurityOverview;