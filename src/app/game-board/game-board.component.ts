import { Component, OnInit } from '@angular/core';
import { GameService } from '../game.service';

type Player = 'Red' | 'Yellow' | null;

@Component({
  selector: 'app-game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.scss'],
})
export class GameBoardComponent implements OnInit {
  constructor(public gameService: GameService) {}

  ngOnInit(): void {
    this.gameService.initializeGame();
  }
}
