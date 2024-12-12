import { Component, OnInit } from '@angular/core';
import { GameService } from '../../services/game.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-game-board',
  imports: [CommonModule],
  templateUrl: './game-board.component.html',
  styleUrl: './game-board.component.scss'
})
export class GameBoardComponent implements OnInit {
  board: string[][] = [];
  currentPlayer: string = 'X';
  winner: string | null = null;
  isDraw: boolean = false;
  winningCells: { row: number, col: number }[] = [];

  constructor(private gameService: GameService) { }

  ngOnInit(): void {
    this.resetBoard();
  }

  resetBoard() {
    this.board = [
      ['', '', ''],
      ['', '', ''],
      ['', '', ''],
    ];
    this.currentPlayer = 'X';
    this.winner = null;
    this.isDraw = false;
    this.winningCells = [];
  }

  isWinnerCell(row: number, col: number): boolean {
    return this.winningCells.some(cell => cell.row === row && cell.col === col);
  }

  async makeMove(row: number, col: number) {
    if (this.board[row][col] || this.winner || this.isDraw) return; // Avoid action if game is over

    try {
      const response = await this.gameService.makeMove(row, col);
      this.board = response.data.board;
      this.currentPlayer = response.data.currentPlayer;
      this.winner = response.data.winner || null;

      // Check if it's a draw
      if (!this.board.some(row => row.includes(''))) {
        this.isDraw = true;
      }

      // If there's a winner, highlight the winning cells
      if (this.winner) {
        this.highlightWinningCells();
      }
    } catch (error) {
      console.error(error);
    }
  }

  async resetGame() {
    try {
      const response = await this.gameService.resetGame();
      this.board = response.data.board;
      this.currentPlayer = response.data.currentPlayer;
      this.winner = null;
      this.isDraw = false;
      this.winningCells = [];
    } catch (error) {
      console.error(error);
    }
  }

  highlightWinningCells() {
    // Define winning lines (rows, columns, diagonals)
    const winPatterns: { row: number, col: number }[][] = [
      // Rows
      [{ row: 0, col: 0 }, { row: 0, col: 1 }, { row: 0, col: 2 }],
      [{ row: 1, col: 0 }, { row: 1, col: 1 }, { row: 1, col: 2 }],
      [{ row: 2, col: 0 }, { row: 2, col: 1 }, { row: 2, col: 2 }],
      // Columns
      [{ row: 0, col: 0 }, { row: 1, col: 0 }, { row: 2, col: 0 }],
      [{ row: 0, col: 1 }, { row: 1, col: 1 }, { row: 2, col: 1 }],
      [{ row: 0, col: 2 }, { row: 1, col: 2 }, { row: 2, col: 2 }],
      // Diagonals
      [{ row: 0, col: 0 }, { row: 1, col: 1 }, { row: 2, col: 2 }],
      [{ row: 0, col: 2 }, { row: 1, col: 1 }, { row: 2, col: 0 }],
    ];
  
    for (let pattern of winPatterns) {
      const [a, b, c] = pattern;
      if (this.board[a.row][a.col] === this.winner &&
          this.board[b.row][b.col] === this.winner &&
          this.board[c.row][c.col] === this.winner) {
        this.winningCells = [a, b, c]; // Highlight the winning cells
        return;
      }
    }
  }
  
}
