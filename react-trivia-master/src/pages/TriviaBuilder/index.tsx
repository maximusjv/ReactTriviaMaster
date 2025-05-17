import * as React from "react";

const TriviaBuilder: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <h1 className="text-4xl font-bold mb-4">Trivia Builder</h1>
            <p className="text-lg mb-8">Create your own trivia questions!</p>
        </div>
    );
}

export default TriviaBuilder;

