import Wordle from "./Wordle";
import DarkModeButton from "./components/DarkModeButton";
import useToggleDarkMode from "./hooks/useToggleDarkMode";

const App = () => {
  const [darkMode, toggleDarkMode] = useToggleDarkMode(true);

  return (
    <>
      <header className={darkMode}>
        <DarkModeButton darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      </header>
      <main className={darkMode}>
        <Wordle darkMode={darkMode} />
      </main>
    </>
  );
};

export default App;
