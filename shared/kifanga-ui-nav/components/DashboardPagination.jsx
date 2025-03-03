'use client';

import { IconLeft, IconPageFirst, IconPageLast, IconRight } from "kifanga-ui-icons";

const DashboardPagination = ({ data, goToFirstPage, goToPreviousPage, goToNextPage, goToLastPage, page, totalPages }) => {
  return (
    <div className="flex justify-center mt-4">

        <button
            onClick={goToFirstPage} 
            disabled={data.loading || page === 1} 
            className="bg-gray-300 text-black px-4 py-2 rounded flex items-center transition-opacity duration-200 
                    hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300 
                    disabled:bg-gray-400 disabled:text-gray-200 disabled:cursor-not-allowed disabled:hover:bg-gray-400"
        >
            <IconPageFirst className="h-5 w-5 mr-2" /> First
        </button>

        <button
            onClick={goToPreviousPage} 
            disabled={data.loading || page === 1} 
            className="bg-gray-300 text-black px-4 py-2 rounded flex items-center transition-opacity duration-200 
                    hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300 
                    disabled:bg-gray-400 disabled:text-gray-200 disabled:cursor-not-allowed disabled:hover:bg-gray-400 ml-2"
        >
            <IconLeft className="h-5 w-5 mr-2" /> Previous
        </button>

        <span className="flex items-center ml-2">{page}</span>

        <button
            onClick={goToNextPage} 
            disabled={data.loading || page === totalPages} 
            className="bg-gray-300 text-black px-4 py-2 rounded flex items-center transition-opacity duration-200 
                    hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300 
                    disabled:bg-gray-400 disabled:text-gray-200 disabled:cursor-not-allowed disabled:hover:bg-gray-400 ml-2"
        >
            Next <IconRight className="h-5 w-5 ml-2" />
        </button>

        <button
            onClick={goToLastPage} 
            disabled={data.loading || page === totalPages} 
            className="bg-gray-300 text-black px-4 py-2 rounded flex items-center transition-opacity duration-200 
                    hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300 
                    disabled:bg-gray-400 disabled:text-gray-200 disabled:cursor-not-allowed disabled:hover:bg-gray-400 ml-2"
        >
            Last <IconPageLast className="h-5 w-5 ml-2" />
        </button>
    </div>
  );
};

export default DashboardPagination;