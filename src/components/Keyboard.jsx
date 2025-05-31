import { useContext, useState } from "react";
import KeyboardContext from "../App.jsx";
import ".././styles/Keyboard.css";
import backspace from ".././assets/backspace.svg";

export default function KeyBoard({ handleKeyClick, keyColors }) {
  const KEYS = [
    ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
    ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
    ["ENTER", "Z", "X", "C", "V", "B", "N", "M", "BACKSPACE"],
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
            keyColors={keyColors}
          />
        </div>
      ))}
    </div>
  );
}

function KeyboardRow({ keyboardRow, index, handleKeyClick, keyColors }) {
  const className = `keyboard-row ${index + 1}`;
  return (
    <div className={className}>
      {keyboardRow.map((keyboardKey, index) => {
        if (keyboardKey === "ENTER") {
          return (
            <div key={index}>
              <KeyboardKey
                keyboardKey={keyboardKey}
                classKey={"enter"}
                handleKeyClick={handleKeyClick}
                key={index}
                keyColors={keyColors}
              />
            </div>
          );
        } else if (keyboardKey === "BACKSPACE") {
          return (
            <div className="backspace-container" key={index}>
              <KeyboardKey
                keyboardKey={keyboardKey}
                classKey={"backspace"}
                handleKeyClick={handleKeyClick}
                keyColors={keyColors}
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
                keyColors={keyColors}
              />
            </div>
          );
      })}
    </div>
  );
}

function KeyboardKey({ keyboardKey, classKey, handleKeyClick, keyColors }) {
  const className = `keyboard-key ${classKey}`;
  const keyboardKeyText = keyboardKey === "BACKSPACE" ? "" : keyboardKey;

  return (
    <button
      className={className}
      onClick={handleKeyClick}
      id={keyboardKey}
      style={{backgroundColor : keyColors.get(keyboardKey)}}
    >
      {keyboardKeyText}
    </button>
  );
}
