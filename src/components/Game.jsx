import ClassicGM from "./game_modes/ClassicGM";
import RoyaleGM from "./game_modes/RoyaleGM";
import PracticeGM from "./game_modes/PracticeGM";

import React from "react";

function Game({ darkMode, userData, setUserData, gameMode }) {
  return (
    <>
      {gameMode === "classic" && (
        <ClassicGM
          darkMode={darkMode}
          userData={userData}
          setUserData={setUserData}
          gameMode={gameMode}
        />
      )}
      {gameMode === "royale" && (
        <RoyaleGM
          darkMode={darkMode}
          userData={userData}
          setUserData={setUserData}
          gameMode={gameMode}
        />
      )}
      {gameMode === "practice" && (
        <PracticeGM
          darkMode={darkMode}
          userData={userData}
          setUserData={setUserData}
          gameMode={gameMode}
        />
      )}
    </>
  );
}

export default Game;
