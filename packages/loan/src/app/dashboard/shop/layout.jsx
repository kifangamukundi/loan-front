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
    { href: "/dashboard/shop/overview", label: "Overview", icon: IconHome },
    { href: "/dashboard/shop/products", label: "Products", icon: IconAdd },
    { href: "/dashboard/shop/categories", label: "Categories", icon: IconFolder },
    { href: "/dashboard/shop/tags", label: "Tags", icon: IconTag },
    { href: "/dashboard/shop/comments", label: "Comments", icon: IconComment },
  ];

  return (
    <div className="flex min-h-screen relative bg-white overflow-hidden">
      <DashbordSidebar
        isOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
        title="Shop Section"
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
    'blog_overview', 
    'view_posts', 
    'create_post', 
    'edit_post', 
    'delete_post',
    'view_categories',
    'create_category',
    'edit_category',
    'delete_category',
    'view_tags',
    'create_tag',
    'edit_tag',
    'delete_tag',
  ]
)(Layout);