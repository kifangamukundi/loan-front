import { useState, useEffect } from 'react';
import { useDarkMode } from 'kifanga-ui-state';

const useRadioObject = (options, perRow, preSelectedOption = null) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const { darkMode } = useDarkMode();

  useEffect(() => {
    setSelectedOption(preSelectedOption);
  }, [preSelectedOption]);

  const handleRadioChange = (option) => {
    setSelectedOption(option);
  };

  const radios = options?.map((option) => (
    <div className={`w-full ${perRow} mb-4 md:pl-2 sm:pl-0 text-md`} key={`${option.title}_${option.id}`}>
      <label
        htmlFor={`${option.title}_${option.id}`}
        className={`flex items-center p-3 rounded-md cursor-pointer transition-colors ${
          darkMode
            ? selectedOption?.id === option.id
              ? 'bg-gray-700 text-white border border-gray-500 hover:bg-gray-600'
              : 'bg-gray-800 text-white border border-gray-600 hover:bg-gray-700'
            : selectedOption?.id === option.id
            ? 'bg-gray-300 text-gray-700 border border-gray-300 hover:bg-gray-300'
            : 'bg-gray-100 text-gray-700 border border-gray-300 hover:bg-gray-300'
        }`}
      >
        <input
          type="radio"
          className="radio-button w-5 h-5"
          name={option.title}
          value={option.title}
          checked={selectedOption?.id === option.id}
          onChange={() => handleRadioChange(option)}
          id={`${option.title}_${option.id}`}
        />
        <span className={`ml-3 font-semibold text-lg ${darkMode ? 'text-white' : 'text-gray-800'}`}>
          {option.title}
        </span>
      </label>
    </div>
  ));

  return [selectedOption, radios];
};

export default useRadioObject;
