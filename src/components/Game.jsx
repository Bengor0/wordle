import Classic from "./game_modes/Classic.jsx";
import Royale from "./game_modes/Royale.jsx";
import Practice from "./game_modes/Practice.jsx";

import React, { useEffect, useRef, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUserData } from "../utils/firestoreUtils.js";

const BASE_COLORS = ["black", "black", "black", "black", "black"];

function Game(props) {
  const [guesses, setGuesses] = useState(
    new Array(6).fill({
      word: "",
      colors: BASE_COLORS,
    }),
  );
  const [roundGuesses, setRoundGuesses] = useState(null);
  const [keyColors, setKeyColors] = useState(new Map());
  const rowIndex = useRef(0);
  const gameRound = useRef(1);
  const [gameResult, setGameResult] = useState("");
  const dailyStreak = useRef(false);
  const queryClient = useQueryClient();
  const { mutateAsync: mutateUserData } = useMutation({
    mutationFn: async (newData) => {
      return updateUserData(props.currentUser.uid, newData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["user", props.currentUser?.uid],
      });
    },
  });

  useEffect(() => {
    const loadGameState = () => {
      const currentMode = props.userData?.statistics.gameModes[props.gameMode];
      if (props.gameMode === "royale") {
        setGuesses([
          ...currentMode.currentState.roundStates[
            currentMode.currentState.gameRound - 1
          ].guesses,
        ]);
        setKeyColors(
          new Map(
            Object.entries(
              currentMode.currentState.roundStates[
                currentMode.currentState.gameRound - 1
              ].keyColors,
            ),
          ),
        );
        rowIndex.current =
          currentMode.currentState.roundStates[
            currentMode.currentState.gameRound - 1
          ].rowIndex;
        gameRound.current = currentMode.currentState.gameRound;
      } else {
        setGuesses([...currentMode.currentState.guesses]);
        setKeyColors(
          new Map(Object.entries(currentMode.currentState.keyColors)),
        );
        rowIndex.current = currentMode.currentState.rowIndex;
      }
      console.log("Game state loaded.");
    };

    props.gameMode !== "practice" && loadGameState();
  }, []);

  useEffect(() => {
    const loadData = () => {
      setGuesses(
        props.userData?.statistics.gameModes.royale.currentState.roundStates[
          gameRound.current - 1
        ].guesses,
      );
      setKeyColors(
        new Map(
          Object.entries(
            props.userData?.statistics.gameModes.royale.currentState
              .roundStates[gameRound.current - 1].keyColors,
          ),
        ),
      );
    };

    props.gameMode === "royale" && loadData();
  }, [gameRound.current]);

  useEffect(() => {
    const updateUserData = async () => {
      const updatedUserData = { ...props.userData };
      if (props.gameMode === "classic") {
        updatedUserData.statistics.gameModes.classic.playedToday = true;
        updatedUserData.statistics.gameModes.classic.currentState.guesses =
          guesses;
        updatedUserData.statistics.gameModes.classic.currentState.keyColors =
          Object.fromEntries(keyColors);
        updatedUserData.statistics.gameModes.classic.currentState.rowIndex =
          rowIndex.current;
      } else {
        updatedUserData.statistics.gameModes.royale.playedToday = true;
        updatedUserData.statistics.gameModes.royale.currentState.roundStates[
          gameRound.current - 1
        ].guesses = guesses;
        updatedUserData.statistics.gameModes.royale.currentState.roundStates[
          gameRound.current - 1
        ].keyColors = Object.fromEntries(keyColors);
        updatedUserData.statistics.gameModes.royale.currentState.roundStates[
          gameRound.current - 1
        ].rowIndex = rowIndex.current;
        updatedUserData.statistics.gameModes.royale.currentState.gameRound =
          gameRound.current;
      }
      try {
        await mutateUserData(updatedUserData);
      } catch (e) {
        console.log(e.message);
      }
    };

    if (
      props.gameMode !== "practice" &&
      guesses[0].word !== "" &&
      !!props.userData &&
      !props.userData?.statistics.gameModes[props.gameMode].finishedToday
    ) {
      updateUserData();
    }
  }, [keyColors]);

  return (
    <>
      {props.gameMode === "classic" && (
        <Classic
          {...props}
          guesses={guesses}
          setGuesses={setGuesses}
          keyColors={keyColors}
          setKeyColors={setKeyColors}
          rowIndex={rowIndex}
          baseColors={BASE_COLORS}
          dailyStreak={dailyStreak}
          gameResult={gameResult}
          setGameResult={setGameResult}
          mutateUserData={mutateUserData}
        />
      )}
      {props.gameMode === "royale" && (
        <Royale
          {...props}
          guesses={guesses}
          setGuesses={setGuesses}
          keyColors={keyColors}
          setKeyColors={setKeyColors}
          rowIndex={rowIndex}
          gameRound={gameRound}
          baseColors={BASE_COLORS}
          gameResult={gameResult}
          setGameResult={setGameResult}
          mutateUserData={mutateUserData}
        />
      )}
      {props.gameMode === "practice" && (
        <Practice
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
