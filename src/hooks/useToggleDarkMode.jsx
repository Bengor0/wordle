import { useCallback, useRef, useState } from "react";

const useToggleDarkMode = (initialState = true) => {
  const darkModeState = useRef(initialState);
  const [darkMode, setDarkMode] = useState(darkModeState.current ? "dark" : "light");

  const toggleDarkMode = useCallback(() => {
    darkModeState.current = !darkModeState.current;
    setDarkMode(darkModeState.current ? "dark" : "light");
  }, []);

  return [darkMode, darkModeState.current, toggleDarkMode];
};

export default useToggleDarkMode;
