import { EMPTY, Subject, defer, map, switchMap, timer } from 'rxjs';

export type TimerControlCommand = 'start' | 'pause' | 'resume';

export function createTimer(
  turnTimeInSeconds: number,
  timerControlSubject$: Subject<TimerControlCommand>
) {
  return defer(() => {
    let count = turnTimeInSeconds;
    const ticker = timer(0, 1000).pipe(map(() => count--));
    return timerControlSubject$.pipe(
      switchMap((command) => {
        switch (command) {
          case 'start':
            count = turnTimeInSeconds;
            return ticker;
          case 'pause':
            return EMPTY;
          case 'resume':
            return ticker;
          default:
            return EMPTY;
        }
      })
    );
  });
}
