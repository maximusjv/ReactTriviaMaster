import * as React from "react";
import {Link} from "react-router";

const Start: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <h1 className="text-4xl font-bold mb-4">Welcome to the Trivia Game!</h1>
            <p className="text-lg mb-8">Test your knowledge and have fun!</p>
            <Link to="/play" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                Start The Trivia
            </Link>
        </div>
    );
};


export default Start;