'use client';

import React, { useContext, useEffect, useState, useMemo } from 'react';
import Link from 'next/link';
import { jwtDecode } from 'jwt-decode';

import { IconLogo } from 'kifanga-ui-icons';
import { AuthContext, PermissionsContext } from 'kifanga-ui-state';


const MobileNav = ({ url, first, second, userMenu, menu1, menu2, menu3, menu4, menu5 }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [menuStack, setMenuStack] = useState([]);
  const [currentMenu, setCurrentMenu] = useState(null);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleMenuClick = (item) => {
    if (item.children) {
      setMenuStack((prev) => [...prev, item]);
      setCurrentMenu(item);
    } else {
      setMenuStack([]);
      setCurrentMenu(null);
      setIsMobileMenuOpen(false);
    }
  };

  const handleBack = () => {
    const newMenuStack = menuStack.slice(0, -1);
    setMenuStack(newMenuStack);
    if (newMenuStack.length > 0) {
      setCurrentMenu(newMenuStack[newMenuStack.length - 1]);
    } else {
      setCurrentMenu(null);
    }
  };

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
    if (decodedUser) {
      const userId = decodedUser.id;
      const accessToken = userInfo.user.accessToken;
      fetchPermissions(url, userId, accessToken);
    }
  }, [userInfo, decodedUser]);

  const signoutHandler = () => {
    dispatch({ type: 'LOGOUT' });
    localStorage.removeItem('userInfo');
    localStorage.removeItem('userPermissions');
    window.location.href = '/login';
  };

  const renderUserMenu = (menu) => {
    return (
      <ul>
        {menu.map((item) => {
          // Check if user has permission for the top-level menu item
          if (userPermissions.includes(item.permission)) {
            return (
              <li key={item.title} className="py-1">
                {item.children ? (
                  <button
                    onClick={() => handleMenuClick(item)}
                    className="text-gray-600 text-left w-full flex justify-between items-center"
                  >
                    {item.title}
                    <span className="text-gray-700">►</span>
                  </button>
                ) : (
                  <Link
                    href={item.href}
                    className="text-gray-600 text-left w-full"
                    onClick={() => handleMenuClick(item)}
                  >
                    {item.title}
                  </Link>
                )}
                {/* Render child items if they exist */}
                {item.children && renderUserSubMenuItems(item.children)}
              </li>
            );
          }
          return null; // Skip rendering if the user lacks permission
        })}
      </ul>
    );
  };
  
  const renderUserSubMenuItems = (links) => {
    return links.map((link) => {
      // Check if the user has permission for the current link
      if (userPermissions.includes(link.permission)) {
        return (
          <li key={link.label}>
            {link.children ? (
              <div>
                <button
                  onClick={() => handleMenuClick(link)}
                  className="text-gray-600 text-left w-full flex justify-between items-center"
                >
                  {link.label}
                  <span className="text-gray-600">►</span>
                </button>
                <p className="text-gray-400 text-sm">{link.description}</p>
                {/* Render children only if the user has permission for the parent */}
                <ul className="ml-4">
                  {link.children
                    .filter((child) => userPermissions.includes(child.permission)) // Filter child links based on permission
                    .map((child) => (
                      <li key={child.label}>
                        <Link
                          href={child.href}
                          className="text-gray-600 text-left w-full"
                          onClick={() => handleMenuClick(child)}
                        >
                          {child.label}
                        </Link>
                        <p className="text-gray-400 text-sm">{child.description}</p>
                      </li>
                    ))}
                </ul>
              </div>
            ) : (
              <div>
                <Link
                  href={link.href}
                  className="text-gray-600 text-left w-full"
                  onClick={() => handleMenuClick(link)}
                >
                  {link.label}
                </Link>
                <p className="text-gray-400 text-sm">{link.description}</p>
              </div>
            )}
          </li>
        );
      }
      return null; // Skip rendering if no permission for main link
    });
  };
  
  
  const renderMenuItems = (menu) => {
    return menu.map((item) => (
      <li key={item.title}>
        {item.children ? (
          <button
            onClick={() => handleMenuClick(item)}
            className="text-gray-600 text-left w-full flex justify-between items-center"
          >
            {item.title}
            <span className="text-gray-700">►</span>
          </button>
        ) : (
          <Link
            href={item.href}
            className="text-gray-600 text-left w-full"
            onClick={() => handleMenuClick(item)}
          >
            {item.title}
          </Link>
        )}
      </li>
    ));
  };
  
  const renderSubMenuItems = (links) => {
    return links.map((link) => (
      <li key={link.label}>
        {link.children ? (
          <div>
            <button
              onClick={() => handleMenuClick(link)}
              className="text-gray-600 text-left w-full flex justify-between items-center"
            >
              {link.label}
              <span className="text-gray-600">►</span>
            </button>
            <p className="text-gray-400 text-sm">{link.description}</p>
          </div>
        ) : (
          <div>
            <Link
              href={link.href}
              className="text-gray-600 text-left w-full"
              onClick={() => handleMenuClick(link)}
            >
              {link.label}
            </Link>
            <p className="text-gray-400 text-sm">{link.description}</p>
          </div>
        )}
      </li>
    ));
  };

  return (
    <div>
      <div className="lg:hidden flex items-center">
        <button onClick={toggleMobileMenu} className="p-2 text-gray-700">
          {isMobileMenuOpen ? '✕' : '☰'}
        </button>
      </div>
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-gray-100 flex flex-col">
            <div className="flex justify-between items-center bg-gray-200 p-4">
                <IconLogo
                title={`${first}${second}`}
                firstPart="Fulus"
                secondPart="Africa"
                firstPartColor="#2F855A"
                secondPartColor="#4A5568"
                />
                <button 
                onClick={toggleMobileMenu} 
                className="text-gray-700 text-3xl">
                ✕
                </button>
            </div>
            <ul className="flex flex-col space-y-6 text-gray-600 text-xl p-4">
                {menuStack.length === 0 ? (
                    renderMenuItems([...menu4])
                    // renderMenuItems([...menu1, ...menu2, ...menu3, ...menu4, ...menu5])
                ) : (
                <>
                    <button onClick={handleBack} className="text-gray-600 text-xl mb-4">
                    &larr; Back
                    </button>
                    {currentMenu && renderSubMenuItems(currentMenu.children)}
                </>
                )}
            </ul>
            <ul className="flex flex-col space-y-6 text-gray-600 text-xl p-4">
                {userInfo?.user?.accessToken ? (
                    <>
                        {menuStack.length === 0 ? (
                            <>
                                {/* {renderUserMenu(userMenu)} */}
                                <li>
                                    <button
                                    onClick={signoutHandler}
                                    className="text-red-600 text-left w-full"
                                    >
                                    Sign Out
                                    </button>
                                </li>
                            </>
                    ) : (
                        <>
                        {currentMenu && renderUserSubMenuItems(currentMenu.children)}
                            <li>
                                <button
                                onClick={signoutHandler}
                                className="text-red-600 text-left w-full"
                                >
                                Sign Out
                                </button>
                            </li>
                        </>
                    )}
                    </>
                ) : (
                    <>
                        <li className="flex justify-between space-x-4">
                            <Link
                                href="/login"
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="flex-1 p-3 rounded-lg transition ease-in-out duration-300 bg-blue-600 text-white font-semibold hover:bg-blue-700 shadow-md text-center"
                            >
                                Login
                            </Link>
                            <Link
                                href="/register"
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="flex-1 p-3 rounded-lg transition ease-in-out duration-300 bg-green-600 text-white font-semibold hover:bg-green-700 shadow-md text-center"
                            >
                                Register
                            </Link>
                        </li>
                    </>
                )}
            </ul>

        </div>
      )}
    </div>
  );
};

export default MobileNav;