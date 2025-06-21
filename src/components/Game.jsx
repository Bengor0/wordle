import ClassicGM from "./game_modes/ClassicGM";
import RoyaleGM from "./game_modes/RoyaleGM";
import PracticeGM from "./game_modes/PracticeGM";

const Game = ({ darkMode, userData, setUserData, gameMode }) => {
  return (
    <>
      {gameMode === "Classic" && (
        <ClassicGM
          darkMode={darkMode}
          userData={userData}
          setUserData={setUserData}
          gameMode={gameMode}
        />
      )}
      {gameMode === "Royale" && (
        <RoyaleGM
          darkMode={darkMode}
          userData={userData}
          setUserData={setUserData}
          gameMode={gameMode}
        />
      )}
      {gameMode === "Practice" && (
        <PracticeGM
          darkMode={darkMode}
          userData={userData}
          setUserData={setUserData}
          gameMode={gameMode}
        />
      )}
    </>
  );
};

export default Game;
