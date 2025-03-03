'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export function PageSelector({ totalCount, limit }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  // Calculate total pages
  const totalPages = Math.ceil(totalCount / limit);
  
  // Get the current page from URL or default to 1
  const initialPage = parseInt(searchParams.get('page')) || 1;
  const [currentPage, setCurrentPage] = useState(initialPage);

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
      updateURL(newPage);
    }
  };

  const updateURL = (value) => {
    const sp = new URLSearchParams(searchParams.toString());
    
    // Update or set the current page
    if (value > 1) {
      sp.set('page', value.toString());
    } else {
      sp.delete('page');
    }

    router.push(`${pathname}?${sp.toString()}`);
  };

  useEffect(() => {
    setCurrentPage(initialPage); // Sync state with URL on mount
  }, [initialPage]);

  return (
    <div className="w-full max-w-3xl">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[auto_auto_1fr_auto_auto] gap-2">
        <button 
          onClick={() => handlePageChange(1)} 
          disabled={currentPage === 1} 
          className="bg-white border border-gray-200 text-gray-700 py-2 px-4 rounded-lg shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition duration-200 text-sm sm:text-base"
        >
          First
        </button>
        <button 
          onClick={() => handlePageChange(currentPage - 1)} 
          disabled={currentPage === 1} 
          className="bg-white border border-gray-200 text-gray-700 py-2 px-4 rounded-lg shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition duration-200 text-sm sm:text-base"
        >
          Previous
        </button>
        <div className="col-span-1 md:col-span-2 lg:col-span-1 flex justify-center items-center">
          <span className="bg-white border border-gray-200 text-gray-700 py-2 px-4 rounded-lg shadow-sm text-sm sm:text-base">
            Page {currentPage} of {totalPages}
          </span>
        </div>
        <button 
          onClick={() => handlePageChange(currentPage + 1)} 
          disabled={currentPage === totalPages} 
          className="bg-white border border-gray-200 text-gray-700 py-2 px-4 rounded-lg shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition duration-200 text-sm sm:text-base"
        >
          Next
        </button>
        <button 
          onClick={() => handlePageChange(totalPages)} 
          disabled={currentPage === totalPages} 
          className="bg-white border border-gray-200 text-gray-700 py-2 px-4 rounded-lg shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition duration-200 text-sm sm:text-base"
        >
          Last
        </button>
      </div>
    </div>
  );
}