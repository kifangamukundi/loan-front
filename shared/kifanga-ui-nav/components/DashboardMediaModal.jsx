'use client'

import { useState } from "react";
import { useDeleteMedia } from "kifanga-ui-hooks";
import { IconClose, IconDelete, IconSpinner, IconToggleOn } from "kifanga-ui-icons";
import { useDarkMode } from "kifanga-ui-state";

export default function DashboardMediaModal({ url, showModal, setShowModal, images, setImages, defaultImage, setDefaultImage }) {
  const { darkMode } = useDarkMode();
  const { data: dataDeleted, deleteMedia } = useDeleteMedia(url, 'media/remove');
  const [selectedImage, setSelectedImage] = useState(null);

  const closeModal = () => {
    setShowModal(false);
    setSelectedImage(null);
  };

  const handleDelete = async (public_id) => {
    await deleteMedia(public_id, images, setImages, setDefaultImage);
    setSelectedImage(null);
  };

  const handleDragStart = (index) => (event) => {
    event.dataTransfer.setData('index', index);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (targetIndex) => (event) => {
    event.preventDefault();
    const draggedIndex = event.dataTransfer.getData('index');
    const updatedImages = [...images];
    const [draggedImage] = updatedImages.splice(draggedIndex, 1);
    updatedImages.splice(targetIndex, 0, draggedImage);
  
    // Always set the first image as the default when dragged
    setDefaultImage(updatedImages[0]);
  
    setImages(updatedImages);
    setSelectedImage(null);
  };

  const showImageMenu = (image) => {
    setSelectedImage(image);
  };

  const hideImageMenu = () => {
    setSelectedImage(null);
  };

  const handleSetAsDefault = () => {
    if (selectedImage) {
      let updatedImages = [...images];

      if (selectedImage.public_id === defaultImage.public_id) {
        // Toggle off if the selected image is the default
        setDefaultImage(images[0]);
      } else {
        // Set as default if the selected image is not the default
        updatedImages = [selectedImage, ...images.filter(image => image.public_id !== selectedImage.public_id)];
        setDefaultImage(selectedImage);
      }

      setImages(updatedImages);
      hideImageMenu();
    }
  };

  const imageList = (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {images.map((image, index) => (
        <div
          key={index}
          className={`relative w-full h-40 overflow-hidden cursor-pointer rounded-lg ${defaultImage.public_id === image.public_id ? (darkMode ? 'bg-gray-700' : 'bg-gray-200') : 'bg-gray-600'}`}
          draggable
          onDragStart={handleDragStart(index)}
          onDragOver={handleDragOver}
          onDrop={handleDrop(index)}
          onClick={() => showImageMenu(image)}
        >
          <img 
            src={image.secure_url} 
            alt={`gallery-image-${index}`}
            className={`absolute inset-0 w-full h-full object-cover ${
              selectedImage && selectedImage.public_id === image.public_id
                ? darkMode
                  ? 'bg-gray-500 opacity-10'
                  : 'bg-gray-400'
                : `${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`
            }`}
          />
        </div>
      ))}
    </div>
  );

  return (
    <>
      {showModal && (
        <div className="fixed z-50 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>

            <div className={`inline-block align-bottom ${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full`}>
              {selectedImage ? (
                <div className={`${dataDeleted.loading ? 'animate-pulse' : ''} flex items-center justify-end space-x-2 px-4 py-3`}>
                  {images.indexOf(selectedImage) === 0 && (
                    <button
                      onClick={() => handleDelete(selectedImage.public_id)}
                      disabled={dataDeleted.loading}
                      className={`flex items-center px-3 py-1 rounded-md ${dataDeleted.loading ? 'bg-gray-400' : 'bg-green-600 hover:bg-green-700'} text-white`}
                    >
                      {dataDeleted.loading ? (
                        <IconSpinner className={`h-5 w-5`} />
                      ) : (
                        <IconDelete title={`Delete Media`} className="h-5 w-5" />
                      )}
                      <span className="ml-2">Delete</span>
                    </button>
                  )}
                  {images.indexOf(selectedImage) !== 0 && (
                    <>
                      <button
                        onClick={() => handleDelete(selectedImage.public_id)}
                        disabled={dataDeleted.loading}
                        className={`flex items-center px-3 py-1 rounded-md ${dataDeleted.loading ? 'bg-gray-400' : 'bg-green-600 hover:bg-green-700'} text-white`}
                      >
                        {dataDeleted.loading ? (
                          <IconSpinner className={`h-5 w-5`} />
                        ) : (
                          <IconDelete title={`Delete Media`} className="h-5 w-5" />
                        )}
                        <span className="ml-2">Delete</span>
                      </button>

                      <button
                        onClick={handleSetAsDefault}
                        disabled={dataDeleted.loading}
                        className={`flex items-center px-3 py-1 rounded-md text-gray-700 ${dataDeleted.loading ? 'bg-gray-300' : 'bg-gray-400 hover:bg-gray-500'}`}
                      >
                        <IconToggleOn title={`Set as default`} className="h-5 w-5" />
                        <span className="ml-2">Set Default</span>
                      </button>
                    </>
                  )}
                </div>
              ) : (
                <div className={`${darkMode ? 'bg-gray-700' : 'bg-gray-200'} px-4 py-10 rounded`}>
                  <span className="h-5 w-5"></span>
                </div>
              )}

              <div className={`${darkMode ? 'bg-gray-800' : 'bg-gray-300'} px-4 pt-5 pb-4`}>
                {dataDeleted.error && <p className="text-red-600 mb-4">{dataDeleted.error}</p>}
                <div className="mt-1 mb-2">{imageList}</div>
              </div>

              <div className={`${dataDeleted.loading ? 'animate-pulse' : ''} flex justify-end px-4 py-3`}>
                <button
                  onClick={closeModal}
                  disabled={dataDeleted.loading}
                  className={`flex items-center px-3 py-1 rounded-md text-gray-700 ${dataDeleted.loading ? 'bg-gray-300' : 'bg-gray-400 hover:bg-gray-500'}`}
                >
                  <IconClose title={`Close Manager`} className="h-5 w-5" />
                  <span className="ml-2">Close Manager</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}