const ImageUpload = ({ 
  lectureImages, 
  lectureFileInputRef, 
  handleMultipleImageUpload, 
  removeImage 
}) => {
  return (
    <div className="mb-4">
      <label htmlFor="lecture-image-upload" className="block text-gray-700 text-sm font-bold mb-2">
        Upload Lecture Images (Optional, Max 5MB per file):
      </label>
      <input
        type="file"
        id="lecture-image-upload"
        accept="image/*"
        multiple
        onChange={handleMultipleImageUpload}
        ref={lectureFileInputRef}
        className="block w-full text-sm text-gray-500
                   file:mr-4 file:py-2 file:px-4
                   file:rounded-full file:border-0
                   file:text-sm file:font-semibold
                   file:bg-indigo-50 file:text-indigo-700
                   hover:file:bg-indigo-100 transition-all duration-200"
      />
      {lectureImages.length > 0 && (
        <div className="mt-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {lectureImages.map((image, index) => (
            <div key={index} className="relative border border-gray-300 rounded-md overflow-hidden shadow-sm">
              <img 
                src={`data:${image.mimeType};base64,${image.data}`} 
                alt={`Uploaded Preview ${index + 1}`} 
                className="w-full h-24 object-cover"
              />
              <button
                onClick={() => removeImage(index)}
                className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 text-xs hover:bg-red-700 transition-colors"
                title="Remove image"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <p className="text-xs text-center p-1 bg-gray-100 truncate">{image.name}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageUpload; 