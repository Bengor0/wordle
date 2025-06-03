import { useState } from "react";

const DarkModeButton = (darkMode, toggleDarkMode) => {
    const [className, setClassName] = useState(darkMode ? "dark" : "light";)

  return <><input type="checkbox" id="dark-mode-input" className="dark-mode-input" onClick={toggleDarkMode} />
  <label htmlFor="dark-mode-input" className="dark-mode-label"></label></>;
};

export default DarkModeButton;
