import Wordle from "./Wordle";
import DarkModeButton from "./components/DarkModeButton";
import useToggleDarkMode from "./hooks/useToggleDarkMode";

const App = () => {
  const [darkMode, darkModeState, toggleDarkMode] = useToggleDarkMode(true);

  return (
    <>
      <header className={darkMode}>
        <DarkModeButton darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      </header>
      <main className={darkMode}>
        <Wordle darkMode={darkMode} darkModeState={darkModeState} />
      </main>
    </>
  );
};

export default App;
