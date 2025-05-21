import type Question from "@data/Question.ts";
import * as React from "react";
import Index from "components/MainContainer";
import ActionButton from "@components/ActionButton";

export type AnswerRecord = {
    question: Question,
    answer: string,
};

type ResultProps = {record: AnswerRecord[], reset: () => void};

const Results : React.FC<ResultProps> = ({record, reset}, ) => {
    const score = record.reduce((previousValue, currentValue) => {
        return previousValue + +(currentValue.answer === currentValue.question.correct_answer);
    },0);
    return <Index>
        <p className="text-4xl ">Yor score is:</p>
        <p className="text-2xl">{score}/{record.length}</p>
        <ActionButton onClick={reset}>Play again</ActionButton>
    </Index>;
};

export default Results;