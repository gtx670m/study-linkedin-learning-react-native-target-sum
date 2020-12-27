import React, { useState } from 'react';
import Game from './Game';

const App = () => {
  const randomNumberCount = 6;
  const initialSeconds = 10;
  const [gameId, setGameId] = useState(0);

  const resetGame = () => {
    setGameId(prev => prev + 1);
  };

  return (
    <Game
      key={gameId}
      randomNumberCount={randomNumberCount}
      initialSeconds={initialSeconds}
      resetGame={resetGame}
    />
  );
};

export default App;
