import ClassicGM from "./game_modes/ClassicGM";
import RoyaleGM from "./game_modes/RoyaleGM";
import PracticeGM from "./game_modes/PracticeGM";

import React, { useRef, useState } from "react";

const BASE_COLORS = ["black", "black", "black", "black", "black"];

function Game(props) {
  const [guesses, setGuesses] = useState(
    new Array(6).fill({
      word: "",
      colors: BASE_COLORS,
    }),
  );
  const [keyColors, setKeyColor] = useState(new Map());
  const rowIndex = useRef(0);

  return (
    <>
      {props.gameMode === "classic" && (
        <ClassicGM
          {...props}
          guesses={guesses}
          setGuesses={setGuesses}
          keyColors={keyColors}
          setKeyColor={setKeyColor}
          rowIndex={rowIndex}
          baseColors={BASE_COLORS}
        />
      )}
      {props.gameMode === "royale" && (
        <RoyaleGM
          {...props}
          guesses={guesses}
          setGuesses={setGuesses}
          keyColors={keyColors}
          setKeyColor={setKeyColor}
          rowIndex={rowIndex}
          baseColors={BASE_COLORS}
        />
      )}
      {props.gameMode === "practice" && (
        <PracticeGM
          {...props}
          guesses={guesses}
          setGuesses={setGuesses}
          keyColors={keyColors}
          setKeyColor={setKeyColor}
          rowIndex={rowIndex}
          baseColors={BASE_COLORS}
        />
      )}
    </>
  );
}

export default Game;
