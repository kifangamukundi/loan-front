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
    { href: "/dashboard/data/overview", label: "Overview"},
    { href: "/dashboard/data/countries", label: "Countries"},
    { href: "/dashboard/data/regions", label: "Regions"},

    { href: "/dashboard/data/counties", label: "Counties"},
    { href: "/dashboard/data/subcounties", label: "Sub Counties"},
    { href: "/dashboard/data/wards", label: "Wards"},
    { href: "/dashboard/data/locations", label: "Locations"},
    { href: "/dashboard/data/sublocations", label: "Sub Locations"},
    { href: "/dashboard/data/villages", label: "Villages"},
    { href: "/dashboard/data/roads", label: "Roads"},
    { href: "/dashboard/data/plots", label: "Plots"},
    { href: "/dashboard/data/units", label: "Units"},
  ];

  return (
    <div className="flex min-h-screen relative bg-white overflow-hidden">
      <DashbordSidebar
        isOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
        title="Data"
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
    'data_collection_overview',
  ]
)(Layout);