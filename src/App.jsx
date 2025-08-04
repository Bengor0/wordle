import "bootstrap/dist/css/bootstrap.min.css";
import Homepage from "./components/Homepage";
import LogInDialog from "./components/modals/LogInDialog.jsx";
import SignUpDialog from "./components/modals/SignUpDialog.jsx";
import "./App.css";
import useToggleState from "./hooks/useToggleState.js";
import Navigation from "./components/Navigation";
import Game from "./components/Game";

import React from "react";
import StatisticsDialog from "./components/modals/StatisticsDialog.jsx";
import { useDarkMode } from "./hooks/useDarkMode.js";

function App() {
  const [playWordle, togglePlayWordle] = useToggleState(false);
  const [logInOpen, toggleLogIn] = useToggleState(false);
  const [signUpOpen, toggleSignUp] = useToggleState(false);
  const [statsOpen, toggleStats] = useToggleState(false);
  const [restart, toggleRestart] = useToggleState(false);
  const { darkMode } = useDarkMode();
  document.querySelector("body").classList.value = `${darkMode}`;

  return (
    <>
      <Navigation
        toggleLogIn={toggleLogIn}
        playWordle={playWordle}
        togglePlayWordle={togglePlayWordle}
        toggleStats={toggleStats}
      />
      <main className={`flex-center ${darkMode}`}>
        {playWordle ? (
          <Game
            togglePlayWordle={togglePlayWordle}
            wordLength={5}
            numOfGuesses={6}
            key={restart}
            toggleRestart={toggleRestart}
          />
        ) : (
          <>
            <Homepage togglePlayWordle={togglePlayWordle} />
          </>
        )}
      </main>
      <LogInDialog
        logInOpen={logInOpen}
        toggleLogIn={toggleLogIn}
        toggleSignUp={toggleSignUp}
      />
      <SignUpDialog signUpOpen={signUpOpen} toggleSignUp={toggleSignUp} />
      <StatisticsDialog statsOpen={statsOpen} toggleStats={toggleStats} />
    </>
  );
}

export default App;
