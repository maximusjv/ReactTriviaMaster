import {APIError, APIFetchError, APIRequestRejected, ResponseCode} from "@data/OpenTDB.ts";

interface ErrorComponentProps {
    error: Error;
}

function errorToString(error: Error) {
    if(error instanceof APIError) {
        if(error instanceof APIRequestRejected) {
            switch (error.code) {
                case ResponseCode.NoResults:
                    return `Sorry, there is not enough question for given constraints`;
                case ResponseCode.RateLimit:
                    return `Sorry, you've reached the limit for requests, please try again in a few seconds.`;
                case ResponseCode.InvalidParameter:
                    return `Sorry, there is an invalid parameter, please reach our developers about it`;
                case ResponseCode.TokenNotFound:
                case ResponseCode.TokenEmpty:
                    return `Sorry, we've encountered some error, please reload the page`;
            }
        } else if (error instanceof APIFetchError) {
            if(error.response.status == 429) {
                return `Sorry, you've reached the limit for requests, please try again in a few seconds.`;
            }
        }
    }   else {
        return error.message;
    }
    return `Sorry, we've encountered some error`;
}

export default function ErrorComponent({error}: ErrorComponentProps) {
    return <div className="bg-red-200 text-red-900  sm:p-8 flex flex-col items-center justify-center w-xl">
        <h1 className={"text-wrap w-full text-center font-bold"}>Error occurred.</h1>
        <p className={"text-wrap w-full text-center"}>{errorToString(error)}.</p>
    </div>;
}