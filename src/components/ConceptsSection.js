const ConceptsSection = ({ concepts }) => {
  if (!concepts || concepts.length === 0) return null;

  return (
    <>
      <h3 className="text-2xl font-bold text-primary mb-4 border-b pb-2 border-secondary/30">Context Enhancement</h3>
      {concepts.map((item, index) => (
        <div key={index} className="mb-8 p-6 bg-secondary/10 rounded-xl shadow-sm border border-secondary/20">
          <p className="font-semibold text-lg text-primary mb-2">
            Concept: <span className="font-normal text-gray-900">{item.concept || ''}</span>
          </p>
          <p className="text-gray-800 mb-2 text-base">
            <strong>Explanation:</strong> {item.explanation || ''}
          </p>
          <p className="text-gray-800 text-base">
            <strong>Real-world Example:</strong> {item.realWorldExample || ''}
          </p>
        </div>
      ))}
    </>
  );
};

export default ConceptsSection; 