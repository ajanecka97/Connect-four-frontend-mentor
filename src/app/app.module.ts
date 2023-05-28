import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { GameBoardComponent } from './game-board/game-board.component';
import { TurnIndicatorComponent } from './turn-indicator/turn-indicator.component';

@NgModule({
  declarations: [
    AppComponent,
    GameBoardComponent,
    TurnIndicatorComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
