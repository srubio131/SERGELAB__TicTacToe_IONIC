import { Component, OnInit } from '@angular/core';
import { GLOBALS } from '../utils/globals';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss']
})
export class DashboardPage implements OnInit {

  public readonly NUM_ROWS: number = GLOBALS.DASHBOARD_OPTIONS.NUM_ROWS;
  public readonly NUM_COLS: number = GLOBALS.DASHBOARD_OPTIONS.NUM_COLS;
  public readonly TOTAL_CELLS: number = this.NUM_ROWS * this.NUM_COLS;

  public size: number[];
  public currentPlayer: number;

  private simbolList: string[];
  private dashboard: any[];
  private counter: number;
  private winner: string;

  constructor() {
    this.size = Array(this.NUM_ROWS).fill(0).map((x, i) => i);
    this.simbolList = ['X', 'O'];
    this.dashboard = this.initializeDashboard('');
  }

  ngOnInit() {
    this.initializeWindow();
  }

  public onClickCell(indexRow: number, indexCol: number): void {
    if (this.dashboard[indexRow][indexCol] === '' && this.winner === '') {
      this.updateDashboard(indexRow, indexCol);
      this.changePlayer();
      this.counter++;

      if (this.counter > 4) {
        // There isn't empty cells
        if (this.counter === this.TOTAL_CELLS) {
          this.winner = 'empate';
        // There is a winner
        } else if (this.isWinner(indexRow, indexCol)) {
          this.winner = this.dashboard[indexRow][indexCol];
        }
      }
    }
  }

  public drawSimbolInCell(indexRow: number, indexCol: number): string {
    return this.dashboard[indexRow][indexCol];
  }

  private initializeWindow(): void {
    this.currentPlayer = 0;
    this.counter = 0;
    this.winner = '';
  }

  private changePlayer(): void {
    this.currentPlayer = (this.currentPlayer < this.simbolList.length - 1) ? (this.currentPlayer + 1) : 0;
  }

  private updateDashboard(indexRow: number, indexCol: number): void {
    this.dashboard[indexRow][indexCol] = this.simbolList[this.currentPlayer];
  }

  private initializeDashboard(initialValue: any): any[] {
    const dashboard = [];
    Array(this.NUM_ROWS).fill(initialValue).forEach((row) => {
      dashboard.push(Array(this.NUM_COLS).fill(initialValue));
    });
    return dashboard;
  }

  private isWinner(indexRow: number, indexCol: number): boolean {
    let matchRow: boolean = true;
    let matchCol: boolean = true;
    let matchDiag: boolean = true;
    const figure: string = this.dashboard[indexRow][indexCol];

    // Check same row
    for(let c = 0; c < this.NUM_COLS; c++ ) {
      if(this.dashboard[indexRow][c] !== figure) {
        matchRow = false;
        break;
      }
    }

    if (!matchRow) {
      // Check same col
      for(let r = 0; r < this.NUM_ROWS; r++ ) {
        if (this.dashboard[r][indexCol] !== figure) {
          matchCol = false;
          break;
        }
      }
    }

    if (!matchCol) {
      if ((indexRow + indexCol) % 2 === 0) {
        // Check diagonal left to right
        for(let r = 0; r < this.NUM_ROWS; r++ ) {
          if (this.dashboard[r][r] !== figure) {
            matchDiag = false;
            break;
          }
        }
        if (!matchDiag) {
          // Check diagonal right to left
          let r: number = 2;
          for(let c = 0; c < this.NUM_COLS; c++ ) {
            if (this.dashboard[c][r] !== figure) {
              matchDiag = false;
              break;
            }
            r--;
          }
        }
      } else {
        // Odd
        matchDiag = false;
      }
    }

    return (matchRow || matchCol || matchDiag);
  }

}
