import type Question from "@data/Question.ts";
import * as React from "react";

export type AnswerRecord = {
    question: Question,
    answer: string,
};

type ResultProps = {record: AnswerRecord[]};

const Results : React.FC<ResultProps> = ({record}) => {
    return <>
    </>;
};

export default Results;