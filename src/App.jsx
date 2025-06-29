import Wordle from "./components/Wordle.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import useToggleDarkMode from "./hooks/useToggleDarkMode.js";
import Homepage from "./components/Homepage";
import { useState } from "react";
import LogInDialog from "./components/modals/LogInDialog.jsx";
import SignUpDialog from "./components/modals/SignUpDialog.jsx";
import "./App.css";
import useToggleState from "./hooks/useToggleState.js";
import Navigation from "./components/Navigation";
import Game from "./components/Game";

import React from "react";
import GameOverDialog from "./components/modals/GameOverDialog.jsx";

function App() {
  const [darkMode, toggleDarkMode] = useToggleDarkMode(true);
  const [playWordle, togglePlayWordle] = useToggleState(false);
  const [logInOpen, toggleLogIn] = useToggleState(false);
  const [signUpOpen, toggleSignUp] = useToggleState(false);
  const [gameOverDialog, toggleGameOverDialog] = useToggleState(false);
  const [userData, setUserData] = useState(null);
  const [gameMode, setGameMode] = useState("practice");

  document.querySelector("body").classList = `${darkMode}`;

  return (
    <>
      <Navigation
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
        toggleLogIn={toggleLogIn}
        userData={userData}
        setUserData={setUserData}
        playWordle={playWordle}
        togglePlayWordle={togglePlayWordle}
      />
      <main className={`flex-center ${darkMode}`}>
        {playWordle ? (
          <Game
            darkMode={darkMode}
            userData={userData}
            setUserData={setUserData}
            gameMode={gameMode}
            togglePlayWordle={togglePlayWordle}
            wordLength={5}
            numOfGuesses={6}
          />
        ) : (
          <Homepage
            togglePlayWordle={togglePlayWordle}
            gameMode={gameMode}
            setGameMode={setGameMode}
            darkMode={darkMode}
          />
        )}
      </main>
      <LogInDialog
        logInOpen={logInOpen}
        toggleLogIn={toggleLogIn}
        toggleSignUp={toggleSignUp}
        setUserData={setUserData}
      />
      <SignUpDialog
        signUpOpen={signUpOpen}
        toggleSignUp={toggleSignUp}
        setUserData={setUserData}
      />
    </>
  );
}

export default App;
