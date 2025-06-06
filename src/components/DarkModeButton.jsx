import ".././styles/DarkModeButton.css";
import useRelativeFontSize from "../hooks/useRelativeFontSize";
import { useEffect } from "react";

const DarkModeButton = ({ darkMode, toggleDarkMode }) => {
  const [fontSize, elementRef] = useRelativeFontSize(0.15, "width");

  return (
    <div className="dark-mode-container">
      <input
        type="checkbox"
        id="dark-mode-input"
        className="dark-mode-input"
        onClick={toggleDarkMode}
      />
      <label
        ref={elementRef}
        htmlFor="dark-mode-input"
        className={`dark-mode-label ${darkMode}`}
        style={{ fontSize: `${fontSize}px` }}
      >
        <div className="night" style={{top: `${fontSize * 0.5357}px`}} >night</div>
        <div className="day" style={{top: `${fontSize * 0.5357}px`}} >day</div>
      </label>
    </div>
  );
};

export default DarkModeButton;
