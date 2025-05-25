import * as React from "react";


const LoadingSpinner: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center w-min h-min space-y-4 p-8 bg-white rounded-lg shadow-xl">
            <div
                className="
          w-16 h-16
          border-4 border-t-4 border-blue-50 border-t-blue-900 border-opacity-25
          rounded-full
          animate-spin
        "
            ></div>
            {/* Loading text */}
            <p className="text-lg font-medium text-gray-700">Loading...</p>
        </div>
    );
};

export default LoadingSpinner;