import { useContext, useState, forwardRef, useImperativeHandle } from "react";
import KeyboardContext from "../contexts/KeyboardContext";
import ".././styles/Keyboard.css";
import backspace from ".././assets/backspace.svg";
import useRelativeFontSize from "../hooks/useRelativeFontSize";

const KEYS = [
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
  ["ENTER", "Z", "X", "C", "V", "B", "N", "M", "BACKSPACE"],
];

function KeyBoard(props, ref) {
  const { handleKeyClick } = useContext(KeyboardContext);
  const [keyColors, setKeyColor] = useState(new Map());
  const [fontSize, elementRef] = useRelativeFontSize(0.3, "height");

  const udpateKeyColor = (guessChar, color) => {
    setTimeout(() => {
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
    <div
      className={`keyboard ${props.darkMode}`}
      style={{ fontSize: `${fontSize}px` }}
    >
      {KEYS.map((keyboardRow, index) => (
        <KeyboardRow
          keyboardRow={keyboardRow}
          index={index}
          handleKeyClick={handleKeyClick}
          key={index}
          keyColors={keyColors}
          elementRef={elementRef}
        />
      ))}
    </div>
  );
}
export default forwardRef(KeyBoard);

function KeyboardRow({ keyboardRow, index, keyColors, elementRef }) {
  const { handleKeyClick } = useContext(KeyboardContext);
  const className = `keyboard-row ${index + 1}`;
  return (
    <div className={className}>
      {keyboardRow.map((keyboardKey, index) => (
        <KeyboardKey
          keyboardKey={keyboardKey}
          key={index}
          keyColors={keyColors}
          elementRef={elementRef}
        />
      ))}
    </div>
  );
}

function KeyboardKey({ keyboardKey, keyColors, elementRef }) {
  const { handleKeyClick } = useContext(KeyboardContext);

  const classKey =
    keyboardKey.length > 1 ? keyboardKey.toLowerCase() : "key-letter";
  const className = `keyboard-key ${classKey} ${keyColors.get(keyboardKey)}`;
  const keyboardKeyText = keyboardKey === "BACKSPACE" ? null : keyboardKey;

  return (
    <button
      ref={elementRef}
      className={className}
      onClick={handleKeyClick}
      id={keyboardKey}
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
