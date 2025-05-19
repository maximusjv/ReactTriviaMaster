import type Question from "@data/Question.ts";
import * as React from "react";


type QuestionCardProps = {
    question: Question;
    onAnswer: (answer: string) => void;
}

const QuestionCard: React.FC<QuestionCardProps> = ({question, onAnswer}) => {
    return <div className="p-8 rounded-2xl bg-amber-50 border-2 flex max-h-2xl h-8/12 min-h-xl flex-col items-center justify-evenly w-1/2 max-w-xl">
        <h1 className="text-3xl leading-tight text-amber-950">{question.question}</h1>
        <div className="flex flex-col justify-evenly w-1/2 text-amber-50">
            {question.answers.map(answer => (
                <button key={answer} onClick={() => onAnswer(answer)} className="mt-2 mb-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
                    {answer}
                </button>
            ))}
        </div>
    </div>;
};

export default QuestionCard;