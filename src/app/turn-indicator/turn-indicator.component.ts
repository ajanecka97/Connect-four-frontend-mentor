import { Component, OnInit } from '@angular/core';
import { GameService } from '../game.service';

@Component({
  selector: 'app-turn-indicator',
  templateUrl: './turn-indicator.component.html',
  styleUrls: ['./turn-indicator.component.scss'],
})
export class TurnIndicatorComponent implements OnInit {
  constructor(public gameService: GameService) {}

  ngOnInit(): void {
    this.gameService.initializeGame();
  }

  ngAfterViewInit(): void {
    this.gameService.startTimer();
  }
}
