import * as React from "react";
import {Link} from "react-router";

const Start: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <h1 className="text-4xl font-bold mb-4 text-gray-800">Welcome to the Trivia Game!</h1>
            <p className="text-lg mb-8 text-gray-700">Test your knowledge and have fun!</p>
            <Link to="/play"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full transition duration-300 ease-in-out">
                Start The Trivia
            </Link>
        </div>
    );
};

export default Start;