import { useRef, useState, useEffect } from "react";
import useToggleState from "./hooks/useToggleState";
import KeyBoard from "./components/KeyBoard";
import KeyboardContext from "./contexts/KeyboardContext";
import useRelativeFontSize from "./hooks/useRelativeFontSize";
import "./Wordle.css";

const API_URL =
  "https://raw.githubusercontent.com/Bengor0/wordle-words-API/refs/heads/main/wordle-wordbank.json";
const WORD_LENGTH = 5;
const NUM_OF_GUESSES = 6;
const BASE_COLORS = ["black", "black", "black", "black", "black"];
const MESSAGES = [
  ["Pure genius!", "Bull's eye!", "Perfect!"],
  ["Excellent!", "Amazing!", "Incredible!"],
  ["Wow!", "Great skill!", "Nailed it!"],
  ["Well done!", "Solid effor!", "Good job!"],
  ["We're there!", "Nice!", "With spare guess left!"],
  ["Close call!", "Barely there!", "This was tricky!", "No room!"],
];

export default function Wordle({ darkMode }) {
  const solution = useRef("");
  const guess = useRef(["", BASE_COLORS]);
  const [guesses, setGuesses] = useState(
    new Array(NUM_OF_GUESSES).fill(["", BASE_COLORS])
  );
  const rowIndex = useRef(0);
  const [isGameOver, toggleIsGameOver] = useToggleState(false);
  const [restart, toggleRestart] = useToggleState(false);
  const wordSet = useRef(new Set());
  const [message, setMessage] = useState(null);
  const enterTimeout = useRef(false);
  const keyboardRef = useRef(null);
  const [wordleFontSize, wordleElementRef] = useRelativeFontSize(0.7, "width");
  const [messageFontSize, messageElementRef] = useRelativeFontSize(
    0.07,
    "width"
  );

  const restartGame = () => {
    guess.current = ["", BASE_COLORS];
    setGuesses(new Array(NUM_OF_GUESSES).fill(["", BASE_COLORS]));
    rowIndex.current = 0;
    setMessage(null);
    toggleIsGameOver();
    wordSet.current = new Set();
    toggleRestart();
  };

  const guessRevealAnimation = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  useEffect(() => {
    const fetchWords = async () => {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();
        const wordArray = [...data.words];
        wordArray.forEach((word) => wordSet.current.add(word.toUpperCase()));
        const randomWord =
          wordArray[Math.floor(Math.random() * (wordArray.length - 1))];
        solution.current = randomWord.toUpperCase().split("");
        console.log(solution.current.join(""));
      } catch (error) {
        console.error(error);
      }
    };

    fetchWords();
  }, [restart]);

  const updateGuesses = (guess) => {
    const shallowGuesses = [...guesses];
    shallowGuesses[rowIndex.current] = guess;
    setGuesses(shallowGuesses);
  };

  const checkGuess = () => {
    const colors = [];
    let correct = 0;
    const mapChars = new Map();
    solution.current.forEach((char) =>
      mapChars.has(char)
        ? mapChars.set(char, mapChars.get(char) + 1)
        : mapChars.set(char, 1)
    );

    for (let i = 0; i < WORD_LENGTH; i++) {
      let guessChar = guess.current[0][i];
      let solutionChar = solution.current[i];

      if (guessChar === solutionChar) {
        colors.push("green");
        keyboardRef.current?.udpateKeyColor(guessChar, "green");
        correct++;
        mapChars.set(guessChar, mapChars.get(guessChar) - 1);
      } else if (
        solution.current.includes(guessChar) &&
        mapChars.get(guessChar) > 0
      ) {
        colors.push("orange");
        keyboardRef.current?.udpateKeyColor(guessChar, "orange");
        mapChars.set(guessChar, mapChars.get(guessChar) - 1);
      } else {
        colors.push("grey");
        keyboardRef.current?.udpateKeyColor(guessChar, "grey");
      }
    }

    if (correct === WORD_LENGTH) {
      rowIndex.current === 0 &&
        setMessage(MESSAGES[0][Math.floor(Math.random() * 3)]);
      rowIndex.current === 1 &&
        setMessage(MESSAGES[1][Math.floor(Math.random() * 3)]);
      rowIndex.current === 2 &&
        setMessage(MESSAGES[2][Math.floor(Math.random() * 3)]);
      rowIndex.current === 3 &&
        setMessage(MESSAGES[3][Math.floor(Math.random() * 3)]);
      rowIndex.current === 4 &&
        setMessage(MESSAGES[4][Math.floor(Math.random() * 3)]);
      rowIndex.current === 5 &&
        setMessage(MESSAGES[5][Math.floor(Math.random() * 3)]);
      toggleIsGameOver();
    }

    guess.current = [guess.current[0], colors];
    updateGuesses(guess.current);
  };

  const handleKeyClick = (event) => {
    handleKey(event.target.id);
  };

  const handleKey = async (key) => {
    if (!isGameOver && !enterTimeout.current) {
      if (key === "ENTER" && guess.current[0].length === WORD_LENGTH) {
        enterTimeout.current = true;
        if (wordSet.current.has(guess.current[0])) {
          checkGuess();
          await guessRevealAnimation(1700);
          rowIndex.current = rowIndex.current + 1;
          guess.current = ["", BASE_COLORS];
          enterTimeout.current = false;
          if (!isGameOver && rowIndex.current >= NUM_OF_GUESSES) {
            toggleIsGameOver();
            setMessage(<Message message={`${solution.current.join("")}`} />);
            return;
          }
          return;
        } else {
          enterTimeout.current = false;
          return;
        }
      } else if (rowIndex.current < NUM_OF_GUESSES) {
        if (key === "BACKSPACE" && guess.current[0].length > 0) {
          guess.current[0] = guess.current[0].slice(0, -1);
          updateGuesses(guess.current);
        } else if (
          /[A-Z]/.test(key) &&
          key.length === 1 &&
          guess.current[0].length < WORD_LENGTH
        ) {
          guess.current[0] = guess.current[0] + key;
          updateGuesses(guess.current);
        } else return;
      }
    } else return;
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      handleKey(event.key.toUpperCase());
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [guesses]);

  return (
    <>
      {isGameOver && (
        <Message
          message={message}
          darkMode={darkMode}
          messageFontSize={messageFontSize}
        />
      )}
      <div
        ref={messageElementRef}
        className="wordle-board"
        style={{ fontSize: `${wordleFontSize}px` }}
      >
        {guesses.map((guess, i) => {
          return (
            <Row
              guess={guess}
              darkMode={darkMode}
              key={i}
              wordleElementRef={wordleElementRef}
            />
          );
        })}
      </div>
      {isGameOver ? (
        <button
          className={`restart-button ${darkMode}`}
          onClick={restartGame}
          style={{
            fontSize: `${messageFontSize}px`,
            borderRadius: `${0.3529 * messageFontSize}px`,
          }}
        >
          Play again
        </button>
      ) : (
        <KeyboardContext.Provider value={{ handleKeyClick }}>
          <KeyBoard darkMode={darkMode} ref={keyboardRef} />
        </KeyboardContext.Provider>
      )}
    </>
  );
}

function Row({ guess, darkMode, wordleElementRef }) {
  const tiles = [];

  for (let i = 0; i < WORD_LENGTH; i++) {
    let char = guess[0][i];
    let tileClassName = `tile ${guess[1][i]}`;
    let spanClassName = `letter ${guess[1][i]} ${darkMode}`;

    tiles.push(
      <div
        className={tileClassName}
        key={i}
        style={{ "--index": i }}
        ref={wordleElementRef}
      >
        <div className="tile-inner" style={{ "--index": i }}>
          <div className={`letter black ${darkMode}`} style={{ "--index": i }}>
            <span>{char}</span>
          </div>
          <div className={spanClassName} style={{ "--index": i }}>
            <span>{char}</span>
          </div>
        </div>
      </div>
    );
  }

  return <>{tiles}</>;
}

function Message({ message, darkMode, messageFontSize }) {
  return (
    <div
      className={`message ${darkMode}`}
      style={{
        fontSize: `${messageFontSize}px`,
        padding: `${0.2941 * messageFontSize}px`,
      }}
    >
      {message}
    </div>
  );
}
