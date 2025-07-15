import { useCallback, useRef, useState } from "react";

const useToggleGameMode = (initialState = true) => {
  const gameModeState = useRef(initialState);
  const [gameMode, setGameMode] = useState(
    gameModeState.current ? "classic" : "royale",
  );

  const toggleGameMode = useCallback(() => {
    gameModeState.current = !gameModeState.current;
    setGameMode(gameModeState.current ? "classic" : "royale");
  }, []);

  return [gameMode, toggleGameMode];
};

export default useToggleGameMode;
