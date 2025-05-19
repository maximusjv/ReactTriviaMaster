import TriviaManager from "@data/TriviaManager.ts";
import * as React from "react";
import type {Trivia} from "@data/Trivia.ts";

type TriviaBuilderProps = {
    triviaManager: TriviaManager;
    setTrivia: (trivia: Trivia) => void;
}

const TriviaBuilder: React.FC<TriviaBuilderProps> = ({triviaManager}) => {
    return <>
    </>;
};

export default TriviaBuilder;