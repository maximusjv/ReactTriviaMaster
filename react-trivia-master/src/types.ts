export type Loading<T> = {
    isLoading: boolean;
    failure: any;
    value: T | null;
};