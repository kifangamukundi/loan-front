import React from "react";

const DashboardAdvancedCardSkeleton = ({ limit = 3 }) => {
  const skeletonItems = Array(limit).fill(0); // Creates an array with 'limit' number of items

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {skeletonItems.map((_, index) => (
        <div
          key={index}
          className="border rounded shadow mb-4 flex flex-col h-full animate-pulse"
        >
          {/* Image placeholder */}
          <div className="w-full h-48 bg-gray-300 rounded-t"></div>

          {/* Title placeholder */}
          <div className="p-4 flex flex-col flex-grow">
            <div className="h-6 bg-gray-300 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-gray-300 rounded w-1/2"></div>
          </div>

          {/* Buttons placeholders */}
          <div className="mt-4 flex justify-between p-4 border-t">
            <div className="h-5 w-5 bg-gray-300 rounded"></div>
            <div className="h-5 w-5 bg-gray-300 rounded"></div>
            <div className="h-5 w-5 bg-gray-300 rounded"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DashboardAdvancedCardSkeleton;
