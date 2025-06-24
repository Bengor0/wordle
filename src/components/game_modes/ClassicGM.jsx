import Wordle from "../../Wordle";
import { useEffect, useRef, useState } from "react";
import useToggleState from "../../hooks/useToggleState.js";

const API_URL =
  "https://raw.githubusercontent.com/Bengor0/wordle-words-API/refs/heads/main/wordle-wordbank.json";

import React from "react";

function ClassicGM({ darkMode, userData, setUserData, gameMode }) {
  const [solution, setSolution] = useState([]);
  const solutionRef = useRef([]);
  const [isGameOver, toggleIsGameOver] = useToggleState(false);
  const [restart, toggleRestart] = useToggleState(false);
  const wordSet = useRef(new Set());

  useEffect(() => {
    const fetchWords = async () => {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();
        const wordArray = [...data.words];
        wordArray.forEach((word) => wordSet.current.add(word.toUpperCase()));
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
  }, [restart]);

  return (
    <Wordle
      darkMode={darkMode}
      userData={userData}
      setUserData={setUserData}
      gameMode={gameMode}
      solution={solution}
      wordSet={wordSet}
      isGameOver={isGameOver}
      toggleIsGameOver={toggleIsGameOver}
      toggleRestart={toggleRestart}
      key={restart}
    />
  );
}

export default ClassicGM;
