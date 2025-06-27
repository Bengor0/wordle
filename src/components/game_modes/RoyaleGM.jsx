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
}) {
  const solutionsRef = useRef([]);
  const [solution, setSolution] = useState([]);
  const [gameRound, setGameRound] = useState(0);
  const [restart, toggleRestart] = useToggleState(false);
  const wordSet = useRef(new Set());
  const rowIndex = useRef(0);
  const [gameResult, setGameResult] = useState("");

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
          solutionsRef.current = [
            ...solutionsRef.current,
            randomWord.toUpperCase().split(""),
          ];
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
    if (solutionsRef.current[gameRound]) {
      setSolution(solutionsRef.current[gameRound]);
      setGameRound(gameRound + 1);
      rowIndex.current = 0;
    }
  }, [restart]);

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
        toggleRestart={toggleRestart}
        key={restart}
        rowIndex={rowIndex}
        gameResult={gameResult}
        setGameResult={setGameResult}
      />
      <GameOverDialog
        gameMode={gameMode}
        gameResut={gameResult}
        setGameResult={setGameResult}
        toggleRestart={toggleRestart}
        togglePlayWordle={togglePlayWordle}
      />
    </>
  );
}

export default RoyaleGM;
