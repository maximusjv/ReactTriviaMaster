import * as React from "react";

const ActionButton: React.FC<React.HTMLAttributes<HTMLButtonElement>> = ({children, className, ...props}) => {
    return (<button
            className={`mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300 ease-in-out ${className}`}
            {...props}>
            {children}
        </button>
    );
};

export default ActionButton;