
export type PlayerType = 'X' | 'O';
export type CellValue = string;


export interface Player {
  name: string;
  wins: number;
}

export type GameStatus = 'SETUP' | 'PLAYING' | 'RESULT';

export interface MatchResult {
  winner: PlayerType | 'DRAW';
  timestamp: Date;
  players: {
    X: string;
    O: string;
  };
}
