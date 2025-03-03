const DashbordLimit = ({ limit, change, options, loading = false }) => {
  return (
    <select 
      value={limit}
      onChange={change}
      className={`border rounded p-2 mb-2 md:mb-0 md:col-span-1 lg:col-span-1 focus:border-gray-400 focus:ring-2 focus:ring-gray-400 focus:outline-none transition duration-150 ease-in-out ${
        loading ? 'opacity-50 cursor-not-allowed' : ''
      }`}
      disabled={loading}
    >
      {options?.map((option) => (
        <option key={option.value} value={option.value}>
          Show {option.label}
        </option>
      ))}
    </select>
  );
};

export default DashbordLimit;