import ".././styles/Homepage.css";
import React from "react";
import GameModeSelector from "./GameModeSelector.jsx";
import { doc, setDoc } from "firebase/firestore";
import { db } from "./Firebase.jsx";
import { words } from "./words.js";

function Homepage({
  togglePlayWordle,
  gameMode,
  setGameMode,
  darkMode,
  currentUser,
}) {
  const updateWords = async () => {
    await setDoc(doc(db, "wordleWords", "wordBank"), {
      allWords: [...words],
      availableWords: [...words],
    });
  };

  return (
    <div className="homepage flex-center">
      <button onClick={updateWords}>Click</button>
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
