import type { Category } from "@data/Question";
import Question, { QuestionDifficulty, QuestionType } from "@data/Question";
import { Retry } from "@data/utils";

enum ResponseCode {
  Success = 0,
  NoResults,
  InvalidParameter,
  TokenNotFound,
  TokenEmpty,
  RateLimit,
}

type TokenRequestResponse = {
  response_code: number;
  response_message: string;
  token: string;
};

type CategoryCount = {
  total_num_of_verified_questions: number;
  total_num_of_pending_questions: number;
  total_num_of_rejected_questions: number;
  total_num_of_questions: number;
};

type CategoryCountResponse = {
  overall: CategoryCount;
  categories: {
    [id: string]: CategoryCount;
  };
};

type CategoryResponse = {
  trivia_categories: [
    {
      id: number;
      name: string;
    }
  ];
};

type QuestionRequest = {
  response_code: number;
  results: {
    category: string;
    type: string;
    difficulty: string;
    question: string;
    correct_answer: string;
    incorrect_answers: string[];
  }[];
};

export default class OpenTriviaDB {
  private constructor(private session_token: string) {}

  @Retry(3, 100)
  private static async fetchSessionToken(): Promise<string> {
    const response = await fetch(
      "https://opentdb.com/api_token.php?command=request"
    );
    if (response.ok) {
      const body: TokenRequestResponse = await response.json();
      if (body.response_code === ResponseCode.Success) {
        return body.token;
      }
      throw new Error(JSON.stringify(body));
    } else {
      throw new Error(JSON.stringify(response));
    }
  }

  @Retry(3, 100)
  private static async fetchCategoryList(): Promise<
    { id: number; name: string }[]
  > {
    const response = await fetch("https://opentdb.com/api_category.php");
    if (response.ok) {
      const body: CategoryResponse = await response.json();
      return body.trivia_categories;
    } else {
      throw new Error(JSON.stringify(response));
    }
  }

  @Retry(3, 100)
  private static async fetchCategorySize(): Promise<{
    [id: number]: number;
  }> {
    const response = await fetch("https://opentdb.com/api_count_global.php");
    if (response.ok) {
      const body: CategoryCountResponse = await response.json();
      return Object.fromEntries(
        Object.entries(body.categories).map(([id, cat]) => {
          return [+id, cat.total_num_of_verified_questions];
        })
      );
    } else {
      throw new Error(JSON.stringify(response));
    }
  }

  public static async init(): Promise<OpenTriviaDB> {
    const token = await OpenTriviaDB.fetchSessionToken();
    return new OpenTriviaDB(token);
  }

  public async fetchCategories(): Promise<Category[]> {
    const categories = await OpenTriviaDB.fetchCategoryList();
    const sizes = await OpenTriviaDB.fetchCategorySize();
    return categories.map((cat) => {
      return {
        id: cat.id,
        name: cat.name,
        size: sizes[cat.id],
      };
    });
  }

  @Retry(3, 100)
  public async fetchQuestions(
    category: number | null,
    difficulty: string | null,
    amount: number,
    type: string | null,
    getCategoryFn: (name: string) => Category
  ): Promise<Question[]> {
    const url = new URL("https://opentdb.com/api.php");
    url.searchParams.append("amount", amount.toString());
    if (category) {
      url.searchParams.append("category", category.toString());
    }
    if (difficulty) {
      url.searchParams.append("difficulty", difficulty);
    }
    if (type) {
      url.searchParams.append("type", type);
    }
    if (this.session_token) {
      url.searchParams.append("token", this.session_token);
    }
    const response = await fetch(url.toString());

    if (response.ok) {
      const body: QuestionRequest = await response.json();
      if (body.response_code === ResponseCode.Success) {
        return body.results.map((q) => {
          return new Question(
            getCategoryFn(q.category),
            q.question,
            QuestionDifficulty[q.difficulty as keyof typeof QuestionDifficulty],
            QuestionType[q.type as keyof typeof QuestionType],
            q.correct_answer,
            q.incorrect_answers
          );
        });
      } else if (body.response_code === ResponseCode.TokenEmpty) {
        this.session_token = await OpenTriviaDB.fetchSessionToken();
        return this.fetchQuestions(
          category,
          difficulty,
          amount,
          type,
          getCategoryFn
        );
      } else {
        throw new Error(JSON.stringify(body));
      }
    } else {
      throw new Error(JSON.stringify(response));
    }
  }
}
