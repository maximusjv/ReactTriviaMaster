import TriviaManager from "@data/TriviaManager.ts";
import * as React from "react";
import type {Trivia} from "@data/Trivia.ts";
import {type FormEvent, type FormEventHandler} from "react";
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
                className="min-w-min min-h-min"
                onSubmit={handleSubmit}>
                <div className="flex flex-col justify-evenly w-full pl-2 pr-2 select-none text-black">
                    <div className="mt-2 mb-2 flex flex-col">
                        <label htmlFor="category" className="mb-2 ">Pick Trivia Category:</label>
                        <select name="category" id="category" className="bg-white">
                            <option value={0}>All categories</option>
                            {
                                triviaManager.categories.map(cat => <option key={cat.name}
                                                                            value={cat.id}>{cat.name}</option>)
                            }
                        </select>
                    </div>
                    <div className="mt-2 mb-2 flex flex-col">
                        <label htmlFor="difficulty" className="mb-2 ">Pick Question Difficulty:</label>
                        <select name="difficulty" id="difficulty" className="bg-white">
                            <option value={"all"}>All difficulties</option>
                            <option value={QuestionDifficulty.Easy}>Easy</option>
                            <option value={QuestionDifficulty.Medium}>Medium</option>
                            <option value={QuestionDifficulty.Hard}>Hard</option>
                        </select>
                    </div>
                    <div className="mt-2 mb-2 flex flex-col">
                        <label htmlFor="length" className="mb-2 ">Pick length:</label>
                        <select name="length" id="length" className="bg-white">
                            <option value={10}>Short (10 questions)</option>
                            <option value={20}>Medium (20 questions)</option>
                            <option value={30}>Long (30 questions)</option>
                        </select>
                    </div>


                </div>
                <ActionButton type="submit">
                    Play the trivia!
                </ActionButton>
            </form>
        </MainComponent>);
};

export default TriviaBuilder;