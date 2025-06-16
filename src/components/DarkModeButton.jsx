import ".././styles/DarkModeButton.css";
import useRelativeFontSize from "../hooks/useRelativeFontSize";

const DarkModeButton = ({ darkMode, toggleDarkMode }) => {
  const [fontSize, elementRef] = useRelativeFontSize(0.15, "width");

  return (
    <>
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
        <div className="night" style={{ marginLeft: `${fontSize * 0.6}px` }}>
          night
        </div>
        <div className="day" style={{ marginRight: `${fontSize * 1}px` }}>
          day
        </div>
      </label>
    </>
  );
};

export default DarkModeButton;
