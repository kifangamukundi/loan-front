export default function DashboardAroundSpinner({ loading, children }) {
  return (
    <div className="relative py-6 rounded-lg">
      {loading && (
        <>
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-gray-400 via-gray-500 to-gray-600 animate-pulse z-10 rounded-t-lg"></div>
          <div className="absolute bottom-0 left-0 w-full h-2 bg-gradient-to-l from-gray-400 via-gray-500 to-gray-600 animate-pulse z-10 rounded-b-lg"></div>
          {/* <div className="absolute top-0 left-0 h-full w-1 bg-gradient-to-b from-gray-400 via-gray-500 to-gray-600 animate-pulse z-10 rounded-l-lg"></div> */}
          {/* <div className="absolute top-0 right-0 h-full w-1 bg-gradient-to-t from-gray-400 via-gray-500 to-gray-600 animate-pulse z-10 rounded-r-lg"></div> */}
        </>
      )}
      {children}
    </div>
  );
}