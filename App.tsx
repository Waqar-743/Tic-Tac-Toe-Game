
import React, { useState, useCallback } from 'react';
import { GameStatus, Player, MatchResult, PlayerType } from './types';
import SetupScreen from './components/SetupScreen';
import GameScreen from './components/GameScreen';
import ResultModal from './components/ResultModal';

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameStatus>('SETUP');
  const [player1, setPlayer1] = useState<Player>({ name: '', wins: 0 });
  const [player2, setPlayer2] = useState<Player>({ name: '', wins: 0 });
  const [draws, setDraws] = useState(0);
  const [history, setHistory] = useState<MatchResult[]>([]);
  const [lastResult, setLastResult] = useState<MatchResult | null>(null);

  const handleStartGame = (p1Name: string, p2Name: string) => {
    setPlayer1({ name: p1Name || 'Waqar', wins: 0 });
    setPlayer2({ name: p2Name || 'Ahmed', wins: 0 });
    setDraws(0);
    setHistory([]);
    setGameState('PLAYING');
  };

  const handleRoundEnd = useCallback((winner: PlayerType | 'DRAW') => {
    if (winner === 'X') {
      setPlayer1(prev => ({ ...prev, wins: prev.wins + 1 }));
    } else if (winner === 'O') {
      setPlayer2(prev => ({ ...prev, wins: prev.wins + 1 }));
    } else {
      setDraws(prev => prev + 1);
    }

    const result: MatchResult = {
      winner,
      timestamp: new Date(),
      players: { X: player1.name, O: player2.name }
    };

    setLastResult(result);
    setHistory(prev => [result, ...prev]);
    setGameState('RESULT');
  }, [player1.name, player2.name]);

  const handlePlayAgain = () => {
    setGameState('PLAYING');
    setLastResult(null);
  };

  const handleChangePlayers = () => {
    setGameState('SETUP');
    setLastResult(null);
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-background-dark font-display">
      {/* Ambient Background Elements */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute inset-0 bg-grid-pattern bg-grid"></div>
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[128px]"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-[128px]"></div>
      </div>

      <div className="w-full h-full relative z-10">
        {gameState === 'SETUP' && (
          <SetupScreen onStart={handleStartGame} />
        )}

        {(gameState === 'PLAYING' || gameState === 'RESULT') && (
          <GameScreen 
            player1={player1} 
            player2={player2} 
            draws={draws}
            onRoundEnd={handleRoundEnd}
            history={history}
            onChangePlayers={handleChangePlayers}
          />
        )}

        {gameState === 'RESULT' && lastResult && (
          <ResultModal 
            result={lastResult} 
            onPlayAgain={handlePlayAgain} 
            onChangePlayers={handleChangePlayers} 
          />
        )}
      </div>
    </div>
  );
};

export default App;
