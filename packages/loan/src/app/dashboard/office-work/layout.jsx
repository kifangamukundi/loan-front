'use client';

import { useState } from 'react';

import { IconAdd, IconComment, IconFolder, IconHome, IconTag } from "kifanga-ui-icons";
import { DashbordSidebar, DashboardTopbar, DashboardPermissionsWrapper } from 'kifanga-ui-nav';
import { BASE_URL } from '@/helpers';

function Layout({ children }) {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  // Define dynamic menu items
  const menuItems = [
    { href: "/dashboard/office-work/overview", label: "Overview", icon: IconHome },
    { href: "/dashboard/office-work/applications", label: "Applications", icon: IconAdd },
  ];

  return (
    <div className="flex min-h-screen relative bg-white overflow-hidden">
      <DashbordSidebar
        isOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
        title="Applications"
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
    'office_overview',
  ]
)(Layout);