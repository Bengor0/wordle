import Wordle from "./Wordle";
import "bootstrap/dist/css/bootstrap.min.css";
import useToggleDarkMode from "./hooks/useToggleDarkMode";
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
  const [logInOpen, toggleLogIn] = useToggleState(false);
  const [signUpOpen, toggleSignUp] = useToggleState(false);
  const [userData, setUserData] = useState(null);
  const [gameMode, setGameMode] = useState("Practice");

  document.querySelector("body").classList = `${darkMode}`;

  return (
    <>
      <Navigation
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
        toggleLogIn={toggleLogIn}
        userData={userData}
        setUserData={setUserData}
        setGameMode={setGameMode}
      />
      <main className={`flex-center ${darkMode}`}>
        {playWordle ? (
          <Wordle
            darkMode={darkMode}
            userData={userData}
            setUserData={setUserData}
            gameMode={gameMode}
          />
        ) : (
          <Homepage setPlayWordle={setPlayWordle} />
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
};

export default App;
