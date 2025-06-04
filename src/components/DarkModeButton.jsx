import ".././styles/DarkModeButton.css";

const DarkModeButton = (darkMode, toggleDarkMode) => {
  return (
    <div className="dark-mode-container">
      <input
        type="checkbox"
        id="dark-mode-input"
        className="dark-mode-input"
        onClick={toggleDarkMode}
      />
      <label
        htmlFor="dark-mode-input "
        className={`dark-mode-label ${darkMode}`}
      ></label>
    </div>
  );
};

export default DarkModeButton;
