import React from 'react';

export default function DashboardInput({
  label,
  type = "text",
  name,
  value,
  onChange,
  placeholder,
  preventDefaultPaste = false,
  autoComplete = true,
  disabled = false,
  width = "md:w-full",
  error,
}) {
  const handlePaste = (e) => {
    if (preventDefaultPaste) {
      e.preventDefault();
    }
  };

  return (
    <div className={`mb-4 w-full ${width}`}>
      <label className={`block text-lg font-medium mb-2 ${disabled ? 'text-gray-400' : ''}`} htmlFor={name}>
        {label}
      </label>
      {error && (
        <div className="text-red-500 text-sm mt-1">
          {error.map((err, index) => (
            <p key={index}>{err}</p>
          ))}
        </div>
      )}
      <input
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        onPaste={handlePaste}
        autoComplete={autoComplete ? 'on' : 'off'}
        disabled={disabled}
        className={`w-full border rounded-md p-2 transition duration-150 ease-in-out 
          ${disabled 
            ? 'bg-gray-200 text-gray-500 cursor-not-allowed border-gray-300' 
            : 'border-gray-300 focus:border-gray-400 focus:ring-2 focus:ring-gray-400 focus:outline-none'}`}
      />
    </div>
  );
}
