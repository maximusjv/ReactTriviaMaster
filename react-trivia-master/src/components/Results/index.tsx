import type Question from "@data/Question.ts";
import * as React from "react";
import ActionButton from "@components/ActionButton";

export type AnswerRecord = {
    question: Question,
    answer: string,
};

type ResultProps = { record: AnswerRecord[], reset: () => void };

const Results: React.FC<ResultProps> = ({record, reset},) => {
    const score = record.reduce((previousValue, currentValue) => {
        return previousValue + +(currentValue.answer === currentValue.question.correct_answer);
    }, 0);
    return <div className="text-center">
        <p className="text-3xl font-bold text-gray-800 mb-4">Your Score</p>
        <p className="text-xl text-gray-700 mb-6">{score} / {record.length}</p>
        <ActionButton onClick={reset}
                      className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Play Again
        </ActionButton>
    </div>;
};

export default Results;