import ClassicGM from "./game_modes/ClassicGM";
import RoyaleGM from "./game_modes/RoyaleGM";
import PracticeGM from "./game_modes/PracticeGM";

import React, { useEffect, useRef, useState } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "./Firebase.jsx";
import keyboard from "./Keyboard.jsx";

const BASE_COLORS = ["black", "black", "black", "black", "black"];

function Game(props) {
  const [guesses, setGuesses] = useState(
    new Array(6).fill({
      word: "",
      colors: BASE_COLORS,
    }),
  );
  const [keyColors, setKeyColors] = useState(new Map());
  const rowIndex = useRef(0);
  const gameRound = useRef(1);
  const [gameResult, setGameResult] = useState("");
  const userData = useRef(null);
  const gameModes = useRef(null);
  const dailyStreak = useRef(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const docRef = doc(db, "Users", props.currentUser.uid);
        const docSnap = await getDoc(docRef);
        console.log("User data fetched.");
        return docSnap.data();
      } catch (e) {
        console.log(e.message);
      }
    };

    const loadGameState = async () => {
      try {
        userData.current = await fetchUserData();
        const currentGM =
          userData.current.statistics.gameModes[`${props.gameMode}GM`];
        if (currentGM.playedToday) {
          setGuesses([...currentGM.currentState.guesses]);
          setKeyColors(
            new Map(Object.entries(currentGM.currentState.keyColors)),
          );
          rowIndex.current = currentGM.currentState.rowIndex;
          if (props.gameMode === "royale") {
            gameRound.current = currentGM.currentState.gameRound;
          }
        }
        console.log("Game state loaded.");
      } catch (e) {
        console.log(e.message);
      }
    };

    props.gameMode !== "practice" && loadGameState();
  }, []);

  useEffect(() => {
    const updateUserData = async () => {
      console.log(gameRound.current);
      const docRef = doc(db, "Users", props.currentUser.uid);
      userData.current.statistics.gameModes[`${props.gameMode}GM`].playedToday =
        true;
      userData.current.statistics.gameModes[
        `${props.gameMode}GM`
      ].currentState.guesses = guesses;
      userData.current.statistics.gameModes[
        `${props.gameMode}GM`
      ].currentState.keyColors = Object.fromEntries(keyColors);
      userData.current.statistics.gameModes[
        `${props.gameMode}GM`
      ].currentState.rowIndex = rowIndex.current;
      if (props.gameMode === "royale") {
        userData.current.statistics.gameModes[
          `${props.gameMode}GM`
        ].currentState.gameRound = gameRound.current;
      }
      try {
        await updateDoc(docRef, userData.current);
        console.log("User data updated.");
      } catch (e) {
        console.log(e.message);
      }
    };

    if (
      props.gameMode !== "practice" &&
      guesses[0] !== "" &&
      userData.current
    ) {
      updateUserData();
    }
  }, [keyColors]);

  return (
    <>
      {props.gameMode === "classic" && (
        <ClassicGM
          {...props}
          guesses={guesses}
          setGuesses={setGuesses}
          keyColors={keyColors}
          setKeyColors={setKeyColors}
          rowIndex={rowIndex}
          baseColors={BASE_COLORS}
          userData={userData}
          dailyStreak={dailyStreak}
          gameResult={gameResult}
          setGameResult={setGameResult}
        />
      )}
      {props.gameMode === "royale" && (
        <RoyaleGM
          {...props}
          guesses={guesses}
          setGuesses={setGuesses}
          keyColors={keyColors}
          setKeyColors={setKeyColors}
          rowIndex={rowIndex}
          gameRound={gameRound}
          baseColors={BASE_COLORS}
          userData={userData}
          gameResult={gameResult}
          setGameResult={setGameResult}
        />
      )}
      {props.gameMode === "practice" && (
        <PracticeGM
          {...props}
          guesses={guesses}
          setGuesses={setGuesses}
          keyColors={keyColors}
          setKeyColors={setKeyColors}
          rowIndex={rowIndex}
          baseColors={BASE_COLORS}
        />
      )}
    </>
  );
}

export default Game;
