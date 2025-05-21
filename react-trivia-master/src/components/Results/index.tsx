import type Question from "@data/Question.ts";
import * as React from "react";

export type AnswerRecord = {
    question: Question,
    answer: string,
};

type ResultProps = {record: AnswerRecord[], reset: () => void};

const Results : React.FC<ResultProps> = ({record, reset}, ) => {
    const score = record.reduce((previousValue, currentValue) => {
        return previousValue + +(currentValue.answer === currentValue.question.correct_answer);
    },0);
    return <div className="p-8 rounded-2xl bg-amber-50 border-2 flex max-h-2xl h-8/12 min-h-xl flex-col items-center justify-between w-1/2 min-w-min max-w-2xl">
        <p className="text-4xl ">Yor score is:</p>
        <p className="text-2xl">{score}/{record.length}</p>
        <button className="mt-2 mb-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" onClick={reset}>Play again</button>
    </div>;
};

export default Results;