import * as React from "react";


const MainContainer: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({children, className, ...props}) => {
    return (<div
            className={`relative bg-white shadow-xl rounded-2xl p-8 flex flex-col items-center justify-center min-h-min min-w-min w-screen h-screen md:w-1/2 md:h-2/3 transition duration-300 ease-in-out overflow-hidden ${className}`}
            {...props}>
            {children}
        </div>
    );
};

export default MainContainer;