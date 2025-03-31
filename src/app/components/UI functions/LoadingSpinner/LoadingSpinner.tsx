export const LoadingSpinner = () => {   
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="flex flex-col items-center">
            <svg
              className="animate-spin h-12 w-12 text-white mb-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
              ></circle>
              <path
          className="opacity-75"
          fill="currentColor"
          d="M12 2a10 10 0 0110 10h-4a6 6 0 00-6-6V2z"
              ></path>
            </svg>
            <div className="text-white font-semibold">Loading...</div>
          </div>
        </div>
        )
    };