import { useCallback, useRef, useState } from "react";

const useToggleDarkMode = (initialState = true) => {
  const state = useRef(initialState);
  const [darkMode, setDarkMode] = useState(state.current ? "dark" : "light");

  const toggleDarkMode = useCallback(() => {
    state.current = !state.current;
    setDarkMode(state.current ? "dark" : "light");
  }, []);

  return [darkMode, toggleDarkMode];
};

export default useToggleDarkMode;
