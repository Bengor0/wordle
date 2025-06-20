import { useRef, useState, useEffect } from "react";
import useToggleState from "./hooks/useToggleState";
import KeyBoard from "./components/KeyBoard";
import KeyboardContext from "./contexts/KeyboardContext";
import useRelativeFontSize from "./hooks/useRelativeFontSize";
import "./Wordle.css";
import { toast, Toaster } from "sonner";

const API_URL =
  "https://raw.githubusercontent.com/Bengor0/wordle-words-API/refs/heads/main/wordle-wordbank.json";
const WORD_LENGTH = 5;
const NUM_OF_GUESSES = 6;
const BASE_COLORS = ["black", "black", "black", "black", "black"];

export default function Wordle({ darkMode, userData, setUserData, gameMode }) {
  const solution = useRef([]);
  const guess = useRef(["", BASE_COLORS]);
  const [guesses, setGuesses] = useState(
    new Array(NUM_OF_GUESSES).fill(["", BASE_COLORS])
  );
  const rowIndex = useRef(0);
  const [isGameOver, toggleIsGameOver] = useToggleState(false);
  const [restart, toggleRestart] = useToggleState(false);
  const wordSet = useRef(new Set());
  const [message, setMessage] = useState(null);
  const isEnterEnabled = useRef(true);
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
    const tileColors = new Array(5).fill(undefined);
    const keyboardColors = new Map();
    const furtherEval = [];
    let correct = 0;
    const guessCharsMap = new Map();
    solution.current.forEach((char) =>
      guessCharsMap.has(char)
        ? guessCharsMap.set(char, guessCharsMap.get(char) + 1)
        : guessCharsMap.set(char, 1)
    );

    guess.current[0].split("").forEach((guessChar, i) => {
      if (guessChar === solution.current[i]) {
        tileColors[i] = "green";
        keyboardColors.set(guessChar, "green");
        correct++;
        guessCharsMap.set(guessChar, guessCharsMap.get(guessChar) - 1);
      } else furtherEval.push(i);
    });

    furtherEval.forEach((index) => {
      const guessChar = guess.current[0][index];
      if (
        guessCharsMap.get(guessChar) &&
        solution.current.includes(guessChar)
      ) {
        tileColors[index] = "orange";
        guessCharsMap.set(guessChar, guessCharsMap.get(guessChar) - 1);
        !keyboardColors.has(guessChar) &&
          keyboardColors.set(guessChar, "orange");
      } else {
        tileColors[index] = "grey";
        !keyboardColors.has(guessChar) && keyboardColors.set(guessChar, "grey");
      }
    });

    keyboardColors.forEach((value, key) => {
      keyboardRef.current?.udpateKeyColor(key, value);
    });

    if (correct === WORD_LENGTH) {
      rowIndex.current === 0 && setMessage("Sigma Guess!");
      rowIndex.current === 1 && setMessage("Giga Chad!");
      rowIndex.current === 2 && setMessage("You got that Worlde rizz!");
      rowIndex.current === 3 && setMessage("Crocodilo bombardiro approves!");
      rowIndex.current === 4 && setMessage("You understood the assignment!");
      rowIndex.current === 5 && setMessage(`Last brain cell activated!?%`);
      toggleIsGameOver();
    }

    guess.current = [guess.current[0], tileColors];
    updateGuesses(guess.current);
  };

  const handleKeyClick = (event) => {
    handleKey(event.target.id);
  };

  const handleKey = async (key) => {
    if (!isGameOver && isEnterEnabled.current) {
      if (key === "ENTER" && guess.current[0].length === WORD_LENGTH) {
        if (wordSet.current.has(guess.current[0])) {
          isEnterEnabled.current = false;
          checkGuess();
          await guessRevealAnimation(1700);
          rowIndex.current++;
          guess.current = ["", BASE_COLORS];
          isEnterEnabled.current = true;
          if (!isGameOver && rowIndex.current >= NUM_OF_GUESSES) {
            toggleIsGameOver();
            setMessage(
              <Message
                message={`Did you even try? (${solution.current.join("")})`}
              />
            );
          }
        } else {
          toast.warning("Not in the word bank.");
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
        }
      }
    }
    return;
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
      <Toaster richColors position="top-center" />
      {userData && (
        <h1 className={`nickname-paragraph ${darkMode}`}>
          {userData.get("nickname")}
        </h1>
      )}
      {userData && <p className={`paragraph ${darkMode}`}>is playing</p>}
      <h3 className={`game-mode ${darkMode}`}>{gameMode}</h3>
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
