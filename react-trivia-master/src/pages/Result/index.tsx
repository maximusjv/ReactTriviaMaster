import * as React from "react";


const Result: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <h1 className="text-4xl font-bold mb-4">Welcome to the Trivia Game!</h1>
            <p className="text-lg mb-8">Here are your results: </p>
        </div>
    );
}


export default Result;