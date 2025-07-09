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
import { useAuth } from "./hooks/useAuth.js";

function App() {
  const [darkMode, toggleDarkMode] = useToggleDarkMode(true);
  const [playWordle, togglePlayWordle] = useToggleState(false);
  const [logInOpen, toggleLogIn] = useToggleState(false);
  const [signUpOpen, toggleSignUp] = useToggleState(false);
  const [gameMode, setGameMode] = useState("practice");
  const { currentUser, loading } = useAuth();
  const [restart, toggleRestart] = useToggleState(false);
  document.querySelector("body").classList = `${darkMode}`;

  return (
    <>
      <Navigation
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
        toggleLogIn={toggleLogIn}
        currentUser={currentUser}
        playWordle={playWordle}
        togglePlayWordle={togglePlayWordle}
      />
      <main className={`flex-center ${darkMode}`}>
        {playWordle ? (
          <Game
            darkMode={darkMode}
            currentUser={currentUser}
            gameMode={gameMode}
            togglePlayWordle={togglePlayWordle}
            wordLength={5}
            numOfGuesses={6}
            key={restart}
            toggleRestart={toggleRestart}
          />
        ) : (
          <>
            <Homepage
              togglePlayWordle={togglePlayWordle}
              gameMode={gameMode}
              setGameMode={setGameMode}
              darkMode={darkMode}
              currentUser={currentUser}
            />
          </>
        )}
      </main>
      <LogInDialog
        logInOpen={logInOpen}
        toggleLogIn={toggleLogIn}
        toggleSignUp={toggleSignUp}
      />
      <SignUpDialog signUpOpen={signUpOpen} toggleSignUp={toggleSignUp} />
    </>
  );
}

export default App;
