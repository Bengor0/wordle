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
import StatisticsDialog from "./components/modals/StatisticsDialog.jsx";
import { useQuery } from "@tanstack/react-query";
import { fetchUserData } from "./utils/userDataUtils.js";

function App() {
  const [darkMode, toggleDarkMode] = useToggleDarkMode(true);
  const [playWordle, togglePlayWordle] = useToggleState(false);
  const [logInOpen, toggleLogIn] = useToggleState(false);
  const [signUpOpen, toggleSignUp] = useToggleState(false);
  const [statsOpen, toggleStats] = useToggleState(false);
  const [gameMode, setGameMode] = useState("practice");
  const { currentUser, loading } = useAuth();
  const { data: userData, isLoading } = useQuery({
    queryKey: ["user", currentUser?.uid],
    queryFn: ({ queryKey }) => {
      const [, uid] = queryKey;
      return fetchUserData(uid);
    },
    enabled: !!currentUser && !loading,
  });
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
        toggleStats={toggleStats}
      />
      <main className={`flex-center ${darkMode}`}>
        {playWordle ? (
          <Game
            darkMode={darkMode}
            currentUser={currentUser}
            userData={userData}
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
      <StatisticsDialog
        statsOpen={statsOpen}
        toggleStats={toggleStats}
        gameMode={gameMode}
        setGameMode={setGameMode}
        userData={userData}
      />
    </>
  );
}

export default App;
