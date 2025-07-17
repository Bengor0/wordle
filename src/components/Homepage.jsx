import ".././styles/Homepage.css";
import React from "react";
import GameModeSelector from "./GameModeSelector.jsx";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "./Firebase.jsx";
import { words } from "./words.js";

function Homepage({
  togglePlayWordle,
  gameMode,
  setGameMode,
  darkMode,
  currentUser,
}) {
  return (
    <div className="homepage flex-center">
      <GameModeSelector
        togglePlayWordle={togglePlayWordle}
        gameMode={gameMode}
        setGameMode={setGameMode}
        className={darkMode}
        currentUser={currentUser}
      />
    </div>
  );
}

export default Homepage;
