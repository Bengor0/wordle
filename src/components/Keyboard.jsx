import { useContext } from "react";
import KeyboardContext from "../contexts/KeyboardContext.js";
import ".././styles/Keyboard.css";
import { IoBackspaceOutline } from "react-icons/io5";

const KEYS = [
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
  ["ENTER", "Z", "X", "C", "V", "B", "N", "M", "BACKSPACE"],
];

function KeyBoard({ className, keyColors }) {
  const { handleKeyClick } = useContext(KeyboardContext);
  return (
    <div className={`keyboard ${className}`}>
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
export default KeyBoard;

function KeyboardRow({ keyboardRow, index, keyColors }) {
  const className = `keyboard-row ${index + 1}`;
  return (
    <div className={className}>
      {keyboardRow.map((keyboardKey, index) => (
        <KeyboardKey
          keyboardKey={keyboardKey}
          key={index}
          keyColors={keyColors}
        />
      ))}
    </div>
  );
}

function KeyboardKey({ keyboardKey, keyColors }) {
  const { handleKeyClick } = useContext(KeyboardContext);

  const classKey =
    keyboardKey.length > 1 ? keyboardKey.toLowerCase() : "key-letter";
  const className = `keyboard-key ${classKey} ${keyColors.get(keyboardKey)}`;
  const keyboardKeyText = keyboardKey === "BACKSPACE" ? null : keyboardKey;

  return (
    <button className={className} onClick={handleKeyClick} id={keyboardKey}>
      {keyboardKey === "BACKSPACE" && (
        <IoBackspaceOutline className={"backspace-img"} />
      )}
      {keyboardKeyText}
    </button>
  );
}
