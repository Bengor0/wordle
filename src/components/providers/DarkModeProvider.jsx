import React, { useCallback, useState } from "react";
import DarkModeContext from "../../contexts/DarkModeContext.js";
import { DarkModes } from "../../enums/DarkModes.js";

function DarkModeProvider({ children }) {
  const [darkMode, setDarkMode] = useState(DarkModes.DARK);

  const toggleDarkMode = () => {
    setDarkMode(darkMode === DarkModes.DARK ? DarkModes.LIGHT : DarkModes.DARK);
  };

  const value = {
    darkMode,
    toggleDarkMode,
  };

  return (
    <DarkModeContext.Provider value={value}>
      {children}
    </DarkModeContext.Provider>
  );
}

export default DarkModeProvider;
