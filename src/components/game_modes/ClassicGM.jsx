import Wordle from "../Wordle.jsx";
import { useEffect, useRef, useState } from "react";
import useToggleState from "../../hooks/useToggleState.js";

const API_URL =
  "https://raw.githubusercontent.com/Bengor0/wordle-words-API/refs/heads/main/wordle-wordbank.json";

import React from "react";
import GameOverDialog from "../modals/GameOverDialog.jsx";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../Firebase.jsx";

function ClassicGM({
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
}) {
  const [solution, setSolution] = useState([]);
  const solutionRef = useRef([]);
  const [restart, toggleRestart] = useToggleState(false);
  const wordSet = useRef(new Set());
  const [gameResult, setGameResult] = useState("");

  useEffect(() => {
    const fetchWords = async () => {
      try {
        rowIndex.current = 0;
        let docSnap = await getDoc(doc(db, "wordleWords", "wordBank"));
        let docData = docSnap.data();
        wordSet.current = new Set(docData.allWords);
        docSnap = await getDoc(doc(db, "wordleWords", "dailyWords"));
        docData = docSnap.data();
        const classicWord = docData.classicWord;
        setSolution(classicWord.toUpperCase().split(""));
        solutionRef.current = classicWord.toUpperCase().split("");
        console.log(solutionRef.current.join(""));
      } catch (error) {
        console.error(error);
      }
    };

    fetchWords();
  }, [restart]);

  return (
    <>
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
        baseColors={baseColors}
        gameResult={gameResult}
        setGameResult={setGameResult}
        wordLength={wordLength}
        numOfGuesses={numOfGuesses}
      />
      <GameOverDialog
        gameMode={gameMode}
        showDialog={gameResult}
        setGameResult={setGameResult}
        toggleRestart={toggleRestart}
        togglePlayWordle={togglePlayWordle}
        solution={solution}
      />
    </>
  );
}

export default ClassicGM;
