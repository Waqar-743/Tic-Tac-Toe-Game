
import React, { useState, useEffect, useCallback } from 'react';
import { Player, PlayerType, MatchResult, CellValue } from '../types';
import { INITIAL_BOARD } from '../constants';
import ScoreCard from './ScoreCard';

interface GameScreenProps {
  player1: Player;
  player2: Player;
  draws: number;
  onRoundEnd: (winner: PlayerType | 'DRAW') => void;
  history: MatchResult[];
  onChangePlayers: () => void;
}

const GameScreen: React.FC<GameScreenProps> = ({
  player1,
  player2,
  draws,
  onRoundEnd,
  history,
  onChangePlayers
}) => {
  const [board, setBoard] = useState<string[][]>(INITIAL_BOARD);
  const [turn, setTurn] = useState<PlayerType>('X');
  const [showHistory, setShowHistory] = useState(false);

  // C++ Logic: bool checkWin()
  const checkWin = useCallback((currentBoard: string[][]) => {
    for (let i = 0; i < 3; i++) {
      if ((currentBoard[i][0] === currentBoard[i][1] && currentBoard[i][1] === currentBoard[i][2]) ||
        (currentBoard[0][i] === currentBoard[1][i] && currentBoard[1][i] === currentBoard[2][i])) {
        return true;
      }
    }
    if ((currentBoard[0][0] === currentBoard[1][1] && currentBoard[1][1] === currentBoard[2][2]) ||
      (currentBoard[0][2] === currentBoard[1][1] && currentBoard[1][1] === currentBoard[2][0])) {
      return true;
    }
    return false;
  }, []);

  // C++ Logic: bool checkDraw()
  const checkDraw = useCallback((currentBoard: string[][]) => {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (currentBoard[i][j] !== 'X' && currentBoard[i][j] !== 'O')
          return false;
      }
    }
    return true;
  }, []);

  // C++ Logic: bool makeMove(int choice)
  const handleCellClick = (row: number, col: number) => {
    const choice = board[row][col];
    if (choice === 'X' || choice === 'O' || checkWin(board)) {
      // Equivalent to cout << "Invalid move! Try again.\n";
      return;
    }

    const newBoard = board.map(r => [...r]);
    newBoard[row][col] = turn;
    setBoard(newBoard);

    if (checkWin(newBoard)) {
      onRoundEnd(turn);
    } else if (checkDraw(newBoard)) {
      onRoundEnd('DRAW');
    } else {
      setTurn(turn === 'X' ? 'O' : 'X');
    }
  };

  const handleReset = () => {
    setBoard(INITIAL_BOARD.map(row => [...row]));
    setTurn('X');
  };


  return (
    <div className="w-full max-w-[1440px] mx-auto p-4 lg:p-8 flex flex-col min-h-screen">
      <header className="flex justify-between items-center mb-8 border-b border-[#4a3a1e]/30 pb-4">
        <div className="flex items-center gap-3">
          <span className="material-symbols-outlined text-primary text-4xl animate-pulse">sports_esports</span>
          <div>
            <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-white text-neon-cyan uppercase italic">Tic Tac Toe</h1>
            <p className="text-[#ffcc80] text-sm font-medium tracking-widest uppercase">Classic Match 3x3</p>
          </div>
        </div>
        <div className="hidden sm:flex items-center gap-4">
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-surface-dark border border-[#4a3a1e]">
            {player1.wins > player2.wins ? (
              <div className="w-2 h-2 rounded-full bg-primary shadow-[0_0_8px_rgba(255,157,0,0.8)]"></div>
            ) : player2.wins > player1.wins ? (
              <div className="w-2 h-2 rounded-full bg-secondary shadow-[0_0_8px_rgba(255,0,255,0.8)]"></div>
            ) : (
              <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.8)]"></div>
            )}
            <span className="text-xs font-bold tracking-wider text-[#ffcc80]">ONLINE</span>
          </div>
          <button className="material-symbols-outlined text-[#ffcc80] hover:text-white transition-colors" onClick={onChangePlayers}>settings</button>
        </div>

      </header>

      <main className="flex flex-col lg:flex-row gap-8 grow">
        <section className="flex flex-col lg:w-[70%] gap-6">
          <div className="bg-surface-dark border border-primary/30 rounded-xl p-4 flex items-center justify-between shadow-neon-blue transition-all duration-500">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-primary text-3xl">gamepad</span>
              <div>
                <p className="text-[#ffcc80] text-xs font-bold uppercase tracking-wider">Current Turn</p>
                <h2 className="text-white text-xl md:text-2xl font-bold">
                  {turn === 'X' ? player1.name : player2.name}
                  <span className={turn === 'X' ? 'text-primary' : 'text-secondary'}> ({turn})</span>
                </h2>
              </div>
            </div>
            <div className="h-2 w-24 bg-[#1a1100] rounded-full overflow-hidden">
              <div className={`h-full transition-all duration-500 shadow-[0_0_10px] ${turn === 'X' ? 'bg-primary w-1/3 shadow-primary' : 'bg-secondary w-full shadow-secondary'}`}></div>
            </div>
          </div>

          <div className="grow flex items-center justify-center bg-surface-dark/50 rounded-2xl border border-[#4a3a1e]/20 p-4 md:p-8 relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 50% 50%, #FF9D00 0%, transparent 60%)' }}></div>
            <div className="grid grid-cols-3 gap-2 md:gap-4 w-full max-w-[500px] aspect-square relative z-10">
              {board.map((row, rowIndex) => (
                row.map((cell, colIndex) => (
                  <button
                    key={`${rowIndex}-${colIndex}`}
                    onClick={() => handleCellClick(rowIndex, colIndex)}
                    className={`bg-[#1a1100] border-2 rounded-lg md:rounded-xl flex items-center justify-center transition-all duration-200 group/cell
                      ${(cell !== 'X' && cell !== 'O') ? 'border-[#4a3a1e] hover:border-primary hover:shadow-neon-blue hover:scale-[1.02]' : ''}
                      ${cell === 'X' ? 'border-primary shadow-neon-blue' : ''}
                      ${cell === 'O' ? 'border-secondary shadow-neon-pink' : ''}
                    `}
                  >
                    {cell === 'X' && (
                      <span className="material-symbols-outlined text-6xl md:text-8xl text-primary drop-shadow-[0_0_15px_rgba(255,157,0,0.8)]">close</span>
                    )}
                    {cell === 'O' && (
                      <span className="material-symbols-outlined text-6xl md:text-8xl text-secondary drop-shadow-[0_0_15px_rgba(255,0,255,0.8)]">circle</span>
                    )}
                    {(cell !== 'X' && cell !== 'O') && (
                      <span className="material-symbols-outlined text-6xl md:text-8xl text-primary opacity-0 group-hover/cell:opacity-20 transition-opacity">
                        {turn === 'X' ? 'close' : 'radio_button_unchecked'}
                      </span>
                    )}
                  </button>
                ))
              ))}
            </div>
          </div>
        </section>

        <aside className="flex flex-col lg:w-[30%] gap-6">
          <ScoreCard
            title="Player 1"
            name={player1.name}
            score={player1.wins}
            type="X"
            theme="primary"
            winRate={Math.round((player1.wins / Math.max(1, (player1.wins + player2.wins + draws))) * 100)}
          />
          <ScoreCard
            title="Player 2"
            name={player2.name}
            score={player2.wins}
            type="O"
            theme="secondary"
            winRate={Math.round((player2.wins / Math.max(1, (player1.wins + player2.wins + draws))) * 100)}
          />
          <ScoreCard
            title="Draws"
            name="Total Stalemates"
            score={draws}
            type="DRAW"
            theme="tertiary"
          />

          <div className="mt-auto pt-4 flex flex-col gap-3">
            <button
              onClick={handleReset}
              className="w-full h-14 relative overflow-hidden rounded-lg group bg-primary hover:bg-primary/90 transition-all duration-300"
            >
              <div className="absolute inset-0 flex items-center justify-center gap-2 relative z-10">
                <span className="material-symbols-outlined text-[#0a0700] font-bold">refresh</span>
                <span className="text-[#0a0700] font-bold tracking-wider uppercase text-lg">Reset Round</span>
              </div>
              <div className="absolute top-0 -left-[100%] w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-[-20deg] group-hover:animate-shimmer"></div>
            </button>
            <button
              onClick={() => setShowHistory(!showHistory)}
              className="w-full h-12 rounded-lg border border-[#4a3a1e] hover:border-primary text-[#ffcc80] hover:text-white bg-transparent transition-all duration-300 flex items-center justify-center gap-2 group"
            >
              <span className="material-symbols-outlined group-hover:rotate-180 transition-transform duration-500">history</span>
              <span className="font-medium tracking-wide uppercase">{showHistory ? 'Hide History' : 'Match History'}</span>
            </button>
            {showHistory && (
              <div className="bg-surface-dark border border-[#4a3a1e] rounded-lg p-3 max-h-40 overflow-y-auto custom-scrollbar">
                {history.length === 0 ? (
                  <p className="text-xs text-slate-500 italic text-center">No matches yet</p>
                ) : (
                  history.map((h, i) => (
                    <div key={i} className="flex justify-between text-xs py-1 border-b border-[#4a3a1e]/30 last:border-0">
                      <span className="text-slate-400">{h.timestamp.toLocaleTimeString()}</span>
                      <span className="font-bold">
                        {h.winner === 'DRAW' ? 'Draw' : `Winner: ${h.winner === 'X' ? h.players.X : h.players.O}`}
                      </span>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        </aside>
      </main>

      <footer className="mt-8 pt-4 border-t border-[#4a3a1e]/20 flex justify-between text-xs text-[#826a5c]">
        <p>© 2024 NEON TAC TOE | Waqar Ahmed</p>
        <div className="flex gap-4">
          <a className="hover:text-primary transition-colors" href="#">Privacy</a>
          <a className="hover:text-primary transition-colors" href="#">Terms</a>
        </div>
      </footer>
    </div>
  );
};

export default GameScreen;
