
import React, { useState } from 'react';

interface SetupScreenProps {
  onStart: (p1: string, p2: string) => void;
}

const SetupScreen: React.FC<SetupScreenProps> = ({ onStart }) => {
  const [p1Name, setP1Name] = useState('');
  const [p2Name, setP2Name] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onStart(p1Name, p2Name);
  };

  return (
    <main className="flex flex-col items-center justify-center w-full max-w-[540px] mx-auto min-h-screen px-4">
      <div className="text-center mb-10">
        <h1 className="text-6xl md:text-7xl font-black text-white text-neon-cyan tracking-tight mb-3 uppercase">
          TIC TAC TOE
        </h1>
        <p className="text-slate-400 text-lg font-medium tracking-wide uppercase">
          Enter Player Names to Begin
        </p>
      </div>

      <div className="w-full bg-surface-dark/60 backdrop-blur-xl border border-primary/50 border-neon-cyan rounded-2xl p-8 shadow-2xl">
        <form onSubmit={handleSubmit} className="flex flex-col gap-8">
          <div className="flex flex-col gap-2 group">
            <label className="flex items-center gap-2 text-primary font-bold text-lg">
              <span className="material-symbols-outlined text-[24px]">person</span>
              Player 1 (X)
            </label>
            <div className="relative">
              <input 
                autoComplete="off" 
                className="w-full bg-[#0f172a] border-2 border-primary/60 text-white placeholder-slate-500 rounded-lg h-14 px-4 text-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary border-neon-cyan transition-all duration-300" 
                placeholder="e.g. Waqar" 
                type="text"
                value={p1Name}
                onChange={(e) => setP1Name(e.target.value)}
              />
              <div className="absolute right-4 top-1/2 -translate-y-1/2 text-primary/50">
                <span className="material-symbols-outlined cursor-pointer" onClick={() => setP1Name('')}>close</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2 group">
            <label className="flex items-center gap-2 text-secondary font-bold text-lg">
              <span className="material-symbols-outlined text-[24px]">smart_toy</span>
              Player 2 (O)
            </label>
            <div className="relative">
              <input 
                autoComplete="off" 
                className="w-full bg-[#0f172a] border-2 border-secondary/60 text-white placeholder-slate-500 rounded-lg h-14 px-4 text-lg focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary border-neon-magenta transition-all duration-300" 
                placeholder="e.g. Ahmed" 
                type="text"
                value={p2Name}
                onChange={(e) => setP2Name(e.target.value)}
              />
              <div className="absolute right-4 top-1/2 -translate-y-1/2 text-secondary/50">
                <span className="material-symbols-outlined cursor-pointer" onClick={() => setP2Name('')}>radio_button_unchecked</span>
              </div>
            </div>
          </div>

          <div className="pt-4">
            <button 
              type="submit"
              className="w-full relative overflow-hidden group btn-glow rounded-xl h-16 bg-gradient-to-r from-primary to-[#cc7e00] text-background-dark font-black text-xl tracking-wider transition-all active:scale-[0.98]"
            >
              <div className="absolute inset-0 bg-white/20 translate-y-full skew-y-12 group-hover:translate-y-[-150%] transition-transform duration-700 ease-in-out"></div>
              <span className="relative flex items-center justify-center gap-3">
                START GAME
                <span className="material-symbols-outlined font-bold">play_arrow</span>
              </span>
            </button>
          </div>
        </form>
      </div>

      <div className="mt-8 flex justify-center gap-4 text-slate-600 text-sm font-medium">
        <div className="flex items-center gap-1">
          <span className="material-symbols-outlined text-sm">sports_esports</span>
          <span>PvP Mode</span>
        </div>
        <div className="w-1 h-1 bg-slate-700 rounded-full my-auto"></div>
        <div className="flex items-center gap-1">
          <span className="material-symbols-outlined text-sm">leaderboard</span>
          <span>Ranked</span>
        </div>
      </div>
    </main>
  );
};

export default SetupScreen;
