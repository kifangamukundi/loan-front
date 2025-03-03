'use client'

import React, { useContext, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { AuthContext, PermissionsContext } from 'kifanga-ui-state';
import { DashboardLayoutSkeleton } from '.';

const DashboardPermissionsWrapper = (
  url,
  allowedPermissions,
  redirectPath = '/login',
  unauthorizedPath = '/unauthorized'
) => (WrappedComponent) => {
  return function ProtectedRouteWrapper(props) {
    const authContext = useContext(AuthContext) || {};
    const { userInfo } = authContext;
    const router = useRouter();
    const pathname = usePathname();
    const permissionContext = useContext(PermissionsContext);
    const { userPermissions, isLoading, fetchPermissions } = permissionContext;

    useEffect(() => {
      const timeoutDuration = 2000;
      let timeoutId;

      const delayRedirect = (path) =>
        new Promise((resolve) => {
          timeoutId = setTimeout(() => resolve(path), timeoutDuration);
        });

      const checkUserPermissions = async () => {
        if (!userInfo || !userInfo.user || !userInfo.user.accessToken) {
          localStorage.setItem('intendedDestination', pathname);
          const delayedPath = await delayRedirect(redirectPath);
          router.prefetch(delayedPath);
          router.replace(delayedPath);
          return;
        }

        clearTimeout(timeoutId);

        try {
          // Fetch permissions if not already fetched
          if (isLoading) {
            await fetchPermissions(url);
          }

          // Wait until permissions are fully loaded
          if (allowedPermissions.length > 0) {
            const hasPermission = allowedPermissions.every((permission) =>
              userPermissions.includes(permission)
            );

            if (!hasPermission) {
              const delayedPath = await delayRedirect(unauthorizedPath);
              router.prefetch(delayedPath);
              router.replace(delayedPath);
              return;
            }
          }
        } catch (error) {
          localStorage.setItem('intendedDestination', pathname);
          const delayedPath = await delayRedirect(redirectPath);
          router.prefetch(delayedPath);
          router.replace(delayedPath);
        }
      };

      const performCheck = async () => {
        if (!isLoading) {
          await checkUserPermissions();
        }
      };

      performCheck();

      return () => clearTimeout(timeoutId);
    }, [
      userInfo,
      userPermissions,
      isLoading,
      allowedPermissions,
      redirectPath,
      unauthorizedPath,
      router,
      pathname,
    ]);

    if (isLoading || !userInfo) {
      return <DashboardLayoutSkeleton />;
    }

    return <WrappedComponent {...props} permissions={userPermissions} />;
  };
};

export default DashboardPermissionsWrapper;
