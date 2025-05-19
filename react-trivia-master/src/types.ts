export type Loading<T> = {
    isLoading: boolean;
    reason: any;
    value: T | null;
};