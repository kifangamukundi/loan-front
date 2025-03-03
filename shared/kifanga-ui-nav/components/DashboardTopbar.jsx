'use client';

import { IconMenu } from "kifanga-ui-icons";

const DashboardTopbar = ({ toggleSidebar }) => {
  return (
    <div className="bg-white h-16 flex items-center justify-between px-6">
      <button className="lg:hidden" onClick={toggleSidebar}>
        <IconMenu className="h-6 w-6 text-gray-600" />
      </button>
    </div>
  );
};

export default DashboardTopbar;