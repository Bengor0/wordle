import { useContext } from "react";
import KeyboardContext from "../contexts/KeyboardContext";
import ".././styles/Keyboard.css";
import backspace from ".././assets/backspace.svg";

export default function KeyBoard({}) {
  const { handleKeyClick, keyColors } = useContext(KeyboardContext);
  const KEYS = [
    ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
    ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
    ["ENTER", "Z", "X", "C", "V", "B", "N", "M", "BACKSPACE"],
  ];
  return (
    <div className="keyboard">
      {KEYS.map((keyboardRow, index) => (
        <KeyboardRow
          keyboardRow={keyboardRow}
          index={index}
          handleKeyClick={handleKeyClick}
          key={index}
          keyColors={keyColors}
        />
      ))}
    </div>
  );
}

function KeyboardRow({ keyboardRow, index }) {
  const { handleKeyClick, keyColors } = useContext(KeyboardContext);
  const className = `keyboard-row ${index + 1}`;
  return (
    <div className={className}>
      {keyboardRow.map((keyboardKey, index) => (
        <KeyboardKey keyboardKey={keyboardKey} key={index} />
      ))}
    </div>
  );
}

function KeyboardKey({ keyboardKey }) {
  const { handleKeyClick, keyColors } = useContext(KeyboardContext);
  const classKey =
    keyboardKey.length > 1 ? keyboardKey.toLowerCase() : "letter";
  const className = `keyboard-key ${classKey}`;
  const keyboardKeyText = keyboardKey === "BACKSPACE" ? null : keyboardKey;

  return (
    <button
      className={className}
      onClick={handleKeyClick}
      id={keyboardKey}
      style={{ backgroundColor: keyColors.get(keyboardKey) }}
    >
      {keyboardKey === "BACKSPACE" && (
        <img
          className="backspace-img"
          src={backspace}
          alt="backspace.svg"
        ></img>
      )}
      {keyboardKeyText}
    </button>
  );
}
