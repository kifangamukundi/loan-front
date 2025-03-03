import React from 'react';

const DashboardSelectInput = ({
  label,
  item,
  change,
  options,
  width = "md:w-full",
  disabled = false,
  placeholder = "Select an option",
}) => {
  return (
    <div className={`mb-4 w-full ${width}`}>
      {label && (
        <label
          className={`block text-lg font-medium mb-2 ${disabled ? 'text-gray-400' : ''}`}
          htmlFor={item}
        >
          {label}
        </label>
      )}
      <select
        value={item}
        onChange={change}
        disabled={disabled}
        className={`border rounded-md p-2 transition duration-150 ease-in-out w-full
          ${disabled 
            ? 'bg-gray-200 text-gray-500 cursor-not-allowed border-gray-300' 
            : 'border-gray-300 focus:border-gray-400 focus:ring-2 focus:ring-gray-400 focus:outline-none'}`}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options?.map((option) => (
          <option key={option.id} value={option.id}>
            {option.title}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DashboardSelectInput;