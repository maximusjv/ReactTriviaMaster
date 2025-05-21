import * as React from "react";


const Index: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({children, ...props}) => {
    return (<div
        className="p-8 rounded-2xl bg-sky-50 border-2 flex flex-col items-center justify-evenly min-h-min min-w-min w-1/2 h-1/2 "
        {...props}>
        {children}
    </div>
    );
};

export default Index;