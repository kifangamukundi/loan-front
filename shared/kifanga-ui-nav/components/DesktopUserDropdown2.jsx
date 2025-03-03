'use client';

import Link from 'next/link';
import React, { useContext, useEffect, useMemo } from 'react';
import { jwtDecode } from 'jwt-decode';
import { IconUser } from 'kifanga-ui-icons';
import { AuthContext, PermissionsContext } from 'kifanga-ui-state';

const DesktopUserDropdown2 = ({ url }) => {
  const authContext = useContext(AuthContext);
  const { userInfo, dispatch } = authContext;

  const permissionContext = useContext(PermissionsContext);
  const { userPermissions, isLoading, fetchPermissions } = permissionContext;

  const decodedUser = useMemo(() => {
    if (userInfo && userInfo.user && userInfo.user.accessToken) {
      return jwtDecode(userInfo.user.accessToken);
    }
    return null;
  }, [userInfo]);

  useEffect(() => {
    if (decodedUser && !userPermissions) {
      const userId = decodedUser.id;
      fetchPermissions(url, userId);
    }
  }, [decodedUser, userPermissions, fetchPermissions, url]);
  

  const signoutHandler = () => {
    dispatch({ type: 'LOGOUT' });
    localStorage.removeItem('userInfo');
    localStorage.removeItem('userPermissions');
    window.location.href = '/login';
  };

  return (
    <div className="relative group hidden lg:block px-3 py-2 cursor-pointer">
      <div className="flex items-center space-x-2 hover:opacity-50">
        <IconUser />
      </div>
      {userInfo?.user?.accessToken ? (
        <div className="absolute top-0 right-0 transition group-hover:translate-y-5 translate-y-0 opacity-0 invisible group-hover:opacity-100 group-hover:visible duration-500 ease-in-out group-hover:transform z-50 min-w-[180px] transform">
          <div className="relative top-6 p-6 bg-white rounded-xl shadow-xl w-full">
            <div className="w-10 h-10 bg-white transform rotate-45 absolute top-0 z-0 -translate-x-4 transition-transform group-hover:translate-x-3 duration-500 ease-in-out rounded-sm"></div>
            <div className="relative z-10">
              <ul className="text-[15px]">
                {/* Render options based on permissions */}
                {userPermissions?.includes('office_overview') && (
                  <li className="py-1">
                    <Link
                      href="/dashboard/office-work/overview"
                      className="block p-3 -mx-2 rounded-lg transition ease-in-out duration-300 bg-white text-gray-800 font-semibold hover:bg-gradient-to-r hover:from-green-50 hover:to-green-100 hover:via-green-200 hover:text-green-800 shadow-md"
                    >
                      Applications Section
                    </Link>
                  </li>
                )}
                {userPermissions?.includes('field_overview') && (
                  <li className="py-1">
                    <Link
                      href="/dashboard/field-work/overview"
                      className="block p-3 -mx-2 rounded-lg transition ease-in-out duration-300 bg-white text-gray-800 font-semibold hover:bg-gradient-to-r hover:from-green-50 hover:to-green-100 hover:via-green-200 hover:text-green-800 shadow-md"
                    >
                      Tasks Section
                    </Link>
                  </li>
                )}
                {userPermissions?.includes('data_collection_overview') && (
                  <li className="py-1">
                    <Link
                      href="/dashboard/data/overview"
                      className="block p-3 -mx-2 rounded-lg transition ease-in-out duration-300 bg-white text-gray-800 font-semibold hover:bg-gradient-to-r hover:from-green-50 hover:to-green-100 hover:via-green-200 hover:text-green-800 shadow-md"
                    >
                      Data Section
                    </Link>
                  </li>
                )}
                {userPermissions?.includes('security_overview') && (
                  <li className="py-1">
                    <Link
                      href="/dashboard/security/overview"
                      className="block p-3 -mx-2 rounded-lg transition ease-in-out duration-300 bg-white text-gray-800 font-semibold hover:bg-gradient-to-r hover:from-green-50 hover:to-green-100 hover:via-green-200 hover:text-green-800 shadow-md"
                    >
                      Security Section
                    </Link>
                  </li>
                )}
                <li className="py-1">
                  <button
                    onClick={signoutHandler}
                    className="block p-2 -mx-2 rounded-lg hover:bg-gradient-to-br hover:from-indigo-50 hover:to-pink-50 hover:via-blue-50 transition ease-in-out duration-300 text-gray-800 font-semibold hover:text-indigo-600"
                  >
                    Sign Out
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      ) : (
        <div className="absolute top-0 right-0 transition group-hover:translate-y-5 translate-y-0 opacity-0 invisible group-hover:opacity-100 group-hover:visible duration-500 ease-in-out group-hover:transform z-50 min-w-[180px] transform">
          <div className="relative top-6 p-6 bg-white rounded-xl shadow-xl w-full">
            <div className="w-10 h-10 bg-white transform rotate-45 absolute top-0 z-0 -translate-x-4 transition-transform group-hover:translate-x-3 duration-500 ease-in-out rounded-sm"></div>
            <div className="relative z-10">
              <ul className="text-[15px]">
                <li className="py-1">
                  <Link
                    href="/login"
                    className="block p-3 -mx-2 rounded-lg transition ease-in-out duration-300 bg-white text-gray-800 font-semibold hover:bg-gradient-to-r hover:from-green-50 hover:to-green-100 hover:via-green-200 hover:text-green-800 shadow-md"
                  >
                    Sign In
                  </Link>
                </li>
                <li className="py-1">
                  <Link
                    href="/register"
                    className="block p-3 -mx-2 rounded-lg transition ease-in-out duration-300 bg-white text-gray-800 font-semibold hover:bg-gradient-to-r hover:from-green-50 hover:to-green-100 hover:via-green-200 hover:text-green-800 shadow-md"
                  >
                    Register
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DesktopUserDropdown2;
