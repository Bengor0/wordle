import { createContext } from "react";

const GameModeContext = createContext({
  gameMode: "",
  setGameMode: () => console.log("Failed to provide setGameMode."),
});

export default GameModeContext;
