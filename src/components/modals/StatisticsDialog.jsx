import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import "../statistics/Statistics.css";
import Statistics from "../statistics/Statistics.jsx";
import BarChart from "../statistics/BarChart.jsx";
import { useUserData } from "../../hooks/useUserData.js";
import { useGameMode } from "../../hooks/useGameMode.js";
import { GameModes } from "../../enums/GameModes.js";
import { getIndex, getWinRate } from "../../utils/userDataUtils.js";
import LeaderBoard from "../statistics/LeaderBoard.jsx";
import { Carousel } from "react-bootstrap";
import "./StatisticsDialog.css";

function StatisticsDialog({ statsOpen, toggleStats }) {
  const [gameMode, setGameMode] = useState(GameModes.CLASSIC);
  const { userData, isLoading } = useUserData();
  const [currentSlide, setCurrentSlide] = useState(1);

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
                <Statistics.Index
                  value={getIndex(userData, gameMode)}
                  label={"index"}
                />
              </Statistics.Container>
              <Statistics.Container>
                <Statistics.Unit
                  value={userData?.statistics.gameModes[gameMode].gamesPlayed}
                  category={"Games played"}
                />
                <Statistics.Unit
                  value={getWinRate(userData, gameMode) + "%"}
                  category={"Win rate"}
                />
                <Statistics.Unit
                  value={userData?.statistics.gameModes[gameMode].dailyStreak}
                  category={"Daily streak"}
                />
              </Statistics.Container>
              <Statistics.Container className={"flex-center"}>
                <div className="btn-group-container">
                  <button
                    onClick={() =>
                      currentSlide === 0 && setCurrentSlide(currentSlide + 1)
                    }
                    className={"distribution-btn"}
                  >
                    {gameMode === GameModes.CLASSIC
                      ? "Guess distribution"
                      : "Round distribution"}
                  </button>
                  <button
                    onClick={() =>
                      currentSlide === 1 && setCurrentSlide(currentSlide - 1)
                    }
                    className={"leaderboard-btn"}
                  >
                    Leaderboard
                  </button>
                  <div className={`highlight-bar slide-${currentSlide}`}></div>
                </div>
              </Statistics.Container>
              <Statistics.Container>
                <Carousel
                  style={{ aspectRatio: "2", flex: 2 }}
                  interval={null}
                  touch={true}
                  indicatorLabels={["Guess distribution", "Leaderboard"]}
                  controls={false}
                  indicators={false}
                  activeIndex={currentSlide}
                >
                  <Carousel.Item>
                    <LeaderBoard gameMode={gameMode} />
                  </Carousel.Item>
                  <Carousel.Item>
                    <BarChart
                      data={
                        gameMode === "classic"
                          ? userData?.statistics.gameModes[gameMode]
                              .gamesGuessed
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
                      <BarChart.Graph axis={"show"} layout={"vertical"} />
                    </BarChart>
                  </Carousel.Item>
                </Carousel>
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
