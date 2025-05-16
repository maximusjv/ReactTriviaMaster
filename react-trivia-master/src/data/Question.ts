import { shuffle } from "@data/utils";

export enum QuestionType {
  TrueFalse = "boolean",
  MultipleChoice = "multiple",
}

export enum QuestionDifficulty {
  Easy = "easy",
  Medium = "medium",
  Hard = "hard",
}

export type Category = {
  id: number;
  name: string;
  size: number;
};

export default class Question {
  constructor(
    private _category: Category,
    private _question: string,
    private _difficulty: QuestionDifficulty,
    private _type: QuestionType,
    private _correct_answer: string,
    private _wrong_answers: string[]
  ) {}

  get category(): Category {
    return this._category;
  }

  get question(): string {
    return this._question;
  }

  get difficulty(): QuestionDifficulty {
    return this._difficulty;
  }

  get type(): QuestionType {
    return this._type;
  }

  get correct_answer(): string {
    return this._correct_answer;
  }

  get wrong_answers(): string[] {
    return this._wrong_answers;
  }

  get answers(): string[] {
    return this._type === QuestionType.MultipleChoice
      ? shuffle([this._correct_answer, ...this._wrong_answers])
      : ["True", "False"];
  }
}
