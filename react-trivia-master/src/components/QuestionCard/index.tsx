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
        <h1 className="text-2xl font-semibold text-gray-800 text-center mb-6">{question.question}</h1>
        <div className="grid gap-4">
            {question.answers.map(answer => (
                <ActionButton key={answer} onClick={() => onAnswer(answer)} className="min-w-2xs">
                    {answer}
                </ActionButton>
            ))}
        </div>
    </MainContainer>;
};

export default QuestionCard;