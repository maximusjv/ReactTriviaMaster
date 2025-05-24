import type {Category} from "@data/Question";
import {Retry} from "@data/utils";

export enum ResponseCode {
    Success = 0,
    NoResults,
    InvalidParameter,
    TokenNotFound,
    TokenEmpty,
    RateLimit,
}

interface ResponseWithCode {
    response_code: ResponseCode;
}

interface TokenRequestResponse extends ResponseWithCode {
    response_message: string;
    token: string;
}

interface CategoryCount {
    total_num_of_verified_questions: number;
    total_num_of_pending_questions: number;
    total_num_of_rejected_questions: number;
    total_num_of_questions: number;
}

interface CategoryCountResponse {
    overall: CategoryCount;
    categories: {
        [id: string]: CategoryCount;
    };
}

interface CategoryResponse {
    trivia_categories: [
        {
            id: number;
            name: string;
        }
    ];
}

interface RawQuestion {
    category: string;
    type: string;
    difficulty: string;
    question: string;
    correct_answer: string;
    incorrect_answers: string[];
}

interface QuestionResponse extends ResponseWithCode {
    response_code: number;
    results: RawQuestion[];
}

interface QuestionRequestParameters {
    category: number | null;
    difficulty: string | null;
    amount: number;
    type: string | null;
}

export class APIError extends Error {
    constructor(public readonly request: string, message: string) {
        super(message);
    }

    repeatable(): boolean {
        return false;
    }
}

export class APIRequestRejected extends APIError {
    constructor(public readonly code: ResponseCode, request: string) {
        const message = `API request: "${request}" rejected with response code "${ResponseCode[code]}"`;
        super(request, message);
    }

    repeatable(): boolean {
        return this.code == ResponseCode.Success || this.code == ResponseCode.TokenEmpty || this.code == ResponseCode.RateLimit;
    }
}

export class APIFetchError extends APIError {
    constructor(request: string, public readonly response: Response) {
        const message = `API request: "${request}" failed with status code "${response.status}, ${response.statusText}"`;
        super(request, message);
    }

    repeatable(): boolean {
        return false;
    }
}

function decodeRawQuestion(rawQuestion: RawQuestion): RawQuestion {
    const decode = decodeURIComponent;
    return {
        category: decode(rawQuestion.category),
        type: decode(rawQuestion.type),
        difficulty: decode(rawQuestion.difficulty),
        question: decode(rawQuestion.question),
        correct_answer: decode(rawQuestion.correct_answer),
        incorrect_answers: rawQuestion.incorrect_answers.map(decode),
    };
}

export default class OpenTriviaDB {
    private constructor(private session_token: string) {
    }

    public static async init(): Promise<OpenTriviaDB> {
        const token = await OpenTriviaDB.fetchSessionToken();
        return new OpenTriviaDB(token);
    }

    @Retry(3, 100)
    private static async fetchSessionToken(): Promise<string> {
        const request = "https://opentdb.com/api_token.php?command=request";
        const response = await fetch(request);

        if (response.ok) {
            const body: TokenRequestResponse = await response.json();
            if (body.response_code === ResponseCode.Success) {
                return body.token;
            }
            throw new APIRequestRejected(body.response_code, request);
        } else {
            throw new APIFetchError(request, response);
        }
    }

    @Retry(3, 100)
    private static async fetchCategoryList(): Promise<
        { id: number; name: string }[]
    > {
        const request = "https://opentdb.com/api_category.php";
        const response = await fetch("https://opentdb.com/api_category.php");
        if (response.ok) {
            const body: CategoryResponse = await response.json();
            return body.trivia_categories;
        } else {
            throw new APIFetchError(request, response);
        }
    }

    @Retry(3, 100)
    private static async fetchCategorySize(): Promise<{
        [id: number]: number;
    }> {
        const request = "https://opentdb.com/api_count_global.php";
        const response = await fetch(request);
        if (response.ok) {
            const body: CategoryCountResponse = await response.json();
            return Object.fromEntries(
                Object.entries(body.categories).map(([id, cat]) => {
                    return [+id, cat.total_num_of_verified_questions];
                })
            );
        } else {
            throw new APIFetchError(request, response);
        }
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
    public async fetchQuestions(requestParameters: QuestionRequestParameters): Promise<RawQuestion[]> {

        const request = this.buildQuestionUrl(requestParameters, this.session_token);
        const response = await fetch(request);

        if (response.ok) {
            const body: QuestionResponse = await response.json();
            if (body.response_code === ResponseCode.Success) {
                return body.results.map(decodeRawQuestion);
            } else if (body.response_code === ResponseCode.TokenEmpty) {
                // Because of the bug in API we have to determine whether there is no enough questions at all
                //  that the token has not enough questions
                if (await new Promise(resolve => setTimeout(() => resolve(this.hasQuestions(requestParameters)), 5000))) {
                    this.session_token = await OpenTriviaDB.fetchSessionToken();
                    return this.fetchQuestions(requestParameters);
                } else {
                    throw new APIRequestRejected(ResponseCode.NoResults, request);
                }

            } else {
                throw new APIRequestRejected(body.response_code, request);
            }
        } else {
            throw new APIFetchError(request, response);
        }
    }

    private buildQuestionUrl({
                                 category,
                                 difficulty,
                                 amount,
                                 type,
                             }: QuestionRequestParameters,
                             token: string | null,
    ): string {
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
        if (token) {
            url.searchParams.append("token", token);
        }
        url.searchParams.append("encode", "url3986");
        return url.toString();
    }

    private async hasQuestions(requestParameters: QuestionRequestParameters): Promise<boolean> {
        const request = this.buildQuestionUrl(requestParameters, null);
        const response = await fetch(request);

        if (response.ok) {
            const body: QuestionResponse = await response.json();
            if (body.response_code === ResponseCode.Success) {
                return true;
            } else if (body.response_code === ResponseCode.NoResults) {
                return false;
            } else {
                throw new APIRequestRejected(body.response_code, request);
            }
        } else {
            throw new APIFetchError(request, response);
        }
    }
}
