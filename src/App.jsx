import Wordle from "./Wordle";
import DarkModeButton from "./components/DarkModeButton";
import useToggleDarkMode from "./hooks/useToggleDarkMode";
import Homepage from "./components/Homepage";
import { useState } from "react";
import Headline from "./components/Headline";
import GameInfoBtn from "./components/GameInfoBtn";
import GameStatBtn from "./components/GameStatBtn";
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
        <div className="menu wrapper"></div>
        <div className="headline wrapper flex-center">
          <Headline headlineText={"Wordle"} />
        </div>
        <nav >
          <div className="game-info-btn wrapper flex-center">
            <GameInfoBtn />
          </div>
          <div className="game-stat-btn wrapper flex-center">
            <GameStatBtn />
          </div>
          <div className="login-btn wrapper flex-center">
            <button onClick={toggleOpenLogInDialog}>Log in</button>
          </div>
          <div className="dark-mode-btn wrapper flex-center">
            <DarkModeButton
              darkMode={darkMode}
              toggleDarkMode={toggleDarkMode}
            />
          </div>
        </nav>
      </header>
      <main className={`flex-center ${darkMode}`}>
        {playWordle ? (
          <Wordle darkMode={darkMode} />
        ) : (
          <Homepage setPlayWordle={setPlayWordle} />
        )}
      </main>
      <LogInDialog openLogInDialog={openLogInDialog} toggleOpenLogInDialog={toggleOpenLogInDialog} toggleOpenSignUpDialog={toggleOpenSignUpDialog}/>
      <SignUpDialog openSignUpDialog={openSignUpDialog} toggleOpenSignUpDialog={toggleOpenSignUpDialog}/>
    </>
  );
};

export default App;
