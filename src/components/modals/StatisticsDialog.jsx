import React, { useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import "../../styles/Statistics.css";
import Statistics from "../statistics/Statistics.jsx";
import BarChart from "../statistics/BarChart.jsx";
import { useUserData } from "../../hooks/useUserData.js";
import { useGameMode } from "../../hooks/useGameMode.js";
import { GameModes } from "../../enums/GameModes.js";

function StatisticsDialog({ statsOpen, toggleStats }) {
  const { gameMode, setGameMode } = useGameMode();
  const { userData, isLoading } = useUserData();

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
      {gameMode !== GameModes.PRACTICE && (
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
                    setGameMode(GameModes.CLASSIC);
                  }}
                >
                  Classic
                </Button>
                <Button
                  onClick={() => {
                    setGameMode(GameModes.ROYALE);
                  }}
                >
                  Royale
                </Button>
              </ButtonGroup>
            </div>
            <Statistics gameModeData={userData?.statistics.gameModes[gameMode]}>
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
                    gameMode === GameModes.CLASSIC
                      ? [1, 2, 3, 4, 5, 6]
                      : [5, 4, 3, 2, 1]
                  }
                >
                  <BarChart.Header>
                    {gameMode === GameModes.CLASSIC
                      ? "GUESS DISTRIBUTION"
                      : "ROUND DISTRIBUTION"}
                  </BarChart.Header>
                  <BarChart.Graph axis={"show"} layout={"vertical"} />
                </BarChart>
              </Statistics.Container>
              {userData?.statistics.gameModes[gameMode].gamesPlayed < 5 && (
                <Statistics.StatLock
                  gamesPlayed={
                    userData?.statistics.gameModes[gameMode].gamesPlayed
                  }
                />
              )}
            </Statistics>
          </Modal.Body>
          <Modal.Footer className="flex-center"></Modal.Footer>
        </Modal>
      )}
    </>
  );
}

export default StatisticsDialog;
