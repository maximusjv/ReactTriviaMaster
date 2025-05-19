import type Question from "@data/Question.ts";
import * as React from "react";

type QuestionCardProps = {
    question: Question;
    onAnswer: (answer: string) => void;
}

const QuestionCard: React.FC<QuestionCardProps> = ({question, onAnswer}) => {
    return <></>;
};

export default QuestionCard;