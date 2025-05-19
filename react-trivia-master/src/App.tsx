import {Outlet} from 'react-router';
import * as React from "react";
import TriviaManager from "@data/TriviaManager";
import {useEffect, useState} from "react";
import type {Loading} from "@/types.ts";
import LoadingComponent from "@components/Loading";


const App: React.FC = () => {
    const [triviaManagerState, setTriviaManagerState] = useState<Loading<TriviaManager>>({
        isLoading: true,
        reason: null,
        value: null,
    });

    useEffect(() => {
        TriviaManager.getInstance().then((manager) => {
            setTriviaManagerState({
                    isLoading: false,
                    reason: null,
                    value: manager
                });
        }, (reason) => {
            setTriviaManagerState({
                isLoading: false,
                reason: reason,
                value: null,
            });
        });
    }, []);


    return (
        triviaManagerState.isLoading ? <LoadingComponent/> : <Outlet context={
            triviaManagerState
        }/>
    );
};

export default App;
