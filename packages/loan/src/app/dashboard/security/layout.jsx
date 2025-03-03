'use client';

import { useState } from 'react';

import { DashbordSidebar, DashboardTopbar, DashboardPermissionsWrapper } from 'kifanga-ui-nav';
import { BASE_URL } from '@/helpers';

function Layout({ children }) {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  // Define dynamic menu items
  const menuItems = [
    { href: "/dashboard/security/overview", label: "Overview"},
    { href: "/dashboard/security/roles", label: "Roles"},
    { href: "/dashboard/security/permissions", label: "Permissions"},
    { href: "/dashboard/security/users", label: "Users"},
    { href: "/dashboard/security/officers", label: "Officers"},
    { href: "/dashboard/security/agents", label: "Agents"},
    { href: "/dashboard/security/groups", label: "Groups"},
  ];

  return (
    <div className="flex min-h-screen relative bg-white overflow-hidden">
      <DashbordSidebar
        isOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
        title="Management"
        menuItems={menuItems}
      />
      <div className="flex-1 flex flex-col">
        <DashboardTopbar toggleSidebar={toggleSidebar} />
        <main className="flex-1 p-6">{children}</main>
      </div>
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={toggleSidebar}
        />
      )}
    </div>
  );
}
export default DashboardPermissionsWrapper(
  BASE_URL, 
  [
    'security_overview', 
    'view_roles', 
    'create_role', 
    'edit_role', 
    'delete_role', 
    'view_permissions',
    'create_permission',
    'edit_permission',
    'delete_permission',
    'view_users',
    'edit_user'
  ]
)(Layout);