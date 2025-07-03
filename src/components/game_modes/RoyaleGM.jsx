import Wordle from "../Wordle.jsx";
import { useEffect, useRef, useState } from "react";
import useToggleState from "../../hooks/useToggleState.js";

const API_URL =
  "https://raw.githubusercontent.com/Bengor0/wordle-words-API/refs/heads/main/wordle-wordbank.json";

import React from "react";
import GameOverDialog from "../modals/GameOverDialog.jsx";

function RoyaleGM({
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
  gameRound,
}) {
  const solutionsRef = useRef([]);
  const [solution, setSolution] = useState([]);
  const [restart, toggleRestart] = useToggleState(false);
  const wordSet = useRef(new Set());
  const [roundResult, setRoundResult] = useState("");
  const [isGameOver, setIsGameOver] = useState(false);
  const [greenHints, setGreenHints] = useState([]);
  const [orangeHints, setOrangeHints] = useState([]);

  useEffect(() => {
    const fetchWords = async () => {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();
        const wordArray = [...data.words];
        wordArray.forEach((word) => wordSet.current.add(word.toUpperCase()));
        while (solutionsRef.current.length < 5) {
          const randomWord =
            wordArray[Math.floor(Math.random() * (wordArray.length - 1))];
          solutionsRef.current.push(randomWord.toUpperCase().split(""));
        }
        setSolution(solutionsRef.current[0]);
        solutionsRef.current.forEach((solution) =>
          console.log(solution.join("")),
        );
      } catch (error) {
        console.error(error);
      }
    };

    fetchWords();
  }, []);

  useEffect(() => {
    if (roundResult) {
      if (roundResult !== "failed" && gameRound.current < numOfGuesses - 1) {
        if (crossedLine()) {
          setIsGameOver(true);
        } else {
          setSolution(solutionsRef.current[gameRound.current]);
          gameRound.current++;
          setRoundResult("");
          rowIndex.current = 0;
          setKeyColors(new Map());
          setGuesses(
            new Array(6).fill({
              word: "",
              colors: baseColors,
            }),
          );
          toggleRestart();
        }
      } else {
        setIsGameOver(true);
      }
    }
  }, [roundResult]);

  const crossedLine = () => {
    return gameRound.current + rowIndex.current > numOfGuesses;
  };

  const hint = () => {};

  return (
    <>
      <div style={{ color: "white" }}>
        {"Round: " + gameRound.current + " " + solution}
      </div>
      <Wordle
        darkMode={darkMode}
        gameMode={gameMode}
        solution={solution}
        wordSet={wordSet}
        key={restart}
        rowIndex={rowIndex}
        guesses={guesses}
        setGuesses={setGuesses}
        keyColors={keyColors}
        setKeyColors={setKeyColors}
        gameResult={roundResult}
        setGameResult={setRoundResult}
        wordLength={wordLength}
        numOfGuesses={numOfGuesses}
        highLight={numOfGuesses - gameRound.current}
        baseColors={baseColors}
      />
      <GameOverDialog
        gameMode={gameMode}
        showDialog={isGameOver}
        setGameResult={setRoundResult}
        toggleRestart={toggleRestart}
        togglePlayWordle={togglePlayWordle}
      />
    </>
  );
}

export default RoyaleGM;
