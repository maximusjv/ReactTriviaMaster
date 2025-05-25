import type Question from "@data/Question.ts";
import * as React from "react";
import ActionButton from "@components/ActionButton";
import RecordCard from "@components/RecordCard";

export type AnswerRecord = {
    question: Question;
    answer: string;
};

type ResultProps = { record: AnswerRecord[]; reset: () => void };

const Results: React.FC<ResultProps> = ({ record, reset }) => {
    const score = record.reduce((previousValue, currentValue) => {
        return previousValue + +(currentValue.answer === currentValue.question.correct_answer);
    }, 0);

    return (
        <div className="flex flex-col items-center justify-center">
                <h2 className="text-3xl w-full text-start font-extrabold text-gray-900 mb-6">Quiz Results</h2>
                <div className="mb-4 w-full text-start">
                    <p className="text-xl text-gray-700">
                        Your final score is: <span className="font-semibold text-blue-600">{score}</span> / {record.length}
                    </p>
                </div>
                <ActionButton
                    onClick={reset}
                    className={"w-full"}
                >
                    Play Again
                </ActionButton>

                {record.length > 0 && (
                    <div className="mt-8 space-y-4">
                        <h3 className="text-xl font-semibold text-gray-800 mb-2">Review Your Answers</h3>
                        {record.map((answer) => (
                            <RecordCard record={answer} key={answer.question.question} />
                        ))}
                    </div>
                )}
                {record.length === 0 && (
                    <p className="mt-8 text-gray-600 italic">No answers to review yet.</p>
                )}
        </div>
    );
};

export default Results;