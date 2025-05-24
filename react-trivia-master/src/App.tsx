import {Outlet} from 'react-router';
import * as React from "react";
import {useEffect, useState} from "react";
import TriviaManager from "@data/TriviaManager";
import type {Loading} from "@/types.ts";
import {type APIFetchError, APIRequestRejected} from "@data/OpenTDB.ts";
import ErrorComponent from "@components/ErrorComponent";
import LoadingSpinner from "@components/Loading";


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
        }, (reason: APIFetchError | APIRequestRejected) => {
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