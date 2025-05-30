import { useContext } from "react";
import KeyboardContext from "../App.jsx";
import ".././styles/Keyboard.css";
import backspace from ".././assets/backspace.svg";

export default function KeyBoard({ handleKeyClick }) {
  const KEYS = [
    ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
    ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
    ["Enter", "z", "x", "c", "v", "b", "n", "m", "Backspace"],
  ];
  return (
    <div className="keyboard">
      {KEYS.map((keyboardRow, index) => (
        <div key={index}>
          <KeyboardRow
            keyboardRow={keyboardRow}
            index={index}
            handleKeyClick={handleKeyClick}
            key={index}
          />
        </div>
      ))}
    </div>
  );
}

function KeyboardRow({ keyboardRow, index, handleKeyClick }) {
  const className = `keyboard-row ${index + 1}`;
  return (
    <div className={className}>
      {keyboardRow.map((keyboardKey, index) => {
        if (keyboardKey === "Enter") {
          return (
            <div key={index}>
              <KeyboardKey
                keyboardKey={keyboardKey}
                classKey={"enter"}
                handleKeyClick={handleKeyClick}
                keyboardText={keyboardKey}
                key={index}
              />
            </div>
          );
        } else if (keyboardKey === "Backspace") {
          return (
            <div className="backspace-container" key={index}>
              <KeyboardKey
                keyboardKey={keyboardKey}
                classKey={"backspace"}
                handleKeyClick={handleKeyClick}
                keyboardText={""}
              />
              <img
                className="backspace-img"
                src={backspace}
                alt="backspace.svg"
              ></img>
            </div>
          );
        } else
          return (
            <div key={index}>
              <KeyboardKey
                keyboardKey={keyboardKey}
                classKey={"letter"}
                handleKeyClick={handleKeyClick}
                keyboardText={keyboardKey}
              />
            </div>
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
