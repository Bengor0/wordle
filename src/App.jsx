import Wordle from "./Wordle";
import "bootstrap/dist/css/bootstrap.min.css";
import useToggleDarkMode from "./hooks/useToggleDarkMode";
import DarkModeButton from "./components/DarkModeButton";
import Homepage from "./components/Homepage";
import { useState } from "react";
import LogInDialog from "./components/LogInDialog";
import SignUpDialog from "./components/SignUpDialog";
import "./App.css";
import useToggleState from "./hooks/useToggleState";
import Navigation from "./components/Navigation";

const App = () => {
  const [darkMode, toggleDarkMode] = useToggleDarkMode(true);
  const [playWordle, setPlayWordle] = useState(false);
  const [openLogIn, toggleOpenLogIn] = useToggleState(false);
  const [openSignUp, toggleOpenSignUp] = useToggleState(false);

  document.querySelector("body").classList = `${darkMode}`;

  return (
    <>
      <Navigation darkMode={darkMode} toggleDarkMode={toggleDarkMode} toggleOpenLogIn={toggleOpenLogIn}/>
      <main className={`flex-center ${darkMode}`}>
        {playWordle ? (
          <Wordle darkMode={darkMode} />
        ) : (
          <Homepage setPlayWordle={setPlayWordle} />
        )}
      </main>
      <LogInDialog
        openLogIn={openLogIn}
        toggleOpenLogIn={toggleOpenLogIn}
        toggleOpenSignUp={toggleOpenSignUp}
      />
      <SignUpDialog
        openSignUp={openSignUp}
        toggleOpenSignUp={toggleOpenSignUp}
      />
    </>
  );
};

export default App;
