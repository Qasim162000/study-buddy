const SummarySection = ({ summary }) => {
  if (!summary) return null;

  return (
    <>
      <h3 className="text-2xl font-bold text-primary mb-4 border-b pb-2 border-secondary/30">Summary</h3>
      <p className="text-gray-900 leading-relaxed mb-8 text-lg">{summary}</p>
    </>
  );
};

export default SummarySection; 