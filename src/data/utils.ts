import {APIError} from "@data/OpenTDB.ts";

export function shuffle<T>(array: T[]): T[] {
  const arr = array.slice();
  for (let i: number = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[j], arr[i]] = [arr[i], arr[j]];
  }
  return arr;
}


export function Retry<T>(attempts: number, delayMs: number = 10) {
  return function (
      target: T,
      propertyName: string,
      descriptor: PropertyDescriptor
  ) {
    const originalMethod = descriptor.value;

    descriptor.value = async function<H>(...args: H[]) {
      let attemptCount = 0;
      let lastError: unknown;

      while (attemptCount < attempts) {
        attemptCount++;
        try {
          return await originalMethod.apply(this, args);
        } catch (error) {
          if (error instanceof APIError && error.repeatable()) {
            lastError = error;
            console.log(
                `Attempt ${attemptCount} failed for method ${propertyName} due to APIError: ${error}`
            );
            if (attemptCount < attempts && delayMs > 0) {
              await new Promise((resolve) => setTimeout(resolve, delayMs * 10**(attemptCount-1) ));
            }
          } else {
            throw error;
          }
        }
      }
      console.error(
          `Failed after ${attempts} attempts for method ${propertyName}. Last APIError:`,
          lastError
      );
      throw lastError;
    };

    return descriptor;
  };
}
