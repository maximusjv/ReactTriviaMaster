import {Outlet} from 'react-router';
import * as React from "react";
import {useEffect, useState} from "react";
import TriviaManager from "@data/TriviaManager";
import {APIError} from "@data/OpenTDB.ts";
import ErrorComponent from "@components/ErrorComponent";
import LoadingSpinner from "@components/Loading";

interface Loading<T> {
    isLoading: boolean;
    failure: any;
    value: T | null;
}

const App: React.FC = () => {
    const [triviaManagerState, setTriviaManagerState] = useState<Loading<TriviaManager>>({
        isLoading: true,
        failure: null,
        value: null,
    });

    useEffect(() => {
        TriviaManager.getInstance().then((manager) => {
            setTriviaManagerState({
                isLoading: false,
                failure: null,
                value: manager
            });
        }, (reason: APIError) => {
            setTriviaManagerState({
                isLoading: false,
                failure: reason,
                value: null,
            });
        });
    }, []);


    return (
        <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
            {triviaManagerState.isLoading ?
                    <LoadingSpinner/> :
                (
                    triviaManagerState.failure ?
                        <ErrorComponent error={triviaManagerState.failure}/> :
                        <Outlet context={triviaManagerState.value}/>
                )}
        </div>

    );
};

export default App;