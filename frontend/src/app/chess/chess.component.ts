import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Subject, tap, timer } from 'rxjs';
import { UserService } from '../user.service';
import { WindowsService } from '../windows.service';
import { games } from './chess.data';

@Component({
  selector: 'app-chess',
  templateUrl: './chess.component.html',
  styleUrls: ['./chess.component.scss']
})
export class ChessComponent implements OnInit {

  constructor(private windowsService : WindowsService, private userService : UserService) { }

  index: number = this.userService.getUser().chessLevel;

  selectedPiece: any

  wrong: number | undefined = undefined

  next: boolean = false

  games : any = games

  position$ : Subject<any> = new Subject()

  async ngOnInit() {
    if (this.index == this.games.length) {
      alert("You finished all puzzles")
      timer(0).subscribe(() => this.windowsService.closeWindow('chess'))
    } 
    else {
      timer(0).subscribe(() => this.position$.next(this.games[this.index].positions[0]))
    }
    console.log((await this.userService.getCodes())[8])
  }

  getPos(i : any) {
    return Math.floor(i + (i / 8)) % 2
  }

  onClick(i : any, position : any) {
    let pos = position[i]
    if (this.selectedPiece == i) this.selectedPiece = -1
    else if (pos.piece && pos.piece[0] == 'w') this.selectedPiece = i
    else {      
      if (this.selectedPiece) this.resolvePosition(i, position)
      else if (pos.piece && pos.piece[0] != 'b') this.selectedPiece = i
    }
  }

  resolvePosition(i : any, position : any) {
    let game = this.games[this.index]
    if (this.selectedPiece == game.moves[game.index][0] && i == game.moves[game.index][1]) {
      position[i] = position[this.selectedPiece]
      position[this.selectedPiece] = 0
      if (game.index < 1) {
        timer(500).subscribe(() => {
          game.index++
          this.selectedPiece = undefined
          this.position$.next(game.positions[game.index])
        })
      }
      else {
        this.index++
        this.selectedPiece = undefined  
        this.userService.nextChessLevel()
        if (this.index == this.games.length) this.windowsService.closeWindow('chess')
        else {
          this.next = true
          timer(1500).subscribe(() => {
            this.next = false
            this.position$.next(this.games[this.index].positions[0])
          })
        }
      }
    }
    else {
      this.wrong = i
      timer(500).subscribe(() => {
        this.wrong = undefined
        this.position$.next(game.positions[game.index])
      })
    }
  }
}
