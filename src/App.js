import React, { useEffect, useState, useRef } from 'react';
import Lottie from 'lottie-web';
import { useLectureSummarizer } from './hooks/useLectureSummarizer';
import { globalStyles } from './styles/globalStyles';
import TeacherLottie from "./assets/lotties/teacher-lottie.json";
import BackgroundImage from "./assets/backgroundImage.png";
import {
  ErrorAlert,
  LoadingSpinner,
  LectureSummarizer,
  ResultsSection,
  StartupLoader
} from './components';

const App = () => {
  const [showLoader, setShowLoader] = useState(true);
  const [fadeOutLoader, setFadeOutLoader] = useState(false);
  const teacherLottieRef = useRef(null);
  const animationRef = useRef(null);

  const {
    lectureInput,
    setLectureInput,
    summarizerResult,
    loading,
    error,
    setError,
    lectureImages,
    revealedAnswers,
    selectedOptions,
    lectureFileInputRef,
    handleMultipleImageUpload,
    removeImage,
    handleOptionSelect,
    handleSummarize,
    handleGenerateMoreQuestions
  } = useLectureSummarizer();

  // Clear error when input changes
  useEffect(() => {
    if (error && (lectureInput.trim() || lectureImages.length > 0)) {
      setError('');
    }
  }, [lectureInput, lectureImages, error, setError]);

  // Startup loader logic
  useEffect(() => {
    if (teacherLottieRef.current && !animationRef.current) {
      animationRef.current = Lottie.loadAnimation({
        container: teacherLottieRef.current,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        animationData: TeacherLottie
      });
      animationRef.current.setSpeed(0.3);
    }
    
    const timer = setTimeout(() => {
      setFadeOutLoader(true);
      setTimeout(() => setShowLoader(false), 700); // match transition duration
    }, 2500);
    
    return () => {
      clearTimeout(timer);
      if (animationRef.current) {
        animationRef.current.destroy();
        animationRef.current = null;
      }
    };
  }, []);

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center font-inter text-gray-800 overflow-hidden">
      {/* Blurred background image */}
      <div 
        className="fixed inset-0 -z-20"
        style={{
          backgroundImage: `url(${BackgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'fixed',
          filter: 'blur(5px)',
        }}
      />
      <style>{globalStyles}</style>
      {showLoader && (
        <div className={`fixed inset-0 z-50 flex items-center justify-center bg-white transition-opacity duration-700 ${fadeOutLoader ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
          <StartupLoader />
        </div>
      )}
      <div className={`transition-opacity duration-700 w-full flex items-center justify-center ${showLoader && !fadeOutLoader ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
        <div className="max-w-2xl xl:max-w-5xl w-full bg-white rounded-xl shadow-lg p-6 md:p-8 m-8 relative">
          <div className="absolute -left-52 bottom-10 pointer-events-none z-20 hidden lg:block">
            <div 
              ref={teacherLottieRef} 
              className="w-86 h-86 md:w-[550px] md:h-[550px]"
            />
          </div>
          <div className="relative z-10">
            <ErrorAlert error={error} />
            <LectureSummarizer
              lectureInput={lectureInput}
              setLectureInput={setLectureInput}
              lectureImages={lectureImages}
              lectureFileInputRef={lectureFileInputRef}
              handleMultipleImageUpload={handleMultipleImageUpload}
              removeImage={removeImage}
              handleSummarize={handleSummarize}
              loading={loading}
            />
            <ResultsSection
              summarizerResult={summarizerResult}
              revealedAnswers={revealedAnswers}
              selectedOptions={selectedOptions}
              handleOptionSelect={handleOptionSelect}
              handleGenerateMoreQuestions={handleGenerateMoreQuestions}
              loading={loading}
            />
            <LoadingSpinner loading={loading} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
