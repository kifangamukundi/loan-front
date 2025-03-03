import Image from 'next/image';
import { IconCamera, IconSpinner, IconUpload } from 'kifanga-ui-icons';
import { useDarkMode } from 'kifanga-ui-state';

export default function DashboardMediaGroup({
  handleFileInputChange,
  isUploadDisabled,
  dataUploaded,
  handleIconClick,
  handleModalOpen,
  defaultImage,
  fileInputRef,
  iconText
}) {
  const { darkMode } = useDarkMode();

  return (
    <div className="w-full mb-4 p-4 rounded-lg bg-white shadow-md">
      {/* File Upload Section */}
      <div className="flex flex-col md:flex-row mb-4">
        <div className="w-full md:w-1/2 mb-4 md:mb-0">
          <label htmlFor="image" className="text-lg font-semibold text-gray-600">Upload</label>
          <input 
            type="file" 
            multiple 
            onChange={handleFileInputChange} 
            id="image" 
            className="hidden" 
            ref={fileInputRef} 
          />
          <div className="mt-2">
            <button
              className={`flex items-center justify-center w-1/2 px-4 py-2 rounded-lg bg-green-600 text-white font-medium ${isUploadDisabled || dataUploaded.loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-green-500'}`}
              onClick={!dataUploaded.loading && !isUploadDisabled ? handleIconClick : undefined}
              disabled={isUploadDisabled || dataUploaded.loading}
              type='button'
            >
              {dataUploaded.loading ? (
                <IconSpinner className="h-5 w-5 animate-spin" />
              ) : (
                <IconUpload className="h-5 w-5" />
              )}
              <span className="ml-2">{iconText}</span>
            </button>
          </div>
        </div>

        {/* Manage Media Section */}
        <div className="w-full md:w-1/2">
          <label htmlFor="media" className="text-lg font-semibold text-gray-600">Manage Media</label>
          <div className="mt-2">
            <button
              className={`flex items-center justify-center w-1/2 px-4 py-2 rounded-lg bg-gray-300 text-gray-700 font-medium ${dataUploaded.loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-400'}`}
              onClick={!dataUploaded.loading ? handleModalOpen : undefined}
              disabled={dataUploaded.loading}
              type='button'
            >
              <IconCamera className="h-5 w-5" />
              <span className="ml-2">Manage</span>
            </button>
          </div>
        </div>
      </div>

      {/* Image Preview Section */}
      <div className="w-full h-96 overflow-hidden relative rounded-lg mb-4">
        {dataUploaded.error && <p className="text-green-600">{dataUploaded.error}</p>}
        {defaultImage?.secure_url ? (
          <div className={`w-full h-full ${darkMode ? 'bg-gray-800/50' : 'bg-gray-300/50'}`}>
            <Image
              src={defaultImage.secure_url}
              alt="Image Preview"
              className="w-full h-full object-cover rounded-lg"
              sizes="100vw"
              fill
              priority
            />
          </div>
        ) : (
          <div className={`flex items-center justify-center w-full h-full bg-gray-200`}>
            <p className="text-gray-600">No image selected</p>
          </div>
        )}
      </div>
    </div>
  );
}