import * as React from "react";

const Game: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <h1 className="text-4xl font-bold mb-4">Trivia Game</h1>
            <p className="text-lg mb-8">Answer the questions correctly!</p>
            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                Start Game
            </button>
        </div>
    )
}

export default Game;