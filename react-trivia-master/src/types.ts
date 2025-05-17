import type TriviaManager from "@data/TriviaManager";
import type {Trivia} from "@data/Trivia";

export enum ActionTypes {
    setTriviaManager,
    setTrivia,
    pointUp,
    pointReset
}

export type AppState = {
    isLoading: boolean;
    triviaManager: null | TriviaManager;
    trivia: null | Trivia;
    points: number,
}

export type Action = {
    type: ActionTypes;
    isLoading: boolean | undefined;
    triviaManager: TriviaManager | undefined;
    trivia: Trivia | undefined;
}

export type AppContext = {
    state: AppState;
    resetPoints: () => void;
    rewardPoint: () => void;
    setTrivia: (trivia: Trivia) => void;
}


