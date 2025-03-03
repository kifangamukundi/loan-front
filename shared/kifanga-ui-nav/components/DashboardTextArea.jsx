import React from 'react';

export default function DashboardTextArea({
  label,
  name,
  value,
  onChange,
  placeholder,
  preventDefaultPaste = false,
  autoComplete = true,
  disabled = false,
  width = "md:w-full",
  rows = 4,
  error,
}) {
  const handlePaste = (e) => {
    if (preventDefaultPaste) {
      e.preventDefault();
    }
  };

  return (
    <div className={`mb-4 w-full ${width}`}>
      <label className="block text-lg font-medium mb-2" htmlFor={name}>
        {label}
      </label>
      {error && (
        <div className="text-red-500 text-sm mt-1">
          {error.map((err, index) => (
            <p key={index}>{err}</p>
          ))}
        </div>
      )}
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        onPaste={handlePaste}
        autoComplete={autoComplete ? 'on' : 'off'}
        disabled={disabled}
        rows={rows}
        className="w-full border border-gray-300 rounded-md p-2 resize-none focus:border-gray-400 focus:ring-2 focus:ring-gray-400 focus:outline-none transition duration-150 ease-in-out"
      />
    </div>
  );
}