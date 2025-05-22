import * as React from "react";
import MainContainer from "components/MainContainer";

const Loading: React.FC = () => {
    return (
        <div className="h-screen w-screen flex justify-center items-center">
            <MainContainer>
                <p className="text-2xl text-gray-700 font-semibold">Loading...</p>
            </MainContainer>
        </div>
    );
};

export default Loading;