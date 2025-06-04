import Wordle from "./Wordle";
import DarkModeButton from "./components/DarkModeButton";
import useToggleDarkMode from "./hooks/useToggleDarkMode";

const App = () => {
  const [darkMode, toggleDarkMode] = useToggleDarkMode(true);

  return (
    <>
      <header>
        <DarkModeButton darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      </header>
      <main>
        <Wordle />
      </main>
    </>
  );
};

export default App;
