import { useCallback, useRef, useState } from "react";

const useToggleDarkMode = (initialState = true) => {
  const state = useRef(initialState);
  const [darkMode, setDarkMode] = useState(state ? "dark" : "light");

  const toggleDarkMode = useCallback(() => {
    state.current = !state.current;
    setDarkMode(state ? "dark" : "light");
  }, []);

  return [darkMode, toggleDarkMode];
};

export default useToggleDarkMode;
