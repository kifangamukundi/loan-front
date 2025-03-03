'use client'

import { useState, useEffect } from "react";
import { IconClose, IconDelete, IconSpinner } from "kifanga-ui-icons";
import { useDarkMode } from "kifanga-ui-state";

export default function DashboardMediaDelete({ showModal, itemName, item, handleDeletion, handleCancel, deleteData }) {
  const { darkMode } = useDarkMode();
  const [typedName, setTypedName] = useState('');

  const isNameMatched = itemName === typedName;

  useEffect(() => {
    return () => {
      setTypedName('');
    };
  }, []);

  if (!showModal) return null;

  return (
    <div className="fixed z-50 inset-0 overflow-y-auto">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>

        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

        <div className={`inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
          
          {/* Close Button */}
          <div className="flex justify-end">
            <button
              onClick={() => {
                handleCancel();
                setTypedName('');
              }}
              className="text-gray-500 hover:text-gray-700 focus:outline-none"
              disabled={deleteData.loading}
            >
              <IconClose className="h-6 w-6" />
            </button>
          </div>

          {/* Content */}
          <div className={`px-4 pt-5 pb-4 sm:p-6 sm:pb-4 ${deleteData.loading ? 'animate-pulse' : ''}`}>
            {deleteData.error && <p className="text-green-600 mb-4">{deleteData.error}</p>}
            
            <div className="mb-4">
              <h3 className="text-xl leading-6 font-bold text-gray-700">
                Confirm Deletion
              </h3>
              <p className="mt-2 text-lg text-gray-600">
                Please type <span className="font-bold text-green-600">{itemName}</span> to confirm the deletion.
              </p>
            </div>

            <div className="mt-4">
              <input
                type="text"
                value={typedName}
                onChange={(e) => setTypedName(e.target.value)}
                placeholder={`Type ${itemName} to confirm`}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-gray-500 focus:border-gray-500"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className={`px-4 py-3 sm:px-6 flex justify-end space-x-4 ${deleteData.loading ? 'animate-pulse' : ''}`}>
            <button
              onClick={() => {
                handleCancel();
                setTypedName('');
              }}
              className="inline-flex justify-center px-4 py-2 bg-gray-300 text-gray-700 font-medium rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              disabled={deleteData.loading}
            >
              <IconClose className="h-5 w-5" />
              <span className="ml-2">Cancel</span>
            </button>
            
            <button
              onClick={() => {
                setTypedName('');
                handleDeletion(item, itemName);
              }}
              className={`inline-flex justify-center px-4 py-2 bg-green-600 text-white font-medium rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 ${!isNameMatched ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={deleteData.loading || !isNameMatched}
            >
              {deleteData.loading ? (
                <IconSpinner className="h-5 w-5 animate-spin" />
              ) : (
                <IconDelete className="h-5 w-5" />
              )}
              <span className="ml-2">Delete</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}