import { IconAdd, IconDelete, IconEdit, IconToggleOff, IconToggleOn } from 'kifanga-ui-icons';
import React from 'react';

const DashboardCheckboxGroupExtended = ({
  label,
  name,
  options,
  selectedValues,
  onChange,
  checkboxesPerLine = 2,
  onDelete=true,
  onEdit=true,
  handleDelete, 
  handleEdit,
  handleAdd,
}) => {
  const getGridClass = () => {
    switch (checkboxesPerLine) {
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

  const handleCheckboxChange = (value) => {
    if (selectedValues.includes(value)) {
      onChange(selectedValues.filter((v) => v !== value));
    } else {
      onChange([...selectedValues, value]);
    }
  };

  const handleSelectAllChange = () => {
    const allSelected = options.every((option) => selectedValues.includes(option.value));
    if (allSelected) {
      onChange([]);
    } else {
      const allOptionValues = options.map((option) => option.value);
      onChange(allOptionValues);
    }
  };

  const allSelected = options.every((option) => selectedValues.includes(option.value));

  return (
    <div className="mb-4">
      <label className="block text-lg font-medium mb-2">{label}</label>
      <div className="flex justify-between items-center mb-4">
        <label className="flex items-center">
          <div onClick={handleSelectAllChange} className="cursor-pointer flex items-center">
            {allSelected ? (
              <IconToggleOn className="mr-2 text-green-600" title={`Deselect All`} />
            ) : (
              <IconToggleOff className="mr-2 text-gray-600" title={`Select All`} />
            )}
            <span className={`text-gray-700 ${allSelected ? 'font-bold' : ''}`}>
              {allSelected ? 'Deselect All' : 'Select All'}
            </span>
          </div>
        </label>
        <button
          className={`flex items-center justify-center w-40 px-4 py-2 rounded-lg bg-gray-300 text-gray-700 hover:bg-gray-400 font-medium`}
          onClick={() => handleAdd()}
          type='button'
        >
          <IconAdd className="h-5 w-5" />
          <span className="ml-2">Add</span>
        </button>
      </div>

      <div className={`grid ${getGridClass()} gap-4`}>
        {options.map((option) => (
          <div key={option.value} className="flex flex-col items-start">
            <label className="flex items-center w-full">
              <input
                type="checkbox"
                name={name}
                value={option.value}
                checked={selectedValues.includes(option.value)}
                onChange={() => handleCheckboxChange(option.value)}
                className="hidden peer"
              />
              <div
                className={`flex items-center justify-center border-2 rounded-md p-2 transition duration-150 ease-in-out 
                w-full ${selectedValues.includes(option.value) ? 'border-lime-500 bg-lime-100' : 'border-gray-300'}`}
              >
                <span className="mr-2">{option.label}</span>
                {selectedValues.includes(option.value) && (
                  <span className="ml-1 text-green-500 font-bold">✓</span>
                )}
              </div>
            </label>
            <div className="mt-2 flex justify-between w-full">
                {onEdit && (
                    <button type="button" onClick={() => handleEdit(option)} className="text-gray-600 hover:underline hover:text-green-600">
                        <IconEdit className="h-5 w-5" />
                    </button>
                )}
                {onDelete && (
                <button type="button" onClick={() => handleDelete(option)} className="text-gray-600 hover:underline hover:text-green-600">
                    <IconDelete className="h-5 w-5" />
                </button> 
                )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardCheckboxGroupExtended;