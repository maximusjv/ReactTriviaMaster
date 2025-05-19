import * as React from "react";
import {useOutletContext} from "react-router";
import type TriviaManager from "@data/TriviaManager.ts";
import {useState} from "react";
import TriviaBuilder from "@components/TriviaBuilder/index..tsx";
import type {Trivia} from "@data/Trivia.ts";
import Results, {type AnswerRecord} from "@components/Results";
import QuestionCard from "@components/QuestionCard";


enum GameState {
    BUILD,
    PLAY,
    RESULTS
}


const Game: React.FC = () => {
    const triviaManager = useOutletContext() as TriviaManager;
    const [gameState, setGameState] = useState(GameState.BUILD);
    const [trivia, setTrivia] = useState<Trivia | null>(null);
    const [record, setRecord] = useState([] as AnswerRecord[]);


    switch (gameState) {
        case GameState.BUILD:
            return <TriviaBuilder
                triviaManager={triviaManager}
                setTrivia={(trivia: Trivia | null) => {
                    setGameState(GameState.PLAY);
                    setTrivia(trivia);
                }}
            />;
        case GameState.PLAY:
            return trivia ? <QuestionCard question={trivia.getQuestion(record.length)}
                                          onAnswer={(answer: string) => setRecord([...record, {
                                              question: trivia.getQuestion(record.length),
                                              answer: answer
                                          }])}/> : null;
        case GameState.RESULTS:
            return <Results record={record}/>;

    }

};

export default Game;