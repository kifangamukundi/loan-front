import React from "react";

const DashboardGenericCardSkeleton = ({ limit = 3, view = true, edit = true, del = true }) => {
  const skeletonItems = Array(limit).fill(0);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {skeletonItems.map((_, index) => (
        <div
          key={index}
          className="border p-4 rounded shadow mb-4 flex flex-col justify-between h-full animate-pulse"
        >
          {/* Title placeholder */}
          <div className="w-3/4 h-6 bg-gray-300 rounded mb-4"></div>

          {/* Buttons placeholders */}
          <div className="flex justify-between mt-4">
            {view && (
              <div className="h-5 w-5 bg-gray-300 rounded"></div>
            )}
            {edit && (
              <div className="h-5 w-5 bg-gray-300 rounded"></div>
            )}
            {del && (
              <div className="h-5 w-5 bg-gray-300 rounded"></div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default DashboardGenericCardSkeleton;