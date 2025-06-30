import Wordle from "../Wordle.jsx";
import { useEffect, useRef, useState } from "react";
import useToggleState from "../../hooks/useToggleState.js";

const API_URL =
  "https://raw.githubusercontent.com/Bengor0/wordle-words-API/refs/heads/main/wordle-wordbank.json";

import React from "react";
import GameOverDialog from "../modals/GameOverDialog.jsx";

function RoyaleGM({
  darkMode,
  currentUser,
  gameMode,
  togglePlayWordle,
  wordLength,
  numOfGuesses,
}) {
  const solutionsRef = useRef([]);
  const [solution, setSolution] = useState([]);
  const [gameRound, setGameRound] = useState(0);
  const gameRoundRef = useRef(1);
  const [restart, toggleRestart] = useToggleState(false);
  const wordSet = useRef(new Set());
  const rowIndex = useRef(0);
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
        setGameRound(1);
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
      if (roundResult !== "failed" && gameRound < numOfGuesses - 1) {
        if (crossedLine()) {
          setIsGameOver(true);
        } else {
          setGameRound(gameRound + 1);
          gameRoundRef.current++;
          setSolution(solutionsRef.current[gameRound]);
          setRoundResult("");
          rowIndex.current = 0;
          toggleRestart();
        }
      } else {
        setIsGameOver(true);
      }
    }
  }, [roundResult]);

  const crossedLine = () => {
    return gameRound + rowIndex.current > numOfGuesses;
  };

  const hint = () => {};

  return (
    <>
      <div style={{ color: "white" }}>{"Round: " + gameRound}</div>
      <Wordle
        darkMode={darkMode}
        gameMode={gameMode}
        solution={solution}
        wordSet={wordSet}
        key={restart}
        rowIndex={rowIndex}
        gameResult={roundResult}
        setGameResult={setRoundResult}
        wordLength={wordLength}
        numOfGuesses={numOfGuesses}
        highLight={numOfGuesses - gameRoundRef.current}
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
