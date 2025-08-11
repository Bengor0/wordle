import Classic from "../game_modes/Classic.jsx";
import Royale from "../game_modes/Royale.jsx";
import Practice from "../game_modes/Practice.jsx";

import React, { useEffect, useRef, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUserData } from "../../utils/firestoreUtils.js";
import { useAuth } from "../../hooks/useAuth.js";
import { useGameMode } from "../../hooks/useGameMode.js";
import { useUserData } from "../../hooks/useUserData.js";
import { GameModes } from "../../enums/GameModes.js";

const BASE_COLORS = ["black", "black", "black", "black", "black"];

function Game(props) {
  const { currentUser } = useAuth();
  const { userData } = useUserData();
  const { gameMode } = useGameMode();
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
  const dailyStreak = useRef(false);
  const queryClient = useQueryClient();
  const { mutateAsync: mutateUserData } = useMutation({
    mutationFn: async (newData) => {
      return updateUserData(currentUser.uid, newData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["user", currentUser?.uid],
      });
    },
  });

  useEffect(() => {
    const loadGameState = () => {
      const currentMode = userData?.statistics.gameModes[gameMode];
      if (gameMode === GameModes.ROYALE) {
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

    gameMode !== GameModes.PRACTICE && loadGameState();
  }, []);

  useEffect(() => {
    const loadData = () => {
      setGuesses(
        userData?.statistics.gameModes.royale.currentState.roundStates[
          gameRound.current - 1
        ].guesses,
      );
      setKeyColors(
        new Map(
          Object.entries(
            userData?.statistics.gameModes.royale.currentState.roundStates[
              gameRound.current - 1
            ].keyColors,
          ),
        ),
      );
    };

    gameMode === "royale" && loadData();
  }, [gameRound.current]);

  useEffect(() => {
    const updateUserData = async () => {
      const updatedUserData = { ...userData };
      if (gameMode === GameModes.CLASSIC) {
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
      gameMode !== "practice" &&
      guesses[0].word !== "" &&
      !!userData &&
      !userData?.statistics.gameModes[gameMode].finishedToday
    ) {
      updateUserData();
    }
  }, [keyColors]);

  return (
    <>
      {gameMode === GameModes.CLASSIC && (
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
      {gameMode === GameModes.ROYALE && (
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
      {gameMode === GameModes.PRACTICE && (
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
