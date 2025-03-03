import DashboardCircleSpinner from './DashboardCircleSpinner';

const DashboardButtonGroup = ({ onSubmit, onGoBack, submitLabel = "Submit", goBackLabel = "Go Back", type='submit', width='', loading=false }) => {
  return (
    <div className="mt-4 flex space-x-4">
      {onSubmit && (
        <button
          type={type}
          onClick={onSubmit}
          className={`bg-green-600 text-white text-lg font-bold py-4 px-4 ${width} rounded flex items-center justify-center transition-opacity duration-200 ${
            loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-green-700'
          }`}
          disabled={loading}
        >
          {loading ? (
            <DashboardCircleSpinner color='white' />
          ) : (
            submitLabel
          )}
        </button>
      )}
      {onGoBack && (
        <button
          type="button"
          onClick={onGoBack}
          className={`bg-gray-300 text-gray-700 text-lg font-bold py-2 px-4 rounded transition-opacity duration-200 ${
            loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-400'
          }`}
          disabled={loading}
        >
          {loading ? (
            <DashboardCircleSpinner color='white' />
          ) : (
            goBackLabel
          )}
        </button>
      )}
    </div>
  );
};

export default DashboardButtonGroup;