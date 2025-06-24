import ".././styles/DarkModeButton.css";

import React from "react";

function DarkModeButton({ darkMode, toggleDarkMode }) {
  return (
    <>
      <div className="dark-mode-button flex-center">
        <input
          type="checkbox"
          id="dark-mode-input"
          className="dark-mode-input"
          onClick={toggleDarkMode}
        />
        <label
          htmlFor="dark-mode-input"
          className={`dark-mode-label ${darkMode}`}
        >
          <div className="night">night</div>
          <div className="day">day</div>
        </label>
      </div>
    </>
  );
}

export default DarkModeButton;
