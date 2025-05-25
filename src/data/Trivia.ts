import type Question from "@data/Question";
import type {Category, QuestionDifficulty, QuestionType} from "@data/Question";

export class Trivia {
    constructor(
        private _category: Category | null,
        private _type: QuestionType | null,
        private _difficulty: QuestionDifficulty | null,
        private _timer: number | null,
        private _questions: Question[],
    ) {
    }

    get category(): Category | null {
        return this._category;
    }

    get type(): QuestionType | null {
        return this._type;
    }

    get difficulty(): QuestionDifficulty | null {
        return this._difficulty;
    }

    get timer(): number | null {
        return this._timer;
    }

    get length(): number {
        return this._questions.length;
    }

    getQuestion(index: number): Question {
        return this._questions[index];
    }

}