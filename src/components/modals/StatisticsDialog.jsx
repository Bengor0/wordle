import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../Firebase.jsx";
import IndexWindow from "../statistics/IndexWindow.jsx";
import StatWindow from "../statistics/StatWindow.jsx";
import BarChart from "../statistics/BarChart.jsx";
import "../../styles/Statistics.css";
import useToggleGameMode from "../../hooks/useToggleGameMode.js";
import { FaLock } from "react-icons/fa";

function StatisticsDialog({ statsOpen, toggleStats }) {
  const [userData, setUserData] = useState(null);
  const [gameState, setGameState] = useState(null);
  const [gameMode, toggleGameMode] = useToggleGameMode(true);

  useEffect(() => {
    const fetchUserData = async () => {
      const docSnap = await getDoc(doc(db, "Users", auth.currentUser.uid));
      setUserData(docSnap.data());
      setGameState(docSnap.data().statistics.gameModes);
    };

    fetchUserData();
  }, [statsOpen]);

  const getIndex = () => {
    const sum = gameState?.[`${gameMode}GM`].gamesGuessed.reduce(
      (total, value, index) => total + value * (index + 1),
    );

    return (
      Math.round((sum / gameState?.[`${gameMode}GM`].gamesPlayed) * 10) / 10
    );
  };

  const getWinRate = () => {
    return Math.round(
      (gameState?.[`${gameMode}GM`].gamesGuessed.reduce(
        (total, value) => total + value,
      ) /
        gameState?.[`${gameMode}GM`].gamesPlayed) *
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
          {gameState?.[`${gameMode}GM`].gamesPlayed >= 5 ? (
            <div className="stats-grid">
              <div className="c-2">
                <IndexWindow value={getIndex()} label={"index"} />
              </div>
              <div className="c-3">
                <StatWindow
                  value={gameState?.[`${gameMode}GM`].gamesPlayed}
                  category={"Games played"}
                />
              </div>
              <div className="c-4">
                <StatWindow value={getWinRate() + "%"} category={"Win rate"} />
              </div>
              <div className="c-5">
                <StatWindow value={5} category={"Daily streak"} />
              </div>
              <div className="c-6">
                <BarChart
                  data={
                    gameMode === "classic"
                      ? gameState?.[`${gameMode}GM`].gamesGuessed
                      : gameState?.[`${gameMode}GM`].gamesGuessed.toReversed()
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
              </div>
              <div className="leader-board"></div>
            </div>
          ) : (
            <div className="stats-lock flex-center">
              <FaLock className="lock-svg" />
              <div className="lock-message">
                Play {5 - gameState?.[`${gameMode}GM`].gamesPlayed} more{" "}
                {5 - gameState?.[`${gameMode}GM`].gamesPlayed === 1
                  ? "game."
                  : "games."}
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
