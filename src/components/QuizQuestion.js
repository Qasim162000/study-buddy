const QuizQuestion = ({
  question,
  questionIndex,
  revealedAnswers,
  selectedOptions,
  handleOptionSelect
}) => {
  const isRevealed = revealedAnswers[questionIndex];
  const selectedOption = selectedOptions[questionIndex];

  return (
    <div className="mb-8 p-6 bg-secondary/10 rounded-xl shadow-sm border border-secondary/20">
      <p className="font-semibold text-lg text-primary mb-3">
        Q{questionIndex + 1}: {question.question || ''}
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {question.options.map((option, oIndex) => {
          const isSelected = selectedOption === oIndex;
          const isCorrectOption = option === question.correctAnswer;

          let buttonClass = 'flex items-center w-full text-left p-3 rounded-lg transition-colors duration-200 border text-base font-medium';

          if (isRevealed) {
            if (isCorrectOption) {
              buttonClass += ' bg-green-100 border-green-400 text-green-700 font-bold';
            } else if (isSelected && !isCorrectOption) {
              buttonClass += ' bg-red-100 border-red-400 text-red-700';
            } else {
              buttonClass += ' bg-white border-secondary/20';
            }
          } else {
            if (isSelected) {
              buttonClass += ' bg-primary/20 border-primary text-primary';
            } else {
              buttonClass += ' bg-white border-secondary/20 hover:bg-secondary/10';
            }
          }

          return (
            <button
              key={oIndex}
              onClick={() => handleOptionSelect(questionIndex, oIndex, option)}
              className={buttonClass}
              disabled={isRevealed}
            >
              <span className="mr-2 text-gray-600">{String.fromCharCode(65 + oIndex)}.</span>
              <span className="text-gray-800">{option || ''}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default QuizQuestion; 