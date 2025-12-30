
import React from 'react';

interface ScoreCardProps {
  title: string;
  name: string;
  score: number;
  type: 'X' | 'O' | 'DRAW';
  theme: 'primary' | 'secondary' | 'tertiary';
  winRate?: number;
}

const ScoreCard: React.FC<ScoreCardProps> = ({ title, name, score, type, theme, winRate }) => {
  const themes = {
    primary: {
      border: 'border-primary',
      text: 'text-primary',
      glow: 'text-glow-primary',
      bg: 'bg-primary',
      icon: 'close',
      labelColor: 'text-[#ffcc80]'
    },
    secondary: {
      border: 'border-secondary',
      text: 'text-secondary',
      glow: 'text-glow-magenta',
      bg: 'bg-secondary',
      icon: 'circle',
      labelColor: 'text-[#f0abfc]'
    },
    tertiary: {
      border: 'border-tertiary',
      text: 'text-tertiary',
      glow: 'drop-shadow-[0_0_8px_rgba(255,215,0,0.6)]',
      bg: 'bg-tertiary',
      icon: 'balance',
      labelColor: 'text-[#fdba74]'
    }
  };

  const currentTheme = themes[theme];

  return (
    <div className={`bg-surface-dark rounded-xl p-6 border-l-4 ${currentTheme.border} shadow-[0_0_15px_rgba(0,0,0,0.3)] relative overflow-hidden group`}>
      <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
        <span className={`material-symbols-outlined text-8xl ${currentTheme.text} transform rotate-12`}>
          {currentTheme.icon}
        </span>
      </div>
      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-2">
          <span className={`w-2 h-2 rounded-full ${currentTheme.bg} shadow-[0_0_5px_currentColor]`}></span>
          <p className={`${currentTheme.labelColor} text-sm font-bold tracking-widest uppercase`}>{title}</p>
        </div>
        <h3 className={`text-white text-5xl font-black mb-1 ${currentTheme.glow}`}>{score}</h3>
        <p className="text-white/60 text-sm font-medium">{name}</p>
        
        {winRate !== undefined && (
          <>
            <div className="mt-4 flex gap-1">
              <div className={`h-1 w-full ${currentTheme.bg}/20 rounded-full overflow-hidden`}>
                <div 
                  className={`h-full ${currentTheme.bg} shadow-[0_0_5px_currentColor] transition-all duration-1000`} 
                  style={{ width: `${winRate}%` }}
                ></div>
              </div>
            </div>
            <p className={`text-right text-xs ${currentTheme.text} mt-1 font-mono uppercase`}>{winRate}% WR</p>
          </>
        )}
      </div>
    </div>
  );
};

export default ScoreCard;
