
import React from 'react';
import { MatchResult } from '../types';

interface ResultModalProps {
  result: MatchResult;
  onPlayAgain: () => void;
  onChangePlayers: () => void;
}

const ResultModal: React.FC<ResultModalProps> = ({ result, onPlayAgain, onChangePlayers }) => {
  const isDraw = result.winner === 'DRAW';
  const winnerName = isDraw ? 'Everyone' : (result.winner === 'X' ? result.players.X : result.players.O);

  const themeClass = isDraw
    ? { border: 'border-neon-green', shadow: 'box-glow-green', text: 'text-neon-green', bg: 'bg-neon-green', dropShadow: 'drop-shadow-[0_0_15px_rgba(57,255,20,0.8)]' }
    : (result.winner === 'X'
      ? { border: 'border-primary', shadow: 'shadow-neon-blue', text: 'text-primary', bg: 'bg-primary', dropShadow: 'drop-shadow-[0_0_15px_rgba(255,157,0,0.8)]' }
      : { border: 'border-secondary', shadow: 'shadow-neon-pink', text: 'text-secondary', bg: 'bg-secondary', dropShadow: 'drop-shadow-[0_0_15px_rgba(255,0,255,0.8)]' }
    );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className={`relative w-full max-w-[480px] overflow-hidden rounded-2xl bg-[#1a1610] border-2 flex flex-col items-center text-center p-8 md:p-10 transform transition-all
        ${themeClass.border} ${themeClass.shadow}
      `}>
        {/* Ambient Lights */}
        <div className={`absolute -top-20 -left-20 w-64 h-64 opacity-20 blur-[80px] rounded-full pointer-events-none ${themeClass.bg}`}></div>
        <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-primary opacity-10 blur-[80px] rounded-full pointer-events-none"></div>

        <div className="relative z-10 w-full flex flex-col items-center gap-6">
          <div className="relative">
            <div className={`absolute inset-0 blur-2xl opacity-40 rounded-full animate-pulse ${themeClass.bg}`}></div>
            <span className={`material-symbols-outlined text-8xl relative z-10 ${themeClass.dropShadow} ${themeClass.text}`}>
              {isDraw ? 'balance' : 'emoji_events'}
            </span>
          </div>

          <div className="space-y-2">
            <h1 className={`text-4xl md:text-5xl font-bold tracking-widest text-white uppercase italic ${themeClass.text}`}>
              {isDraw ? 'STALEMATE!' : 'GAME OVER!'}
            </h1>
            <p className="text-gray-300 text-lg md:text-xl font-medium tracking-wide">
              <span className="text-white font-bold">{winnerName}</span> {isDraw ? 'splits the point!' : 'takes the round!'}
            </p>
          </div>


          <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent my-2"></div>

          <div className="w-full flex flex-col gap-4 mt-2">
            <button
              onClick={onPlayAgain}
              className="group relative w-full h-14 rounded-lg bg-gradient-to-r from-primary to-[#cc7e00] p-[1px] shadow-lg btn-glow transition-all duration-300 transform active:scale-[0.98]"
            >
              <div className="absolute inset-0 bg-white/20 group-hover:bg-white/30 transition-colors rounded-lg"></div>
              <div className="relative h-full w-full flex items-center justify-center rounded-lg bg-transparent">
                <span className="material-symbols-outlined mr-2 text-background-dark font-bold">replay</span>
                <span className="text-background-dark font-bold text-lg tracking-wider">PLAY AGAIN</span>
              </div>
            </button>

            <button
              onClick={onChangePlayers}
              className="group w-full h-14 rounded-lg border-2 border-secondary bg-transparent text-white font-bold text-lg tracking-wider transition-all duration-300 hover:bg-secondary/10 hover:shadow-[0_0_20px_rgba(255,0,255,0.5)] active:scale-[0.98]"
            >
              <div className="flex items-center justify-center gap-2">
                <span className="material-symbols-outlined text-secondary group-hover:text-white transition-colors">groups</span>
                <span className="text-secondary group-hover:text-white transition-colors text-neon-magenta">CHANGE PLAYERS</span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultModal;
