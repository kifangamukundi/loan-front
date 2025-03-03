"use client";
import { useState } from "react";

const DashboardDownload = ({ options = [], loading = false }) => {
    const [selected, setSelected] = useState("");

    const handleChange = (event) => {
        const value = event.target.value;
        setSelected(value);

        const selectedOption = options.find(opt => opt.value === value);
        if (selectedOption && selectedOption.onClick) {
            selectedOption.onClick();
        }

        setTimeout(() => {
            setSelected("");
        }, 1000);
    };

    return (
        <select
            value={selected}
            onChange={handleChange}
            className={`border rounded p-2 mb-2 md:mb-0 md:col-span-1 lg:col-span-1 
                focus:border-gray-400 focus:ring-2 focus:ring-gray-400 focus:outline-none 
                transition duration-150 ease-in-out bg-gray-200 ${
                    loading ? "opacity-50 cursor-not-allowed" : ""
                }`}
            disabled={loading || options.length === 0}
        >
            <option value="" disabled>Select Export Format</option>
            {options.map((opt) => (
                <option key={opt.value} value={opt.value}>
                    {opt.label}
                </option>
            ))}
        </select>
    );
};

export default DashboardDownload;
