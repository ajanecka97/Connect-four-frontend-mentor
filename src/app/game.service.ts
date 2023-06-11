import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { TimerControlCommand, createTimer } from './utils/timer.utils';

type Player = 'red' | 'yellow';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  public readonly time$: Observable<number>;
  public readonly currentPlayer$: Observable<Player>;
  public readonly board$: Observable<Player[][]>;

  private readonly turnTimeInSeconds = 30;
  private readonly timerControlSubject$ = new Subject<TimerControlCommand>();
  private readonly currentPlayerSubject$ = new BehaviorSubject<Player>('red');
  private readonly boardSubject$ = new BehaviorSubject<Player[][]>(
    this.createEmptyBoard()
  );

  constructor() {
    this.time$ = createTimer(this.turnTimeInSeconds, this.timerControlSubject$);
    this.currentPlayer$ = this.currentPlayerSubject$.asObservable();
    this.board$ = this.boardSubject$.asObservable();
  }

  public initializeGame(): void {
    this.startTimer();
    this.currentPlayerSubject$.next('red');
    this.boardSubject$.next(this.createEmptyBoard());
  }

  public dispose() {
    this.timerControlSubject$.complete();
    this.currentPlayerSubject$.complete();
  }

  public move(column: number): void {
    const board = this.boardSubject$.getValue();
    const currentPlayer = this.currentPlayerSubject$.getValue();
    board[column].unshift(currentPlayer);
    this.boardSubject$.next(board);
    this.currentPlayerSubject$.next(currentPlayer === 'red' ? 'yellow' : 'red');
    this.timerControlSubject$.next('start');
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

  private createEmptyBoard(): Player[][] {
    return Array.from({ length: 7 }, () => []);
  }
}
