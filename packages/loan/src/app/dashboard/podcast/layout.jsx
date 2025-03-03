'use client';

import { useState } from 'react';

import { IconApple, IconGoogle, IconHome, IconSpotify } from "kifanga-ui-icons";
import { DashbordSidebar, DashboardTopbar, DashboardPermissionsWrapper } from 'kifanga-ui-nav';
import { BASE_URL } from '@/helpers';

function Layout({ children }) {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  // Define dynamic menu items
  const menuItems = [
    { href: "/dashboard/podcast/overview", label: "Overview", icon: IconHome },
    { href: "/dashboard/podcast/spotify", label: "Spotify", icon: IconSpotify },
    { href: "/dashboard/podcast/apple", label: "Apple", icon: IconApple },
    { href: "/dashboard/podcast/google", label: "Google", icon: IconGoogle },
  ];

  return (
    <div className="flex min-h-screen relative bg-white overflow-hidden">
      <DashbordSidebar
        isOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
        title="Podcast Section"
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
    'view_categories', 
  ]
)(Layout);