import React from "react";
import ".././styles/WordleBoard.css";
import { useDarkMode } from "../hooks/useDarkMode.js";

function WordleBoard({ guesses, wordLength, highLight }) {
  const { darkMode } = useDarkMode();
  return (
    <div className={`wordle-board ${darkMode}`}>
      {guesses.map((guess, i) => {
        return (
          <Row
            guess={guess}
            key={i}
            wordLength={wordLength}
            highLight={i === highLight - 1 ? "highlight" : ""}
          />
        );
      })}
    </div>
  );
}

export default WordleBoard;

function Row({ guess, wordLength, highLight }) {
  const tiles = [];

  for (let i = 0; i < wordLength; i++) {
    let char = guess.word[i];
    let tileClassName = `tile ${guess.colors[i]}`;
    let spanClassName = `letter ${guess.colors[i]}`;

    tiles.push(
      <div
        className={tileClassName + " " + highLight}
        key={i}
        style={{ "--index": i }}
      >
        <div className="tile-inner" style={{ "--index": i }}>
          <div className={`letter black`} style={{ "--index": i }}>
            <span>{char}</span>
          </div>
          <div className={spanClassName} style={{ "--index": i }}>
            <span>{char}</span>
          </div>
        </div>
      </div>,
    );
  }

  return <>{tiles}</>;
}
