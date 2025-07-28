import { useContext } from "react";
import GameModeContext from "../contexts/GameModeContext.js";

export const useGameMode = () => {
  return useContext(GameModeContext);
};
