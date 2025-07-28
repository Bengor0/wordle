import React, { useState } from "react";
import GameModeContext from "../contexts/GameModeContext.js";
import { GameModes } from "./enums/GameModes.js";

function GameModeProvider({ children }) {
  const [gameMode, setGameMode] = useState(GameModes.PRACTICE);
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
