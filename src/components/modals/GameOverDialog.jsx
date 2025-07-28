import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Container from "react-bootstrap/Container";
import Statistics from "../statistics/Statistics.jsx";
import BarChart from "../statistics/BarChart.jsx";
import React from "react";

function GameOverDialog({
  gameMode,
  showDialog,
  setGameResult,
  toggleRestart,
  togglePlayWordle,
  solution,
}) {
  return (
    <>
      <Modal
        show={showDialog}
        onHide={() => setGameResult("")}
        backdrop="static"
      >
        <Modal.Header closeButton>
          <Container className="flex-center">
            <Modal.Title>
              <h1>{solution}</h1>
            </Modal.Title>
          </Container>
        </Modal.Header>
        <Modal.Body>
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
                  gameMode === "classic" ? [1, 2, 3, 4, 5, 6] : [5, 4, 3, 2, 1]
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
            {userData?.statistics.gameModes[gameMode].gamesPlayed < 5 && (
              <Statistics.StatLock
                gamesPlayed={
                  userData?.statistics.gameModes[gameMode].gamesPlayed
                }
              />
            )}
          </Statistics>
        </Modal.Body>
        <Modal.Footer className="flex-center">
          <Container>
            <Button
              onClick={() => {
                setGameResult("");
                togglePlayWordle();
              }}
            >
              Go home
            </Button>
            {gameMode === "practice" && (
              <Button
                onClick={() => {
                  setGameResult("");
                  toggleRestart();
                }}
              >
                Play again
              </Button>
            )}
          </Container>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default GameOverDialog;
