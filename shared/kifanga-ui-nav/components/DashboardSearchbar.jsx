const DashboardSearchbar = ({ placeholder, search, change }) => {
  return (
    <input
        type="text"
        placeholder={placeholder}
        value={search}
        onChange={change}
        className="border rounded p-2 mb-2 md:mb-0 md:col-span-2 lg:col-span-2 focus:border-gray-400 focus:ring-2 focus:ring-gray-400 focus:outline-none transition duration-150 ease-in-out"
    />
  );
};

export default DashboardSearchbar;