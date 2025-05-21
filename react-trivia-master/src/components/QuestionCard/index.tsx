import type Question from "@data/Question.ts";
import * as React from "react";
import MainContainer from "components/MainContainer";
import ActionButton from "@components/ActionButton";

type QuestionCardProps = {
    question: Question;
    onAnswer: (answer: string) => void;
}

const QuestionCard: React.FC<QuestionCardProps> = ({question, onAnswer}) => {
    return <MainContainer>
        <h1 className="text-2xl text-pretty text-sky-950 text-center h-fit">{question.question}</h1>
        <div className="flex flex-col justify-evenly w-1/2 ">
            {question.answers.map(answer => (
                <ActionButton key={answer} onClick={() => onAnswer(answer)}>
                    {answer}
                </ActionButton>
            ))}
        </div>
    </MainContainer>;
};

export default QuestionCard;