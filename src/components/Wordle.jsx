import { useRef, useState, useEffect } from "react";
import KeyBoard from "./Keyboard.jsx";
import KeyboardContext from "../contexts/KeyboardContext.js";
import "../styles/Wordle.css";
import { toast, Toaster } from "sonner";
import WordleBoard from "./WordleBoard.jsx";

export default function Wordle({
  darkMode,
  gameMode,
  solution,
  wordSet,
  gameResult,
  setGameResult,
  rowIndex,
  numOfGuesses,
  wordLength,
  highLight,
  guesses,
  setGuesses,
  keyColors,
  setKeyColors,
  baseColors,
}) {
  const guess = useRef({
    word: "",
    colors: baseColors,
  });
  const isEnterEnabled = useRef(true);

  const guessRevealAnimation = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  const updateKeyboard = (guessChar, color) => {
    setTimeout(() => {
      keyColors.get(guessChar) !== "green" &&
        setKeyColors((prev) => {
          const shallowKeyColors = new Map(prev);
          shallowKeyColors.set(guessChar, color);
          return shallowKeyColors;
        });
    }, 1700);
  };

  const updateGuesses = (guess) => {
    const shallowGuesses = [...guesses];
    shallowGuesses[rowIndex.current] = { ...guess };
    setGuesses(shallowGuesses);
  };

  const checkGuess = async () => {
    const tileColors = new Array(wordLength).fill(undefined);
    const keyboardColors = new Map();
    const furtherEval = [];
    let correct = 0;
    const guessCharsMap = new Map();
    solution.forEach((char) =>
      guessCharsMap.has(char)
        ? guessCharsMap.set(char, guessCharsMap.get(char) + 1)
        : guessCharsMap.set(char, 1),
    );

    guess.current.word.split("").forEach((guessChar, i) => {
      if (guessChar === solution[i]) {
        tileColors[i] = "green";
        keyboardColors.set(guessChar, "green");
        correct++;
        guessCharsMap.set(guessChar, guessCharsMap.get(guessChar) - 1);
      } else furtherEval.push(i);
    });

    furtherEval.forEach((index) => {
      const guessChar = guess.current.word[index];
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
      updateKeyboard(key, value);
    });

    guess.current = {
      word: guess.current.word,
      colors: tileColors,
    };
    updateGuesses(guess.current);
    await guessRevealAnimation(1700);

    if (correct === wordLength) {
      await guessRevealAnimation(1000);
      setGameResult("guessed");
    }
  };

  const handleKeyClick = (event) => {
    handleKey(event.target.id);
  };

  const handleKey = async (key) => {
    if (!gameResult && isEnterEnabled.current) {
      if (key === "ENTER" && guess.current.word.length === wordLength) {
        if (wordSet.current.has(guess.current.word)) {
          isEnterEnabled.current = false;
          await checkGuess();
          rowIndex.current++;
          guess.current = { word: "", colors: baseColors };
          isEnterEnabled.current = true;
          if (!gameResult && rowIndex.current >= numOfGuesses) {
            setGameResult("failed");
            rowIndex.current++;
          }
        } else {
          toast.warning("Not in the word bank.");
        }
      } else if (rowIndex.current < numOfGuesses) {
        if (key === "BACKSPACE" && guess.current.word.length > 0) {
          guess.current.word = guess.current.word.slice(0, -1);
          updateGuesses(guess.current);
        } else if (
          /[A-Z]/.test(key) &&
          key.length === 1 &&
          guess.current.word.length < wordLength
        ) {
          guess.current.word = guess.current.word + key;
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
      <h3 className={`game-mode ${darkMode}`}>{gameMode}</h3>
      <WordleBoard
        guesses={guesses}
        className={darkMode}
        wordLength={wordLength}
        highLight={highLight}
      />

      <KeyboardContext.Provider value={{ handleKeyClick }}>
        <KeyBoard className={darkMode} keyColors={keyColors} />
      </KeyboardContext.Provider>
    </>
  );
}
