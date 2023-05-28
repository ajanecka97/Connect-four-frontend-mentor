import { Injectable } from '@angular/core';
import { EMPTY, Observable, Subject, defer, map, switchMap, timer } from 'rxjs';
import { tap } from 'rxjs/operators';

type TimerControlCommand = 'start' | 'pause' | 'resume';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  public readonly time$: Observable<number>;

  private readonly turnTimeInSeconds = 30;
  private readonly timerControlSubject$ = new Subject<TimerControlCommand>();

  constructor() {
    this.time$ = this.createTimer();
  }

  public initializeGame(): void {
    this.startTimer();
  }

  public startTimer(): void {
    this.timerControlSubject$.next('start');
  }

  public pauseTimer(): void {
    this.timerControlSubject$.next('pause');
  }

  public resumeTimer(): void {
    this.timerControlSubject$.next('resume');
  }

  private createTimer(): Observable<number> {
    return defer(() => {
      let count = this.turnTimeInSeconds;

      const ticker = timer(0, 1000).pipe(map(() => count--));

      return this.timerControlSubject$.pipe(
        switchMap((command) => {
          switch (command) {
            case 'start':
              count = this.turnTimeInSeconds;
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
}
