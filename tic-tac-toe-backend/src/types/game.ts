export interface MoveRequest {
    row: number;
    col: number;
  }
  
  export interface GameResponse {
    board: string[][];
    currentPlayer: string;
    winner?: string;
  }
  