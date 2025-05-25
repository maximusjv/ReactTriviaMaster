import * as React from "react";
import {useOutletContext} from "react-router";
import type TriviaManager from "@data/TriviaManager.ts";
import {useState} from "react";
import TriviaBuilder from "@components/TriviaBuilder/index..tsx";
import type {Trivia} from "@data/Trivia.ts";
import Results, {type AnswerRecord} from "@components/Results";
import QuestionCard from "@components/QuestionCard";
import MainContainer from "@components/MainContainer";

enum GameState {
    BUILD,
    PLAY,
    RESULTS
}

const Game: React.FC = () => {
    const triviaManager = useOutletContext() as TriviaManager;
    const [trivia, setTrivia] = useState<Trivia | null>(null);
    const [record, setRecord] = useState([] as AnswerRecord[]);
    let content: any;

    let gameState = GameState.BUILD;
    if (trivia != null) gameState = GameState.PLAY;
    if (trivia != null && record.length == trivia.length) gameState = GameState.RESULTS;

    switch (gameState) {
        case GameState.BUILD:
            content = <TriviaBuilder
                triviaManager={triviaManager}
                setTrivia={(trivia: Trivia | null) => {
                    setTrivia(trivia);
                }}
            />;
            break;
        case GameState.PLAY:
            content = trivia ? <QuestionCard question={trivia.getQuestion(record.length)}
                                             onAnswer={(answer: string) => setRecord([...record, {
                                                 question: trivia.getQuestion(record.length),
                                                 answer: answer
                                             }])}
                                             time = {trivia.timer}/> : null;
            break;
        case GameState.RESULTS:
            content = <Results record={record} reset={() => {
                setTrivia(null);
                setRecord([]);
            }}/>;
            break;
        default:
            content = null;
    }

    return (
        <MainContainer>
            {content}
        </MainContainer>
    );

};

export default Game;