const DashboardSwitch = ({ isTableView, change, loading = false }) => {
  return (
    <button
        onClick={() => change(!isTableView)}
        className={`border rounded p-2 mb-2 md:mb-0 md:col-span-1 lg:col-span-1 focus:border-gray-400 focus:ring-2 focus:ring-gray-400 focus:outline-none transition duration-150 ease-in-out ${
            loading ? "opacity-50 cursor-not-allowed" : ""
        }`}
        disabled={loading}
    >
        {isTableView ? "Grid View" : "Table View"}
    </button>
  );
};

export default DashboardSwitch;
