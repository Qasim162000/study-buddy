import SummarySection from './SummarySection';
import ConceptsSection from './ConceptsSection';
import QuizSection from './QuizSection';

const ResultsSection = ({
  summarizerResult,
  revealedAnswers,
  selectedOptions,
  handleOptionSelect,
  handleGenerateMoreQuestions,
  loading
}) => {
  if (!summarizerResult) return null;

  return (
    <div className="mt-10 p-8 bg-white rounded-2xl shadow-lg border border-secondary/30">
      <SummarySection summary={summarizerResult.summary} />
      <ConceptsSection concepts={summarizerResult.concepts} />
      <QuizSection
        quizQuestions={summarizerResult.quizQuestions}
        revealedAnswers={revealedAnswers}
        selectedOptions={selectedOptions}
        handleOptionSelect={handleOptionSelect}
        handleGenerateMoreQuestions={handleGenerateMoreQuestions}
        loading={loading}
      />
    </div>
  );
};

export default ResultsSection; 