import {
  timeout,
  defer,
  retry,
  timer,
  ObservableInput,
  Observable,
  ObservedValueOf,
  concat,
  range,
  of,
  pairwise,
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

export const getChainedPairs = (count: number): Observable<[number, number]> =>
  concat(range(count), of(0)).pipe(pairwise());
