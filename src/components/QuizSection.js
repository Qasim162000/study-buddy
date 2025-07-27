import QuizQuestion from './QuizQuestion';

const QuizSection = ({ 
  quizQuestions, 
  revealedAnswers, 
  selectedOptions, 
  handleOptionSelect, 
  handleGenerateMoreQuestions, 
  loading 
}) => {
  if (!quizQuestions || quizQuestions.length === 0) return null;

  return (
    <>
      <h3 className="text-2xl font-bold text-primary mb-4 border-b pb-2 border-secondary/30">Quiz Questions</h3>
      {quizQuestions.map((question, index) => (
        <QuizQuestion
          key={index}
          question={question}
          questionIndex={index}
          revealedAnswers={revealedAnswers}
          selectedOptions={selectedOptions}
          handleOptionSelect={handleOptionSelect}
        />
      ))}
      <button
        onClick={handleGenerateMoreQuestions}
        className="mt-8 w-full bg-primary text-white py-3 px-6 rounded-xl text-lg font-bold shadow-lg hover:bg-primary/90 focus:outline-none focus:ring-4 focus:ring-primary/30 focus:ring-opacity-50 transition-all duration-300 transform hover:scale-105"
        disabled={loading}
      >
        Generate More Questions
      </button>
    </>
  );
};

export default QuizSection; 