import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../Firebase.jsx";
import StatIndex from "../statistics/StatIndex.jsx";
import StatUnit from "../statistics/StatUnit.jsx";
import "../../styles/Statistics.css";
import useToggleGameMode from "../../hooks/useToggleGameMode.js";
import { FaLock } from "react-icons/fa";
import Statistics from "../statistics/Statistics.jsx";
import BarChart from "../statistics/BarChart.jsx";

function StatisticsDialog({ statsOpen, toggleStats, userData }) {
  const [gameMode, toggleGameMode] = useToggleGameMode(true);

  const getIndex = () => {
    const sum = userData?.statistics.gameModes[gameMode].gamesGuessed.reduce(
      (total, value, index) => total + value * (index + 1),
    );

    return (
      Math.round(
        (sum / userData?.statistics.gameModes[gameMode].gamesPlayed) * 10,
      ) / 10
    );
  };

  const getWinRate = () => {
    return Math.round(
      (userData?.statistics.gameModes[gameMode].gamesGuessed.reduce(
        (total, value) => total + value,
      ) /
        userData?.statistics.gameModes[gameMode].gamesPlayed) *
        100,
    );
  };

  return (
    <>
      <Modal show={statsOpen} onHide={toggleStats}>
        <Modal.Header closeButton>
          <Container className="flex-center">
            <Modal.Title>{gameMode}</Modal.Title>
          </Container>
        </Modal.Header>
        <Modal.Body>
          <div className="c-1 flex-center">
            <ButtonGroup className="me-2" aria-label="First group">
              <Button
                onClick={() => {
                  if (gameMode === "royale") {
                    toggleGameMode();
                  }
                }}
              >
                Classic
              </Button>
              <Button
                onClick={() => {
                  if (gameMode === "classic") {
                    toggleGameMode();
                  }
                }}
              >
                Royale
              </Button>
            </ButtonGroup>
          </div>
          {userData?.statistics.gameModes[gameMode].gamesPlayed >= 5 ? (
            <Statistics>
              <Statistics.Container>
                <Statistics.Index value={getIndex()} label={"index"} />
              </Statistics.Container>
              <Statistics.Container>
                <Statistics.Unit
                  value={userData?.statistics.gameModes[gameMode].gamesPlayed}
                  category={"Games played"}
                />
                <Statistics.Unit
                  value={getWinRate() + "%"}
                  category={"Win rate"}
                />
                <Statistics.Unit
                  value={userData?.statistics.gameModes[gameMode].dailyStreak}
                  category={"Daily streak"}
                />
              </Statistics.Container>
              <Statistics.Container>
                <BarChart
                  data={
                    gameMode === "classic"
                      ? userData?.statistics.gameModes[gameMode].gamesGuessed
                      : userData?.statistics.gameModes[
                          gameMode
                        ].gamesGuessed.toReversed()
                  }
                  categories={
                    gameMode === "classic"
                      ? [1, 2, 3, 4, 5, 6]
                      : [5, 4, 3, 2, 1]
                  }
                >
                  <BarChart.Header>
                    {gameMode === "classic"
                      ? "GUESS DISTRIBUTION"
                      : "ROUND DISTRIBUTION"}
                  </BarChart.Header>
                  <BarChart.Graph axis={"show"} layout={"vertical"} />
                </BarChart>
              </Statistics.Container>
            </Statistics>
          ) : (
            <div className="stats-lock flex-center">
              <FaLock className="lock-svg" />
              <div className="lock-message">
                {userData
                  ? `Play ${5 - userData?.statistics.gameModes[gameMode].gamesPlayed} more ${
                      5 -
                        userData?.statistics.gameModes[gameMode].gamesPlayed ===
                      1
                        ? "game."
                        : "games."
                    }`
                  : "Log in to see your stats."}
              </div>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer className="flex-center"></Modal.Footer>
      </Modal>
    </>
  );
}

export default StatisticsDialog;
