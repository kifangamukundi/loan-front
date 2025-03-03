import React from 'react';

const DashboardRadioGroup = ({
  label,
  name,
  options,
  value,
  onChange,
  radiosPerLine = 2,
}) => {
  const getGridClass = () => {
    switch (radiosPerLine) {
      case 1:
        return 'grid-cols-1'; // For mobile
      case 2:
        return 'grid-cols-2 md:grid-cols-2 lg:grid-cols-2'; // For small devices and up
      case 3:
        return 'grid-cols-2 md:grid-cols-3 lg:grid-cols-3'; // 2 on small, 3 on medium and up
      case 4:
        return 'grid-cols-2 md:grid-cols-4 lg:grid-cols-4'; // 2 on small, 4 on medium and up
      case 5:
        return 'grid-cols-2 md:grid-cols-5 lg:grid-cols-5'; // 2 on small, 5 on medium and up
      case 6:
        return 'grid-cols-2 md:grid-cols-6 lg:grid-cols-6'; // 2 on small, 6 on medium and up
      default:
        return 'grid-cols-2'; // Fallback to 2 if not specified
    }
  };

  const handleRadioChange = (value) => {
    onChange(value); // Call the provided onChange with the new value
  };

  return (
    <div className="mb-4">
      <label className="block text-lg font-medium mb-2">{label}</label>
      <div className={`grid ${getGridClass()} gap-4`}>
        {options.map((option) => (
          <label key={option.value} className="flex items-center cursor-pointer hover:bg-gray-300">
            <input
              type="radio"
              name={name}
              value={option.value}
              checked={value === option.value}
              onChange={() => handleRadioChange(option.value)} // Use the new handler here
              className="hidden peer"
            />
            <div
              className={`flex items-center justify-center border-2 rounded-md p-2 transition duration-150 ease-in-out 
              w-full ${value === option.value ? 'border-lime-500 bg-lime-100' : 'border-gray-300'}`}
            >
              <span className="mr-2">{option.label}</span>
              {value === option.value && (
                <span className="ml-1 text-green-800 font-bold">✓</span>
              )}
            </div>
          </label>
        ))}
      </div>
    </div>
  );
};

export default DashboardRadioGroup;