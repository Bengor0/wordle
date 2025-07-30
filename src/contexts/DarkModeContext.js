import { createContext } from "react";

const DarkModeContext = createContext({
  darkMode: "dark",
  toggleDarkMode: () => console.log("Failed to provide dark mode"),
});

export default DarkModeContext;
