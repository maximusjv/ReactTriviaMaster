import type { Category, QuestionDifficulty, QuestionType } from "@data/Question";
import OpenTriviaDB from "@data/OpenTDB";

export type TriviaOptions = {
  category: Category | null;
  type: QuestionType | null;
  difficulty: QuestionDifficulty | null;
  timer: number | null;
  questionAmount: number;
};


export default class TriviaManager {
 

  private static instance: TriviaManager | undefined = undefined;
  public static async getInstance(): Promise<TriviaManager> {
      if(TriviaManager.instance) return TriviaManager.instance;
      else {
        const db = await OpenTriviaDB.init();
        const categories_map = new Map<number | string, Category>();
        (await db.fetchCategories()).forEach((cat) => {
          categories_map.set(cat.id, cat);
          categories_map.set(cat.name, cat);
        })
        return TriviaManager.instance = new TriviaManager(db, categories_map);
      }
  }

  private constructor(
    private _DB: OpenTriviaDB,
    private _categories_map: Map<number | string, Category>
    ) {
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public async buildTrivia(options: TriviaOptions) {

  }



}