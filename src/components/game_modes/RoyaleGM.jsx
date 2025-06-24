import Wordle from "../../Wordle";
import { useEffect, useRef, useState } from "react";
import useToggleState from "../../hooks/useToggleState.js";

const API_URL =
  "https://raw.githubusercontent.com/Bengor0/wordle-words-API/refs/heads/main/wordle-wordbank.json";

import React from "react";

function RoyaleGM({ darkMode, userData, setUserData, gameMode }) {
  const solutionsRef = useRef([]);
  const [solution, setSolution] = useState([]);
  const solutionIndexRef = useRef(0);
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
        while (solutionsRef.current.length < 5) {
          const randomWord =
            wordArray[Math.floor(Math.random() * (wordArray.length - 1))];
          solutionsRef.current = [
            ...solutionsRef.current,
            randomWord.toUpperCase().split(""),
          ];
        }
        setSolution(solutionsRef.current[0]);
        console.log("heloooo1: " + solutionsRef.current[0]);
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
    console.log("index: " + solutionIndexRef.current);
    if (solutionsRef.current[solutionIndexRef.current]) {
      solutionIndexRef.current++;
      setSolution(solutionsRef.current[solutionIndexRef.current]);
    }
  }, [restart]);

  return (
    <>
      <div style={{ color: "white" }}>{solution}</div>
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
    </>
  );
}

export default RoyaleGM;
