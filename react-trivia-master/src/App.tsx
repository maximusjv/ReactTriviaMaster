import {Outlet} from 'react-router'
import * as React from "react";
import {useEffect, useReducer} from "react";
import TriviaManager from "@data/TriviaManager";
import {type AppContext, type AppState, type Action, ActionTypes} from "@/types";
import type {Trivia} from "@data/Trivia.ts";


function reducer(state: AppState, action: Action): AppState {
    switch (action.type) {
        case ActionTypes.setTriviaManager:
            return {
                ...state,
                isLoading: false,
                triviaManager: action.triviaManager ?? null
            }
        case ActionTypes.setTrivia:
            return {
                ...state,
                trivia: action.trivia!
            }
        case ActionTypes.pointUp:
            return {
                ...state,
                points: state.points + 1
            }
        case ActionTypes.pointReset:
            return {
                ...state,
                points: 0,
            }
        default:
            return state
    }
}

const App: React.FC = () => {
    const [appState, dispatchAppContext] = useReducer(reducer, {
        isLoading: true,
        triviaManager: null,
        trivia: null,
        points: 0,
    } as AppState)

    useEffect(() => {
        TriviaManager.getInstance().then((manager) => {
            dispatchAppContext({
                type: ActionTypes.setTriviaManager,
                triviaManager: manager
            } as Action);
        }, () => {
            dispatchAppContext({
                type: ActionTypes.setTriviaManager,
                triviaManager: undefined,
            } as Action);
        })
    }, []);

    return (
        <Outlet context={{
            state: appState,
            setTrivia: (trivia: Trivia) => (dispatchAppContext({
                type: ActionTypes.setTrivia,
                trivia: trivia
            } as Action)),
            rewardPoint: () => (dispatchAppContext({type: ActionTypes.pointUp} as Action)),
            resetPoints: () => (dispatchAppContext({type: ActionTypes.pointReset} as Action)),
        } as AppContext}/>
    )
}

export default App
