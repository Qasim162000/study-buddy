const LectureInput = ({ lectureInput, setLectureInput }) => {
  return (
    <textarea
      className="w-full p-4 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 shadow-sm transition-all duration-200 resize-y min-h-[200px]"
      placeholder="Paste your lecture text here..."
      value={lectureInput}
      onChange={(e) => setLectureInput(e.target.value)}
      rows="10"
    />
  );
};

export default LectureInput; 