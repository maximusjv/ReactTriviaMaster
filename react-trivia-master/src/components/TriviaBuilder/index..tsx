import TriviaManager from "@data/TriviaManager.ts";
import * as React from "react";
import {type FormEvent, type FormEventHandler} from "react";
import type {Trivia} from "@data/Trivia.ts";
import {QuestionDifficulty} from "@data/Question.ts";
import MainComponent from "components/MainContainer";
import ActionButton from "components/ActionButton";

type TriviaBuilderProps = {
    triviaManager: TriviaManager;
    setTrivia: (trivia: Trivia) => void;
}

type TriviaOptionsFormType = {
    category: string;
    difficulty: string;
    length: string;
}

const TriviaBuilder: React.FC<TriviaBuilderProps> = ({triviaManager, setTrivia}) => {

    const handleSubmit: FormEventHandler<HTMLFormElement> = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        const formValues = Object.fromEntries(formData) as TriviaOptionsFormType;
        triviaManager.buildTrivia({
            category: triviaManager.category(+formValues.category) ?? null,
            difficulty: formValues.difficulty === "all" ? null : formValues.difficulty as QuestionDifficulty,
            questionAmount: +formValues.length,
            timer: null,
            type: null,
        }).then((trivia) => setTrivia(trivia));


    };

    return (
        <MainComponent>
            <form
                className="min-w-min min-h-min bg-white rounded px-2 py-2 md:px-8 md:py-8 md:m-4"
                onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="category" className="block text-gray-700 text-sm font-bold mb-2">
                        Pick Trivia Category:
                    </label>
                    <select name="category" id="category"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                        <option value={0}>All categories</option>
                        {
                            triviaManager.categories.map(cat => <option key={cat.name}
                                                                        value={cat.id}>{cat.name}</option>)
                        }
                    </select>
                </div>
                <div className="mb-4">
                    <label htmlFor="difficulty" className="block text-gray-700 text-sm font-bold mb-2">
                        Pick Question Difficulty:
                    </label>
                    <select name="difficulty" id="difficulty"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                        <option value={"all"}>All difficulties</option>
                        <option value={QuestionDifficulty.Easy}>Easy</option>
                        <option value={QuestionDifficulty.Medium}>Medium</option>
                        <option value={QuestionDifficulty.Hard}>Hard</option>
                    </select>
                </div>
                <div className="mb-6">
                    <label htmlFor="length" className="block text-gray-700 text-sm font-bold mb-2">
                        Pick length:
                    </label>
                    <select name="length" id="length"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                        <option value={10}>Short (10 questions)</option>
                        <option value={20}>Medium (20 questions)</option>
                        <option value={30}>Long (30 questions)</option>
                    </select>
                </div>

                <ActionButton type="submit"
                              className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                    Play the trivia!
                </ActionButton>
            </form>
        </MainComponent>);
};

export default TriviaBuilder;