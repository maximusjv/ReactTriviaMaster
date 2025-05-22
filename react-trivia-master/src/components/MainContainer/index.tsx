import * as React from "react";


const MainContainer: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({children, className, ...props}) => {
    return (<div
            className={`bg-white shadow-xl rounded-2xl sm:p-8 flex flex-col items-center justify-center min-h-min min-w-min w-screen h-screen md:w-1/2 md:h-2/3 transition duration-300 ease-in-out ${className}`}
            {...props}>
            {children}
        </div>
    );
};

export default MainContainer;