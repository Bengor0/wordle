import { useState, useEffect, useRef } from "react";
import Wordle from "../Wordle.jsx";
import useToggleState from "../../hooks/useToggleState.js";

const API_URL =
  "https://raw.githubusercontent.com/Bengor0/wordle-words-API/refs/heads/main/wordle-wordbank.json";

import React from "react";
import GameOverDialog from "../modals/GameOverDialog.jsx";

function PracticeGM({
  darkMode,
  gameMode,
  togglePlayWordle,
  wordLength,
  numOfGuesses,
  guesses,
  setGuesses,
  keyColors,
  setKeyColors,
  rowIndex,
  baseColors,
  toggleRestart,
}) {
  const [solution, setSolution] = useState([]);
  const solutionRef = useRef([]);
  const wordSet = useRef(new Set());
  const [gameResult, setGameResult] = useState("");

  useEffect(() => {
    const fetchWords = async () => {
      try {
        rowIndex.current = 0;
        const response = await fetch(API_URL);
        const data = await response.json();
        const wordArray = [...data.words];
        wordArray.forEach((word) => wordSet.current.add(word));
        const randomWord =
          wordArray[Math.floor(Math.random() * (wordArray.length - 1))];
        setSolution(randomWord.toUpperCase().split(""));
        solutionRef.current = randomWord.toUpperCase().split("");
        console.log(solutionRef.current.join(""));
      } catch (error) {
        console.error(error);
      }
    };

    fetchWords();
  }, []);

  return (
    <>
      <Wordle
        darkMode={darkMode}
        gameMode={gameMode}
        solution={solution}
        wordSet={wordSet}
        rowIndex={rowIndex}
        gameResult={gameResult}
        setGameResult={setGameResult}
        wordLength={wordLength}
        numOfGuesses={numOfGuesses}
        guesses={guesses}
        setGuesses={setGuesses}
        keyColors={keyColors}
        setKeyColors={setKeyColors}
        baseColors={baseColors}
      />
      <GameOverDialog
        gameMode={gameMode}
        showDialog={gameResult}
        setGameResult={setGameResult}
        toggleRestart={toggleRestart}
        togglePlayWordle={togglePlayWordle}
      />
    </>
  );
}

export default PracticeGM;
