import Wordle from "../Wordle.jsx";
import { useEffect, useRef, useState } from "react";
import useToggleState from "../../hooks/useToggleState.js";
import React from "react";
import GameOverDialog from "../modals/GameOverDialog.jsx";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../Firebase.jsx";

function Classic({
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
  userData,
  gameResult,
  setGameResult,
  mutateUserData,
}) {
  const [solution, setSolution] = useState([]);
  const solutionRef = useRef([]);
  const [restart, toggleRestart] = useToggleState(false);
  const wordSet = useRef(new Set());

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

  useEffect(() => {
    const updateUserData = async () => {
      const updatedUserData = { ...userData };
      updatedUserData.statistics.gameModes.classic.finishedToday = true;
      updatedUserData.statistics.gameModes.classic.gamesPlayed++;
      if (gameResult === "guessed") {
        updatedUserData.statistics.gameModes.classic.gamesGuessed[
          rowIndex.current - 1
        ]++;
      }
      try {
        await mutateUserData(updatedUserData);
      } catch (e) {
        console.error(e);
      }
    };

    gameResult && updateUserData();
  }, [gameResult]);

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
        userData={userData}
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

export default Classic;
