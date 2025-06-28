import { useRef, useState, useEffect } from "react";
import KeyBoard from "./Keyboard.jsx";
import KeyboardContext from "../contexts/KeyboardContext.js";
import "../styles/Wordle.css";
import { toast, Toaster } from "sonner";
import { Button } from "react-bootstrap";
import WordleBoard from "./WordleBoard.jsx";
import useToggleState from "../hooks/useToggleState.js";

const WORD_LENGTH = 5;
const NUM_OF_GUESSES = 6;
const BASE_COLORS = ["black", "black", "black", "black", "black"];

export default function Wordle({
  darkMode,
  userData,
  setUserData,
  gameMode,
  solution,
  wordSet,
  gameResult,
  setGameResult,
  rowIndex,
}) {
  const guess = useRef(["", BASE_COLORS]);
  const [guesses, setGuesses] = useState(
    new Array(NUM_OF_GUESSES).fill(["", BASE_COLORS]),
  );
  const isEnterEnabled = useRef(true);
  const keyboardRef = useRef(null);

  const guessRevealAnimation = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  const updateGuesses = (guess) => {
    const shallowGuesses = [...guesses];
    shallowGuesses[rowIndex.current] = guess;
    setGuesses(shallowGuesses);
  };

  const checkGuess = async () => {
    const tileColors = new Array(WORD_LENGTH).fill(undefined);
    const keyboardColors = new Map();
    const furtherEval = [];
    let correct = 0;
    const guessCharsMap = new Map();
    solution.forEach((char) =>
      guessCharsMap.has(char)
        ? guessCharsMap.set(char, guessCharsMap.get(char) + 1)
        : guessCharsMap.set(char, 1),
    );

    guess.current[0].split("").forEach((guessChar, i) => {
      if (guessChar === solution[i]) {
        tileColors[i] = "green";
        keyboardColors.set(guessChar, "green");
        correct++;
        guessCharsMap.set(guessChar, guessCharsMap.get(guessChar) - 1);
      } else furtherEval.push(i);
    });

    furtherEval.forEach((index) => {
      const guessChar = guess.current[0][index];
      if (guessCharsMap.get(guessChar) && solution.includes(guessChar)) {
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

    guess.current = [guess.current[0], tileColors];
    updateGuesses(guess.current);
    await guessRevealAnimation(1700);

    if (correct === WORD_LENGTH) {
      await guessRevealAnimation(1000);
      setGameResult("guessed");
    }
  };

  const handleKeyClick = (event) => {
    handleKey(event.target.id);
  };

  const handleKey = async (key) => {
    if (!gameResult && isEnterEnabled.current) {
      if (key === "ENTER" && guess.current[0].length === WORD_LENGTH) {
        if (wordSet.current.has(guess.current[0])) {
          isEnterEnabled.current = false;
          await checkGuess();
          rowIndex.current++;
          guess.current = ["", BASE_COLORS];
          isEnterEnabled.current = true;
          if (!gameResult && rowIndex.current >= NUM_OF_GUESSES) {
            setGameResult("failed");
            rowIndex.current++;
            setMessage(
              <Message message={`Did you even try? (${solution.join("")})`} />,
            );
          }
          console.log(rowIndex.current);
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
      <WordleBoard
        guesses={guesses}
        className={darkMode}
        wordLength={WORD_LENGTH}
      />

      <KeyboardContext.Provider value={{ handleKeyClick }}>
        <KeyBoard className={darkMode} ref={keyboardRef} />
      </KeyboardContext.Provider>
    </>
  );
}
