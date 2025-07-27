const LoadingSpinner = ({ loading }) => {
  if (!loading) return null;

  return (
    <div className="flex items-center justify-center p-4">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-500"></div>
      <p className="ml-3 text-indigo-600 font-medium">Processing...</p>
    </div>
  );
};

export default LoadingSpinner; 