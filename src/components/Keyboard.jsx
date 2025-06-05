import {
  useContext,
  useState,
  forwardRef,
  useImperativeHandle,
  useEffect,
  useRef,
} from "react";
import KeyboardContext from "../contexts/KeyboardContext";
import ".././styles/Keyboard.css";
import backspace from ".././assets/backspace.svg";

const KEYS = [
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
  ["ENTER", "Z", "X", "C", "V", "B", "N", "M", "BACKSPACE"],
];

function KeyBoard(props, ref) {
  const { handleKeyClick } = useContext(KeyboardContext);
  const [keyColors, setKeyColor] = useState(new Map());
  console.log(props.darkMode);

  useEffect(() => {
    for (let i = 0; i < KEYS.length; i++) {
      for (let j = 0; j < KEYS[i]; j++) {
        setKeyColor((prev) => {
          const shallowPrev = new Map(prev);
          const color = KEYS[i][j].length === 1 ? "#808080" : "#1a1a1a";
          shallowPrev.set(KEYS[i][j], color);
        });
      }
    }
  }, []);

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
    <div className="keyboard">
      {KEYS.map((keyboardRow, index) => (
        <KeyboardRow
          darkMode={props.darkMode}
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

function KeyboardRow({ darkMode, keyboardRow, index, keyColors }) {
  const { handleKeyClick } = useContext(KeyboardContext);
  const className = `keyboard-row ${index + 1}`;
  return (
    <div className={className}>
      {keyboardRow.map((keyboardKey, index) => (
        <KeyboardKey
          darkMode={darkMode}
          keyboardKey={keyboardKey}
          key={index}
          keyColors={keyColors}
        />
      ))}
    </div>
  );
}

function KeyboardKey({ darkMode, keyboardKey, keyColors }) {
  const { handleKeyClick } = useContext(KeyboardContext);
  const classKey =
    keyboardKey.length > 1 ? keyboardKey.toLowerCase() : "key-letter";
  const className = `keyboard-key ${classKey} ${keyColors.get(
    keyboardKey
  )} ${darkMode}`;
  const keyboardKeyText = keyboardKey === "BACKSPACE" ? null : keyboardKey;
  const [fontSize, setFontSize] = useState(10);
  const keyboardKeyRef = useRef(null);
  const fontScalingFactor = keyboardKeyText === 'ENTER' ? 0.156715 : 0.303490;

  const resizeFontSize = () => {
    keyboardKeyRef.current && setFontSize(keyboardKeyRef.current.clientWidth * fontScalingFactor);
  }

  useEffect(() => {
    window.addEventListener('resize', resizeFontSize);
  }, []);

  return (
    <button ref={keyboardKeyRef} className={className} onClick={handleKeyClick} id={keyboardKey} style={{fontSize: `${fontSize}px`}} >
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
