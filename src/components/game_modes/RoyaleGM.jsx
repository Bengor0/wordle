import Wordle from "../Wordle.jsx";
import { useEffect, useRef, useState } from "react";
import useToggleState from "../../hooks/useToggleState.js";

const API_URL =
  "https://raw.githubusercontent.com/Bengor0/wordle-words-API/refs/heads/main/wordle-wordbank.json";

import React from "react";
import GameOverDialog from "../modals/GameOverDialog.jsx";

function RoyaleGM({
  darkMode,
  userData,
  setUserData,
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
        setGameRound(gameRound + 1);
        if (checkResult()) {
          setIsGameOver(true);
        } else {
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

  const checkResult = () => {
    if (gameRound === 1 && rowIndex.current > 5) {
      return true;
    } else if (gameRound === 2 && rowIndex.current > 4) {
      return true;
    } else if (gameRound === 3 && rowIndex.current > 3) {
      return true;
    } else if (gameRound === 4 && rowIndex.current > 2) {
      return true;
    } else return gameRound === 5;
  };

  return (
    <>
      <div style={{ color: "white" }}>
        {"Round: " + gameRound + " " + solution}
      </div>
      <Wordle
        darkMode={darkMode}
        userData={userData}
        setUserData={setUserData}
        gameMode={gameMode}
        solution={solution}
        wordSet={wordSet}
        key={restart}
        rowIndex={rowIndex}
        gameResult={roundResult}
        setGameResult={setRoundResult}
        wordLength={wordLength}
        numOfGuesses={numOfGuesses}
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
