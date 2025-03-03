import Link from 'next/link';
import { IconAdd, IconHelp } from "kifanga-ui-icons";
import DashboardCircleSpinner from './DashboardCircleSpinner';

const DashboardAddNewItem = ({ title, link, loading = false, tips }) => {
  return (
    <div className="flex justify-end mb-4 space-x-4">
      {title && link && (
        <Link href={loading ? '#' : link}>
          <button
            className={`bg-green-600 text-white px-4 py-2 rounded flex items-center transition-opacity duration-200 ${
              loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-green-700'
            }`}
            disabled={loading}
          >
            {loading ? (
              <DashboardCircleSpinner color="white" />
            ) : (
              <>
                <IconAdd className="h-5 w-5 mr-2" /> {title}
              </>
            )}
          </button>
        </Link>
      )}
      {tips && (
        <button
          className={`bg-gray-300 text-black px-4 py-2 rounded flex items-center transition-opacity duration-200 hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          onClick={tips}
          disabled={loading}
        >
          Tips <IconHelp className="h-5 w-5" />
        </button>
      )}
    </div>
  );
};

export default DashboardAddNewItem;
