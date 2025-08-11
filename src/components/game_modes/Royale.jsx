import Wordle from "../wordle_game/Wordle.jsx";
import { useEffect, useRef, useState } from "react";
import useToggleState from "../../hooks/useToggleState.js";

import React from "react";
import GameOverDialog from "../modals/GameOverDialog.jsx";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../Firebase.jsx";
import { useUserData } from "../../hooks/useUserData.js";

function Royale({
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
  gameResult,
  setGameResult,
  mutateUserData,
}) {
  const { userData } = useUserData();
  const solutionsRef = useRef([]);
  const [solution, setSolution] = useState([]);
  const [restart, toggleRestart] = useToggleState(false);
  const wordSet = useRef(new Set());
  const [isGameOver, setIsGameOver] = useState(false);

  useEffect(() => {
    const fetchWords = async () => {
      try {
        let docSnap = await getDoc(doc(db, "wordleWords", "wordBank"));
        let docData = docSnap.data();
        wordSet.current = new Set(docData.allWords);
        docSnap = await getDoc(doc(db, "wordleWords", "dailyWords"));
        docData = docSnap.data();
        solutionsRef.current = docData.royaleWords;
        setSolution(
          solutionsRef.current[gameRound.current - 1].toUpperCase().split(""),
        );
        solutionsRef.current.forEach((solution) => console.log(solution));
      } catch (error) {
        console.error(error);
      }
    };

    fetchWords();
  }, []);

  useEffect(() => {
    if (gameResult) {
      if (gameResult !== "failed" && gameRound.current < numOfGuesses - 1) {
        if (crossedLine()) {
          setIsGameOver(true);
        } else {
          setSolution(
            solutionsRef.current[gameRound.current].toUpperCase().split(""),
          );
          gameRound.current++;
          setGameResult("");
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
  }, [gameResult]);

  useEffect(() => {
    const updateUserData = async () => {
      const updatedUserData = { ...userData };
      updatedUserData.statistics.gameModes.royale.finishedToday = true;
      updatedUserData.statistics.gameModes.royale.gamesPlayed++;
      updatedUserData.statistics.gameModes.royale.dailyStreak++;
      if (
        updatedUserData.statistics.gameModes.royale.dailyStreak >
        userData.statistics.gameModes.royale.dailyStreakMax
      ) {
        updatedUserData.statistics.gameModes.royale.dailyStreakMax =
          updatedUserData.statistics.gameModes.royale.dailyStreak;
      }
      if (gameResult === "guessed") {
        updatedUserData.statistics.gameModes.royale.gamesGuessed[
          gameRound.current - 1
        ]++;
      }
      try {
        mutateUserData(updatedUserData);
      } catch (e) {
        console.error(e);
      }
    };

    isGameOver && updateUserData();
  }, [isGameOver]);

  const crossedLine = () => {
    return gameRound.current + rowIndex.current > numOfGuesses;
  };

  return (
    <>
      <Wordle
        solution={solution}
        wordSet={wordSet}
        key={restart}
        rowIndex={rowIndex}
        guesses={guesses}
        setGuesses={setGuesses}
        keyColors={keyColors}
        setKeyColors={setKeyColors}
        gameResult={gameResult}
        setGameResult={setGameResult}
        wordLength={wordLength}
        numOfGuesses={numOfGuesses}
        highLight={numOfGuesses - gameRound.current}
        baseColors={baseColors}
      />
      <GameOverDialog
        showDialog={isGameOver}
        setGameResult={setGameResult}
        toggleRestart={toggleRestart}
        togglePlayWordle={togglePlayWordle}
        solution={solution}
      />
    </>
  );
}

export default Royale;
