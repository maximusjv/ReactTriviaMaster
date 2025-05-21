import * as React from "react";

const ActionButton: React.FC<React.HTMLAttributes<HTMLButtonElement>> = ({children, ...props}) => {
    return (<button
            className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            {...props}>
            {children}
        </button>
    );
};

export default ActionButton;