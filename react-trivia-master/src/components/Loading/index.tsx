import * as React from "react";
import Index from "components/MainContainer";

const Loading: React.FC = () => {
    return (
        <div className="h-screen w-screen flex justify-center items-center">
        <Index>
            <p className="text-2xl text-white p-8 rounded-lg bg-blue-500">Loading please wait...</p>
        </Index>
        </div>
    );
};

export default Loading;