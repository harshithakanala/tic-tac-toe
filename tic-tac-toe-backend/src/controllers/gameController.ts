import { Request, Response } from 'express';

let board: string[][] = [
  ['', '', ''],
  ['', '', ''],
  ['', '', ''],
];

let currentPlayer: string = 'X';
let gameOver: boolean = false;

const checkWinner = (player: string): boolean => {
  // Check rows, columns, and diagonals
  for (let i = 0; i < 3; i++) {
    if (
      (board[i][0] === player && board[i][1] === player && board[i][2] === player) ||
      (board[0][i] === player && board[1][i] === player && board[2][i] === player)
    ) {
      return true;
    }
  }
  if (
    (board[0][0] === player && board[1][1] === player && board[2][2] === player) ||
    (board[0][2] === player && board[1][1] === player && board[2][0] === player)
  ) {
    return true;
  }
  return false;
};

export const makeMove = (req: Request, res: Response): void => {
  const { row, col } = req.body;

  if (gameOver || board[row][col] !== '') {
    res.status(400).json({ message: 'Invalid move' });
    return; 
  }

  board[row][col] = currentPlayer;

  if (checkWinner(currentPlayer)) {
    gameOver = true;
    res.json({ winner: currentPlayer });
    return;
  }

  // Switch player
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  res.json({ board, currentPlayer }); 
};

export const resetGame = (req: Request, res: Response): void => {
  board = [
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
  ];
  currentPlayer = 'X';
  gameOver = false;
  res.json({ board, currentPlayer });
};
