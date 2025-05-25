import type Question from "@data/Question.ts";
import * as React from "react";
import ActionButton from "@components/ActionButton";
import Timer from "@components/Timer";
import {useCallback} from "react";

type QuestionCardProps = {
    question: Question;
    time: number | null;
    onAnswer: (answer: string) => void;
}

const QuestionCard: React.FC<QuestionCardProps> = ({question, time, onAnswer}) => {
    const onEnd = useCallback(() => {
        onAnswer("");
    }, [onAnswer]);
    return <>
        {time && <Timer className={"text-center border-1 rounded-md  px-4 py-2 mb-4  text-blue-900 text-xl font-mono"} duration={time} onEnd={onEnd} id={question.question}/>}
        <h1 className="text-2xl font-semibold text-gray-800 text-center mb-6">{question.question}</h1>
        <div className="flex flex-col justify-evenly items-center w-full md:w-2/3 md:min-w-min md:max-w-lg">
            {question.answers.map(answer => (
                <ActionButton key={answer} onClick={() => onAnswer(answer)} className={"w-full"}>
                    {answer}
                </ActionButton>

            ))}
        </div>
    </>;
};

export default QuestionCard;