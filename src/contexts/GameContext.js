import React, { createContext, useContext, useState } from "react";

const GameContext = createContext();

export const useGameContext = () => useContext(GameContext);

export const GameProvider = ({ children }) => {
  const [highScore, setHighScore] = useState(0);
  const [currentScore, setCurrentScore] = useState(0);

  return (
    <GameContext.Provider
      value={{
        highScore,
        setHighScore,
        currentScore,
        setCurrentScore,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
