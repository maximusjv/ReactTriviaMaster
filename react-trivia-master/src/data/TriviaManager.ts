import  {type  Category, QuestionType, QuestionDifficulty} from "@data/Question";
import Question from "@data/Question";
import OpenTriviaDB from "@data/OpenTDB";
import {Trivia} from "@data/Trivia.ts";

export type TriviaOptions = {
  category: Category | null;
  type: QuestionType | null;
  difficulty: QuestionDifficulty | null;
  timer: number | null;
  questionAmount: number;
};


export default class TriviaManager {

  _categories_map: Map<number | string, Category>;

  private static instance: TriviaManager | undefined = undefined;
  public static async getInstance(): Promise<TriviaManager> {
      if(TriviaManager.instance) return TriviaManager.instance;
      else {
        const db = await OpenTriviaDB.init();
        const categories = await db.fetchCategories();



        return TriviaManager.instance = new TriviaManager(db, categories);
      }
  }

  private constructor(
    private _DB: OpenTriviaDB,
    private _categories: Category[],
    ) {
    const categories_map = new Map<number | string, Category>();
    _categories.forEach((cat) => {
      categories_map.set(cat.id, cat);
      categories_map.set(cat.name, cat);
    });
    this._categories_map = categories_map;
  }

  get categories() {
    return this._categories;
  }

  public category(key: number | string) {
      return this._categories_map.get(key);
  }

  public async buildTrivia(options: TriviaOptions): Promise<Trivia> {
      const rawQuestions = await this._DB.fetchQuestions(
          options.category?.id ?? null,
          options.difficulty,
          options.questionAmount,
          options.type
      );
      const questions = rawQuestions.map((question) =>
      new Question(
          this._categories_map.get(question.category)!,
          question.question,
          question.difficulty as QuestionDifficulty,
          question.type as QuestionType,
          question.correct_answer,
          question.incorrect_answers
      ));
      return new Trivia(
          options.category,
          options.type,
          options.difficulty,
          options.timer,
          questions
      );
  }



}