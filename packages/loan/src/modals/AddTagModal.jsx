import { IconClose, IconSave, IconSpinner } from "kifanga-ui-icons";
import { useDarkMode } from "kifanga-ui-state";

export default function AddTagModal({ showAddModal, createFormData, handleCreate, handleAddCancel, handleChange, createData }) {
  const { darkMode } = useDarkMode();

  if (!showAddModal) return null;

  return (
    <div className="fixed z-50 inset-0 overflow-y-auto">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>

        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

        <div className={`inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
          
          {/* Close Button */}
          <div className="flex justify-end">
            <button
              onClick={handleAddCancel}
              className="text-gray-500 hover:text-gray-700 focus:outline-none"
              disabled={createData.loading}
            >
              <IconClose className="h-6 w-6" />
            </button>
          </div>

          {/* Content */}
          <div className={`px-4 pt-5 pb-4 sm:p-6 sm:pb-4 ${createData.loading ? 'animate-pulse' : ''}`}>
            {createData.error && <p className="text-red-600 mb-4">{createData.error}</p>}

            <div className="mb-4">
              <label htmlFor="tagname" className="block text-sm font-medium text-gray-700">
                Tag Name
              </label>
              <input
                id="tagname"
                type="text"
                name="tagname"
                value={createFormData.tagname}
                onChange={handleChange}
                placeholder="News"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className={`px-4 py-3 sm:px-6 flex justify-end space-x-4 ${createData.loading ? 'animate-pulse' : ''}`}>
            <button
              onClick={handleAddCancel}
              className="inline-flex justify-center px-4 py-2 bg-gray-300 text-gray-700 font-medium rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              disabled={createData.loading}
            >
              <IconClose className="h-5 w-5" />
              <span className="ml-2">Cancel</span>
            </button>
            
            <button
              onClick={() => handleCreate({ TagName: createFormData.tagname, Posts: [] })}
              className={`inline-flex justify-center px-4 py-2 bg-green-600 text-white font-medium rounded-md hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 ${createData.loading ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={createData.loading}
            >
              {createData.loading ? (
                <IconSpinner className="h-5 w-5 animate-spin" />
              ) : (
                <IconSave className="h-5 w-5" />
              )}
              <span className="ml-2">Create Tag</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}