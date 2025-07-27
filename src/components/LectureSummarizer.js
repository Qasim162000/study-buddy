
import React, { useState } from 'react';
import ImageUpload from './ImageUpload';
import LectureInput from './LectureInput';

const LectureSummarizer = ({ 
  lectureInput, 
  setLectureInput, 
  lectureImages, 
  lectureFileInputRef, 
  handleMultipleImageUpload, 
  removeImage, 
  handleSummarize, 
  loading 
}) => {
  const [inputMode, setInputMode] = useState('text'); // 'text' or 'image'
  const [validationError, setValidationError] = useState('');

  const handleModeChange = (mode) => {
    setInputMode(mode);
    setValidationError(''); // Clear validation error when switching modes
    // Clear input upon switching modes
    if (mode === 'text') {
      // Clear images when switching to text mode
      if (lectureImages.length > 0) {
        lectureImages.forEach((_, index) => removeImage(index));
      }
    } else {
      // Clear text when switching to image mode
      setLectureInput('');
    }
  };

  const handleSummarizeClick = () => {
    // Validate input before proceeding
    if (inputMode === 'text' && !lectureInput.trim()) {
      setValidationError('Please enter some lecture text to summarize.');
      return;
    }
    
    if (inputMode === 'image' && lectureImages.length === 0) {
      setValidationError('Please upload at least one image to summarize.');
      return;
    }

    // Clear previous validation errors
    setValidationError('');
    handleSummarize();
  };

  // Check if button should be disabled
  const isButtonDisabled = () => {
    if (loading) return true;
    if (inputMode === 'text' && !lectureInput.trim()) return true;
    if (inputMode === 'image' && lectureImages.length === 0) return true;
    return false;
  };

  return (
    <div className="bg-secondary/20 rounded-2xl p-8 shadow-md mb-8">
      <h2 className="text-3xl font-bold text-primary mb-4 text-center tracking-tight">Lecture Summarizer</h2>
      <p className="text-gray-700 mb-6 text-center text-base font-medium">
        Upload lecture images (slides, notes) OR paste text content to get a summary, 
        explanations for tough concepts, real-world examples, and quiz questions.
      </p>
      
      {/* Validation Error Display */}
      {validationError && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md relative mb-4" role="alert">
          <strong className="font-bold">Validation Error:</strong>
          <span className="block sm:inline"> {validationError}</span>
        </div>
      )}
      
      {/* Input Mode Toggle */}
      <div className="flex justify-center mb-6">
        <div className="bg-white rounded-lg p-1 shadow-sm">
          <button
            onClick={() => handleModeChange('text')}
            className={`px-4 py-2 rounded-md font-medium transition-all duration-200 ${
              inputMode === 'text' 
                ? 'bg-primary text-white shadow-md' 
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            Text Input
          </button>
          <button
            onClick={() => handleModeChange('image')}
            className={`px-4 py-2 rounded-md font-medium transition-all duration-200 ${
              inputMode === 'image' 
                ? 'bg-primary text-white shadow-md' 
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            Image Upload
          </button>
        </div>
      </div>

      {/* Conditional Input Display */}
      {inputMode === 'image' ? (
        <ImageUpload
          lectureImages={lectureImages}
          lectureFileInputRef={lectureFileInputRef}
          handleMultipleImageUpload={handleMultipleImageUpload}
          removeImage={removeImage}
        />
      ) : (
        <LectureInput 
          lectureInput={lectureInput} 
          setLectureInput={setLectureInput} 
        />
      )}
      
      <button
        onClick={handleSummarizeClick}
        disabled={isButtonDisabled()}
        className={`mt-8 w-full py-3 px-6 rounded-xl text-lg font-bold shadow-lg focus:outline-none focus:ring-4 focus:ring-primary/30 focus:ring-opacity-50 transition-all duration-300 transform ${
          isButtonDisabled() 
            ? 'bg-gray-400 text-gray-600 cursor-not-allowed' 
            : 'bg-primary text-white hover:bg-primary/90'
        }`}
      >
        {loading ? 'Processing...' : 'Summarize Lecture'}
      </button>
    </div>
  );
};

export default LectureSummarizer; 