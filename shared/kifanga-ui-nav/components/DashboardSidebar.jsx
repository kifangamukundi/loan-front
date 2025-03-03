'use client';

import Link from "next/link";
import { usePathname } from 'next/navigation';
import { IconClose } from "kifanga-ui-icons";

const DashbordSidebar = ({ isOpen, toggleSidebar, title, menuItems }) => {
  const pathname = usePathname();
  const isActive = (path) => path === pathname;

  return (
    <div
      className={`fixed inset-y-0 left-0 transform ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } transition-transform duration-300 ease-in-out w-64 bg-white text-gray-600 flex flex-col z-40 lg:relative lg:translate-x-0 lg:z-auto`}
    >
      <div className="flex items-center justify-between h-16 px-4">
        <h1 className="text-2xl font-semibold">{title}</h1>
        <button className="lg:hidden" onClick={toggleSidebar}>
          <IconClose className="h-6 w-6 text-gray-600" />
        </button>
      </div>
      <nav className="flex-1 px-4 py-6">
        {menuItems.map(({ href, label }, index) => {
          const circleColor = isActive(href) ? "#4CAF50" : "#9E9E9E";

          return (
            <Link
              key={index}
              href={href}
              className={`flex items-center mb-4 p-2 text-lg font-bold rounded ${
                isActive(href) ? 'bg-gray-200 text-green-800' : 'text-gray-700 hover:bg-gray-200'
              }`}
              onClick={() => {
                toggleSidebar();
              }}
            >
              <div
                className="h-6 w-6 mr-3 rounded-full"
                style={{ backgroundColor: circleColor }}
              />
              {label}
            </Link>
          );
        })}
      </nav>
    </div>
  );
};

export default DashbordSidebar;