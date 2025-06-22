import ".././styles/DarkModeButton.css";
import useRelativeFontSize from "../hooks/useRelativeFontSize";

const DarkModeButton = ({ darkMode, toggleDarkMode }) => {
  const [fontSize, elementRef] = useRelativeFontSize(0.15, "width");

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
          ref={elementRef}
          htmlFor="dark-mode-input"
          className={`dark-mode-label ${darkMode}`}
        >
          <div className="night">night</div>
          <div className="day">day</div>
        </label>
      </div>
    </>
  );
};

export default DarkModeButton;
