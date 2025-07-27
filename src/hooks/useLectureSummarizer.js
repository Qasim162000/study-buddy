import { useState, useRef } from 'react';
import { callGeminiAPI } from '../services/geminiApi';
import { SUMMARIZER_SCHEMA, QUIZ_ONLY_SCHEMA } from '../constants/schemas';
import { processMultipleImages } from '../utils/imageUtils';

export const useLectureSummarizer = () => {
  const [lectureInput, setLectureInput] = useState('');
  const [summarizerResult, setSummarizerResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [lectureImages, setLectureImages] = useState([]);
  const [revealedAnswers, setRevealedAnswers] = useState({});
  const [selectedOptions, setSelectedOptions] = useState({});
  const lectureFileInputRef = useRef(null);

  const handleMultipleImageUpload = async (event) => {
    const files = Array.from(event.target.files);
    
    try {
      const newImages = await processMultipleImages(files);
      setLectureImages(prevImages => [...prevImages, ...newImages]);
      setError('');
    } catch (err) {
      setError(err.message);
      if (lectureFileInputRef.current) {
        lectureFileInputRef.current.value = '';
      }
    }
  };

  const removeImage = (indexToRemove) => {
    setLectureImages(prevImages => prevImages.filter((_, index) => index !== indexToRemove));
    if (lectureImages.length === 1 && lectureFileInputRef.current) {
      lectureFileInputRef.current.value = '';
    }
  };

  const toggleAnswerVisibility = (questionIndex) => {
    setRevealedAnswers(prevState => ({
      ...prevState,
      [questionIndex]: !prevState[questionIndex]
    }));
  };

  const handleOptionSelect = (questionIndex, optionIndex, selectedOptionValue) => {
    setSelectedOptions(prevState => ({
      ...prevState,
      [questionIndex]: optionIndex
    }));
    toggleAnswerVisibility(questionIndex);
  };

  const handleSummarize = async () => {
    // Clear any previous errors first
    setError('');
    
    // Additional validation check
    if (!lectureInput.trim() && lectureImages.length === 0) {
      setError("Please enter lecture content or upload at least one image to summarize.");
      return;
    }

    setRevealedAnswers({});
    setSelectedOptions({});
    setLoading(true);
    setError('');

    try {
      let prompt = `Summarize the following lecture content. If images are provided, describe their key elements and integrate their information into the summary. For any tough concepts identified in the summary (from text or images), provide an external explanation and a real-world application or example. Finally, generate 3-5 multiple-choice quiz questions based on the summary, with 4 options and the correct answer.`;
      
      if (lectureInput.trim()) {
        prompt += `\n\nLecture Content: ${lectureInput}`;
      }
      if (lectureImages.length > 0) {
        prompt += `\n\n(Image content from ${lectureImages.length} uploaded image(s) will be analyzed.)`;
      }
      prompt += `\n\nPlease provide the output in a JSON format matching this schema: ${JSON.stringify(SUMMARIZER_SCHEMA)}`;

      const result = await callGeminiAPI(prompt, SUMMARIZER_SCHEMA, lectureImages);
      setSummarizerResult(result);
    } catch (err) {
      console.error("Summarize failed:", err);
      setError(`Error processing request: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateMoreQuestions = async () => {
    // Check if there's current input OR if there's already a summary result
    if (!lectureInput.trim() && lectureImages.length === 0 && !summarizerResult) {
      setError("Please provide lecture content or images to generate more questions.");
      return;
    }

    setLoading(true);
    setError('');

    try {
      let prompt = `Generate 3-5 more multiple-choice quiz questions based on the following lecture content and images. Each question should have 4 options and the correct answer. Ensure these questions are distinct from any previously generated ones.`;
      
      if (lectureInput.trim()) {
        prompt += `\n\nLecture Content: ${lectureInput}`;
      }
      if (lectureImages.length > 0) {
        prompt += `\n\n(Image content from ${lectureImages.length} uploaded image(s) will be analyzed.)`;
      }
      // If there's no current input but we have a previous summary, use that
      if (!lectureInput.trim() && lectureImages.length === 0 && summarizerResult) {
        prompt += `\n\nUse the previously generated summary and concepts to create new questions.`;
      }
      prompt += `\n\nPlease provide the output in a JSON format matching this schema: ${JSON.stringify(QUIZ_ONLY_SCHEMA)}`;

      const result = await callGeminiAPI(prompt, QUIZ_ONLY_SCHEMA, lectureImages);

      if (result && result.quizQuestions) {
        setSummarizerResult(prevState => ({
          ...prevState,
          quizQuestions: [...(prevState?.quizQuestions || []), ...result.quizQuestions]
        }));
        
        const startIndex = summarizerResult?.quizQuestions?.length || 0;
        const newRevealedAnswers = { ...revealedAnswers };
        const newSelectedOptions = { ...selectedOptions };
        
        result.quizQuestions.forEach((_, i) => {
          newRevealedAnswers[startIndex + i] = false;
          newSelectedOptions[startIndex + i] = null;
        });
        
        setRevealedAnswers(newRevealedAnswers);
        setSelectedOptions(newSelectedOptions);
      }
    } catch (err) {
      console.error("Generate more questions failed:", err);
      setError(`Error processing request: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return {
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
    toggleAnswerVisibility,
    handleOptionSelect,
    handleSummarize,
    handleGenerateMoreQuestions
  };
}; 