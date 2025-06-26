import { useContext, useState, forwardRef, useImperativeHandle } from "react";
import KeyboardContext from "../contexts/KeyboardContext.js";
import ".././styles/Keyboard.css";
import { IoBackspaceOutline } from "react-icons/io5";

const KEYS = [
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
  ["ENTER", "Z", "X", "C", "V", "B", "N", "M", "BACKSPACE"],
];

function KeyBoard({ className }, ref) {
  const { handleKeyClick } = useContext(KeyboardContext);
  const [keyColors, setKeyColor] = useState(new Map());

  const udpateKeyColor = (guessChar, color) => {
    setTimeout(() => {
      keyColors.get(guessChar) !== "green" &&
        setKeyColor((prev) => {
          const shallowKeyColors = new Map(prev);
          shallowKeyColors.set(guessChar, color);
          return shallowKeyColors;
        });
    }, 1700);
  };

  useImperativeHandle(ref, () => ({
    udpateKeyColor,
  }));

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
export default forwardRef(KeyBoard);

function KeyboardRow({ keyboardRow, index, keyColors }) {
  const { handleKeyClick } = useContext(KeyboardContext);
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
