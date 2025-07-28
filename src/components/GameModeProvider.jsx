import React, { useState } from "react";
import GameModeContext from "../contexts/GameModeContext.js";
import { GameMode } from "./enums/GameMode.js";

function GameModeProvider({ children }) {
  const [gameMode, setGameMode] = useState(GameMode.PRACTICE);
  const value = {
    gameMode,
    setGameMode,
  };

  return (
    <GameModeContext.Provider value={value}>
      {children}
    </GameModeContext.Provider>
  );
}

export default GameModeProvider;
