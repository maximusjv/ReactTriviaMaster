import * as React from "react";

const Loading: React.FC = () => {
    return (
        <div className="flex items-center justify-center flex-col h-screen">
            <p className="text-2xl text-white p-8 rounded-lg bg-blue-500">Loading please wait...</p>
        </div>
    );
};

export default Loading;