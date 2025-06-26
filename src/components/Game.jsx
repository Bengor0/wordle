import ClassicGM from "./game_modes/ClassicGM";
import RoyaleGM from "./game_modes/RoyaleGM";
import PracticeGM from "./game_modes/PracticeGM";

import React from "react";

function Game(props) {
  return (
    <>
      {props.gameMode === "classic" && <ClassicGM {...props} />}
      {props.gameMode === "royale" && <RoyaleGM {...props} />}
      {props.gameMode === "practice" && <PracticeGM {...props} />}
    </>
  );
}

export default Game;
