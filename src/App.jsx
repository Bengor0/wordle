import Wordle from "./Wordle";

import useToggleDarkMode from "./hooks/useToggleDarkMode";
import DarkModeButton from "./components/DarkModeButton";
import Homepage from "./components/Homepage";
import { useState } from "react";
import LogInDialog from "./components/LogInDialog";
import SignUpDialog from "./components/SignUpDialog";
import "./App.css";
import useToggleState from "./hooks/useToggleState";

const App = () => {
  const [darkMode, toggleDarkMode] = useToggleDarkMode(true);
  const [playWordle, setPlayWordle] = useState(false);
  const [openLogInDialog, toggleOpenLogInDialog] = useToggleState(false);
  const [openSignUpDialog, toggleOpenSignUpDialog] = useToggleState(false);

  document.querySelector("body").classList = `${darkMode}`;

  return (
    <>
      <header className={darkMode}>
        <DarkModeButton darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      </header>
      <main className={`flex-center ${darkMode}`}>
        {playWordle ? (
          <Wordle darkMode={darkMode} />
        ) : (
          <Homepage setPlayWordle={setPlayWordle} />
        )}
      </main>
      <LogInDialog
        openLogInDialog={openLogInDialog}
        toggleOpenLogInDialog={toggleOpenLogInDialog}
        toggleOpenSignUpDialog={toggleOpenSignUpDialog}
      />
      <SignUpDialog
        openSignUpDialog={openSignUpDialog}
        toggleOpenSignUpDialog={toggleOpenSignUpDialog}
      />
    </>
  );
};

export default App;
