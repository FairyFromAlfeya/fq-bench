import {
  timeout,
  defer,
  retry,
  timer,
  ObservableInput,
  Observable,
  ObservedValueOf,
} from 'rxjs';

export const retryIfTimeout = <R extends ObservableInput<unknown>>(
  factory: () => R,
  timeoutMs: number,
  retryDelayMs: number,
): Observable<ObservedValueOf<R>> => {
  return defer(factory).pipe(
    timeout(timeoutMs),
    retry({
      delay: (err) => {
        console.error(err);
        return timer(retryDelayMs);
      },
    }),
  );
};
