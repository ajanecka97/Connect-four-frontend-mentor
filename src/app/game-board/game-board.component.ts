import { Component, OnInit } from '@angular/core';

type Player = 'Red' | 'Yellow' | null;

@Component({
  selector: 'app-game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.scss'],
})
export class GameBoardComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  public board: Player[][] = [
    ['Yellow', 'Red', 'Yellow'],
    ['Yellow', 'Red'],
    ['Red', 'Yellow', 'Red', 'Yellow'],
    ['Yellow', 'Red', 'Yellow', 'Red'],
    ['Red', 'Yellow', 'Red', 'Yellow', 'Red', 'Yellow'],
    ['Yellow', 'Red', 'Yellow', 'Red', 'Yellow', 'Red'],
    ['Yellow', 'Red', 'Yellow', 'Red', 'Yellow', 'Red'],
  ];
}
