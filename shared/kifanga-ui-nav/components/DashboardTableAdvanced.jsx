'use client';

import { IconDelete, IconEdit, IconView } from "kifanga-ui-icons";
import Link from "next/link";

const DashboardTableAdvanced = ({ data, columns, onDelete, editLink, viewLink }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full table-auto border-collapse hidden md:table">
        <thead>
          <tr className="bg-gray-100">
            {columns.map((column, index) => (
              <th key={index} className="px-4 py-2 text-left font-semibold">{column.header}</th>
            ))}
            {(onDelete || editLink || viewLink) && <th className="px-4 py-2 text-left font-semibold flex justify-end">Actions</th>}
          </tr>
        </thead>
        <tbody>
          {data?.map((item, index) => (
            <tr key={item.id || index} className="border-b hover:bg-gray-200">
              {columns.map((column, colIndex) => (
                <td key={colIndex} className="px-4 py-2">
                  {column.type === 'image' ? (
                    <img src={item[column.accessor]} alt="Item" className="h-16 w-16 object-cover rounded" />
                  ) : column.render ? column.render(item) : item[column.accessor]}
                </td>
              ))}
              <td className="px-4 py-2 flex justify-end space-x-4">
                {viewLink && (
                  <Link href={`${viewLink}/${item.link}`}>
                    <button
                      className="bg-gray-300 text-black px-4 py-2 rounded flex items-center transition-opacity duration-200 hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300"
                    >
                      <IconView className="h-5 w-5 mr-2" /> View
                    </button>
                  </Link>
                )}
                {editLink && (
                  <Link href={`${editLink}/${item.id}`}>
                    <button
                      className="bg-gray-300 text-black px-4 py-2 rounded flex items-center transition-opacity duration-200 hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300"
                    >
                      <IconEdit className="h-5 w-5 mr-2" /> Edit
                    </button>
                  </Link>
                )}
                {onDelete && (
                  <button
                    className="bg-gray-300 text-black px-4 py-2 rounded flex items-center transition-opacity duration-200 hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300"
                    onClick={() => onDelete(item)}
                  >
                    <IconDelete className="h-5 w-5 mr-2" /> Delete
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Mobile View */}
      <div className="md:hidden space-y-4">
        {data?.map((item) => (
          <div key={item.id} className="border p-4 rounded-lg shadow-sm bg-white">
            {columns.map((column, index) => (
              <div key={index} className="flex justify-between border-b pb-2 mb-2">
                <span className="font-semibold">{column.header}:</span>
                {column.type === 'image' ? (
                  <img src={item[column.accessor]} alt="Item" className="h-16 w-16 object-cover rounded" />
                ) : (
                  <span>{column.render ? column.render(item) : item[column.accessor]}</span>
                )}
              </div>
            ))}
            <div className="flex justify-between pt-2">
              {viewLink && (
                <Link href={`${viewLink}/${item.id}`}>
                  <button
                    className="bg-gray-300 text-black px-4 py-2 rounded flex items-center transition-opacity duration-200 hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300"
                  >
                    <IconView className="h-5 w-5 mr-2" /> View
                  </button>
                </Link>
              )}
              {editLink && (
                <Link href={`${editLink}/${item.id}`}>
                  <button
                    className="bg-gray-300 text-black px-4 py-2 rounded flex items-center transition-opacity duration-200 hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300"
                  >
                    <IconEdit className="h-5 w-5 mr-2" /> Edit
                  </button>
                </Link>
              )}
              {onDelete && (
                <button
                  className="bg-gray-300 text-black px-4 py-2 rounded flex items-center transition-opacity duration-200 hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300"
                  onClick={() => onDelete(item)}
                >
                  <IconDelete className="h-5 w-5 mr-2" /> Delete
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardTableAdvanced;
