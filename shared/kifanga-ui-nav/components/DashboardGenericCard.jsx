'use client';

import Link from "next/link";
import { IconEdit, IconView, IconDelete } from "kifanga-ui-icons";

const DashboardGenericCard = ({ item, onDelete, editLink, viewLink }) => {
  return (
    <div className="border p-4 rounded shadow mb-4 flex flex-col justify-between h-full">
      <div>
        <h2 className="text-lg font-semibold">{item.title}</h2>
      </div>
      <div className="mt-4 flex justify-between">
        {viewLink && (
          <Link href={`${viewLink}`}>
            <button
              className="bg-gray-300 text-black px-4 py-2 rounded flex items-center transition-opacity duration-200 hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300"
            >
              <IconView className="h-5 w-5 mr-2" /> View
            </button>
          </Link>
        )}
        {editLink && (
          <Link href={`${editLink}`}>
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
  );
};

export default DashboardGenericCard;