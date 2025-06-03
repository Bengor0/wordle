import { useRef, useState, useEffect } from "react";
import useToggleState from "./hooks/useToggleState";
import KeyBoard from "./components/KeyBoard";
import KeyboardContext from "./contexts/KeyboardContext";
import "./App.css";

const API_URL =
  "https://raw.githubusercontent.com/Bengor0/wordle-words-API/refs/heads/main/wordle-wordbank.json";
const WORD_LENGTH = 5;
const NUM_OF_GUESSES = 6;
const BASE_COLORS = ["black", "black", "black", "black", "black"];
const BASE_KEY_COLORS = new Map([
  ["Q", "#808080"],
  ["W", "#808080"],
  ["E", "#808080"],
  ["R", "#808080"],
  ["T", "#808080"],
  ["Y", "#808080"],
  ["U", "#808080"],
  ["I", "#808080"],
  ["O", "#808080"],
  ["P", "#808080"],
  ["A", "#808080"],
  ["S", "#808080"],
  ["D", "#808080"],
  ["F", "#808080"],
  ["G", "#808080"],
  ["H", "#808080"],
  ["J", "#808080"],
  ["K", "#808080"],
  ["L", "#808080"],
  ["Z", "#808080"],
  ["X", "#808080"],
  ["C", "#808080"],
  ["V", "#808080"],
  ["B", "#808080"],
  ["N", "#808080"],
  ["M", "#808080"],
  ["ENTER", "#1a1a1a"],
  ["BACKSPACE", "#1a1a1a"],
]);

export default function App() {
  const solution = useRef("");
  const guess = useRef(["", BASE_COLORS]);
  const [guesses, setGuesses] = useState(
    new Array(NUM_OF_GUESSES).fill(["", BASE_COLORS])
  );
  const [keyColors, setKeyColors] = useState(BASE_KEY_COLORS);
  const rowIndex = useRef(0);
  const [isGameOver, toggleIsGameOver] = useToggleState(false);
  const [restart, toggleRestart] = useToggleState(false);
  const wordSet = useRef(new Set());
  const [message, setMessage] = useState(null);
  const timeout = useRef(false);

  const restartGame = () => {
    guess.current = ["", BASE_COLORS];
    setGuesses(new Array(NUM_OF_GUESSES).fill(["", BASE_COLORS]));
    rowIndex.current = 0;
    setKeyColors(BASE_KEY_COLORS);
    setMessage(null);
    toggleIsGameOver();
    wordSet.current = new Set();
    toggleRestart();
  };

  const delay = (ms) => {
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

  const udpateKeyColor = (guessChar, color) => {
    setTimeout(() => {
      setKeyColors((prevKeyColors) => {
        const shallowKeyColors = new Map(prevKeyColors);
        shallowKeyColors.set(guessChar, color);
        return shallowKeyColors;
      });
    }, 1700);
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
        udpateKeyColor(guessChar, "green");
        correct++;
        mapChars.set(guessChar, mapChars.get(guessChar) - 1);
      } else if (
        solution.current.includes(guessChar) &&
        mapChars.get(guessChar) > 0
      ) {
        colors.push("orange");
        udpateKeyColor(guessChar, "#cc8400");
        mapChars.set(guessChar, mapChars.get(guessChar) - 1);
      } else {
        colors.push("grey");
        udpateKeyColor(guessChar, "#403c3c");
      }
    }

    if (correct === WORD_LENGTH) {
      rowIndex.current === 0 &&
        setMessage(<Message message={"Čo ti jebee?"} />);
      rowIndex.current === 1 && setMessage(<Message message={"Popičovka!"} />);
      rowIndex.current === 2 && setMessage(<Message message={"tOmu ver."} />);
      rowIndex.current === 3 &&
        setMessage(<Message message={"Slabší priemer"} />);
      rowIndex.current === 4 &&
        setMessage(<Message message={"Nejde ti to moc."} />);
      rowIndex.current === 5 &&
        setMessage(<Message message={"Skoro si dojebal"} />);
      toggleIsGameOver();
    }

    guess.current = [guess.current[0], colors];
    updateGuesses(guess.current);
  };

  const handleKeyClick = (event) => {
    handleKey(event.target.id);
  };

  const handleKey = async (key) => {
    if (!isGameOver && !timeout.current) {
      if (key === "ENTER" && guess.current[0].length === WORD_LENGTH) {
        timeout.current = true;
        console.log(timeout);
        if (wordSet.current.has(guess.current[0])) {
          checkGuess();
          await delay(1700);
          console.log("hello");
          rowIndex.current = rowIndex.current + 1;
          guess.current = ["", BASE_COLORS];
          timeout.current = false;
          console.log(timeout);
          if (rowIndex.current >= NUM_OF_GUESSES) {
            toggleIsGameOver();
            setMessage(
              <Message message={`Dojebals -> ${solution.current.join("")}`} />
            );
            return;
          }
          return;
        } else {
          timeout.current = false;
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
      <div className="top-container">
        {message}
        <div className="wordle-board">
          {guesses.map((guess, i) => {
            return <Row guess={guess} key={i} />;
          })}
        </div>
      </div>
      <div className="bottom-container">
        {isGameOver ? (
          <button className="restart-button" onClick={restartGame}>
            Play again
          </button>
        ) : (
          <KeyboardContext.Provider value={{ handleKeyClick, keyColors }}>
            <KeyBoard />
          </KeyboardContext.Provider>
        )}
      </div>
    </>
  );
}

function Row({ guess }) {
  const tiles = [];

  for (let i = 0; i < WORD_LENGTH; i++) {
    let char = guess[0][i];
    let tileClassName = `tile ${guess[1][i]}`;
    let spanClassName = `letter ${guess[1][i]}`;

    tiles.push(
      <div className={tileClassName} key={i} style={{ "--index": i }}>
        <div className="tile-inner" style={{ "--index": i }}>
          <div className="letter black" style={{ "--index": i }}>
            <span>{char}</span>
          </div>
          <div className={spanClassName} style={{ "--index": i }}>
            <span>{char}</span>
          </div>
        </div>
      </div>
    );
  }

  return <>{tiles}</>
}

function Message({ message }) {
  return <div className="message">{message}</div>;
}
