import React from "react";
import ".././styles/WordleBoard.css";

function WordleBoard({ guesses, className, wordLength, highLight }) {
  return (
    <div className={`wordle-board ${className}`}>
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
    let char = guess[0][i];
    let tileClassName = `tile ${guess[1][i]}`;
    let spanClassName = `letter ${guess[1][i]}`;

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
