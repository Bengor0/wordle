import { useContext } from "react";
import DarkModeContext from "../contexts/DarkModeContext.js";

export const useDarkMode = () => {
  return useContext(DarkModeContext);
};
