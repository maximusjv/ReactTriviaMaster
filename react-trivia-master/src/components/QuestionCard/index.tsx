import type Question from "@data/Question.ts";
import * as React from "react";
import MainContainer from "components/MainContainer";
import ActionButton from "@components/ActionButton";

type QuestionCardProps = {
    question: Question;
    onAnswer: (answer: string) => void;
}

const QuestionCard: React.FC<QuestionCardProps> = ({question, onAnswer}) => {
    return <MainContainer className="px-8 ">
            <h1 className="text-2xl font-semibold text-gray-800 text-center mb-6">{question.question}</h1>
            <div className="flex flex-col justify-evenly items-center w-full md:w-2/3 md:min-w-min md:max-w-lg">
                {question.answers.map(answer => (
                    <ActionButton key={answer} onClick={() => onAnswer(answer) } className={"w-full"} >
                        {answer}
                    </ActionButton>

                ))}
            </div>

    </MainContainer>;
};

export default QuestionCard;