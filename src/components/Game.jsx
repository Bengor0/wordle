import ClassicGM from "./game_modes/ClassicGM";
import RoyaleGM from "./game_modes/RoyaleGM";
import PracticeGM from "./game_modes/PracticeGM";

import React, { useEffect, useRef, useState } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "./Firebase.jsx";

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
  const userData = useRef(null);
  const gameModes = useRef(null);

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
        gameModes.current = userData.current.statistics.gameModes;
        switch (props.gameMode) {
          case "royale":
            if (
              gameModes.current.royaleGM.playedToday &&
              !gameModes.current.royaleGM.finishedToday
            ) {
              setGuesses([...gameModes.current.royaleGM.currentState.guesses]);
              setKeyColors(
                new Map(
                  Object.entries(
                    gameModes.current.royaleGM.currentState.keyColors,
                  ),
                ),
              );
              rowIndex.current =
                gameModes.current.royaleGM.currentState.rowIndex;
            }
            break;
          case "classic":
            if (
              gameModes.current.classicGM.playedToday &&
              !gameModes.current.classicGM.finishedToday
            ) {
              setGuesses([...gameModes.current.classicGM.currentState.guesses]);
              setKeyColors(
                new Map(
                  Object.entries(
                    gameModes.current.classicGM.currentState.keyColors,
                  ),
                ),
              );
              rowIndex.current =
                gameModes.current.classicGM.currentState.rowIndex;
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
      const docRef = doc(db, "Users", props.currentUser.uid);
      switch (props.gameMode) {
        case "royale":
          try {
            await updateDoc(docRef, {
              "statistics.gameModes.royaleGM.playedToday": true,
              "statistics.gameModes.royaleGM.currentState.guesses": guesses,
              "statistics.gameModes.royaleGM.currentState.keyColors":
                Object.fromEntries(keyColors),
              "statistics.gameModes.royaleGM.currentState.rowIndex":
                rowIndex.current,
              "statistics.gameModes.royaleGM.currentState.gameRound":
                gameRound.current,
            });
            console.log("User data updated.");
          } catch (e) {
            console.log(e.message);
          }
          break;
        case "classic":
          try {
            await updateDoc(docRef, {
              "statistics.gameModes.classicGM.playedToday": true,
              "statistics.gameModes.classicGM.currentState.guesses": guesses,
              "statistics.gameModes.classicGM.currentState.keyColors":
                Object.fromEntries(keyColors),
              "statistics.gameModes.classicGM.currentState.rowIndex":
                rowIndex.current,
            });
            console.log("User data updated.");
          } catch (e) {
            console.log(e.message);
          }
      }
    };

    if (rowIndex.current !== 0 && props.gameMode !== "practice") {
      updateUserData();
    }
  }, [rowIndex.current]);

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
