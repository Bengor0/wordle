import { useContext } from "react";
import KeyboardContext from "../App.jsx";
import ".././styles/Keyboard.css";
import backspace from '.././assets/backspace.svg';

export default function KeyBoard({ handleKeyClick }) {
  const KEYS = [
    ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
    ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
    ["Enter", "z", "x", "c", "v", "b", "n", "m", "Backspace"],
  ];
  return (
    <div className="keyboard">
      {KEYS.map((keyboardRow, index) => (
        <Row
          keyboardRow={keyboardRow}
          index={index}
          handleKeyClick={handleKeyClick}
          key={index}
        />
      ))}
    </div>
  );
}

function Row({ keyboardRow, index, handleKeyClick }) {
  const className = `keyboard-row ${index + 1}`;
  return (
    <div className={className}>
      {keyboardRow.map((keyboardKey, index) => {
        if (keyboardKey === "Enter") {
          return (
            <KeyboardKey
              keyboardKey={keyboardKey}
              classKey={"enter"}
              index={index}
              handleKeyClick={handleKeyClick}
              keyboardText={keyboardKey}
            />
          );
        } else if (keyboardKey === "Backspace") {
          return (
            <>
              <KeyboardKey
                keyboardKey={keyboardKey}
                classKey={"backspace"}
                index={index}
                handleKeyClick={handleKeyClick}
                keyboardText={""}
              />
            <img className="backspace-img" src={backspace} alt="backspace.svg"></img>
            </>
          );
        } else
          return (
            <KeyboardKey
              keyboardKey={keyboardKey}
              classKey={"letter"}
              index={index}
              handleKeyClick={handleKeyClick}
              keyboardText={keyboardKey}
            />
          );
      })}
    </div>
  );
}

function KeyboardKey({ keyboardKey, classKey, handleKeyClick, keyboardText }) {
  const className = `keyboard-key ${classKey}`;

  return (
    <button
      className={className}
      onClick={handleKeyClick}
      key={keyboardKey}
      id={keyboardKey.toUpperCase()}
    >
      {keyboardText.toUpperCase()}
    </button>
  );
}
