import { useState, useCallback, ReactNode } from "react";
import { ErrorBoundary as ReactErrorBoundary } from "react-error-boundary";

type ErrorBoundaryProps = {
  children: ReactNode;
};

const ErrorFallback = ({
  error,
  resetErrorBoundary,
}: {
  error: Error;
  resetErrorBoundary: () => void;
}) => {
  return (
    <div className="text-center text-red-600">
      <h1 className="text-2xl font-bold mb-4">Oops, there was an error!</h1>
      <pre className="text-sm mb-4">{error.message}</pre>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded-md"
        onClick={resetErrorBoundary}
      >
        Try again?
      </button>
    </div>
  );
};

const CustomErrorBoundary = ({ children }: ErrorBoundaryProps) => {
  const [errorKey, setErrorKey] = useState(0);

  const handleReset = useCallback(() => {
    setErrorKey((prevKey) => prevKey + 1);
  }, []);

  return (
    <ReactErrorBoundary
      FallbackComponent={ErrorFallback}
      onReset={handleReset}
      key={errorKey}
    >
      {children}
    </ReactErrorBoundary>
  );
};

export default CustomErrorBoundary;
