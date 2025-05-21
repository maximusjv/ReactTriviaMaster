import * as React from "react";


const MainContainer: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({children, ...props}) => {
    return (<div
            className="bg-white shadow-xl rounded-2xl p-8 flex flex-col items-center justify-evenly min-h-min min-w-min w-1/2 h-2/3 transition duration-300 ease-in-out"
            {...props}>
            {children}
        </div>
    );
};

export default MainContainer;