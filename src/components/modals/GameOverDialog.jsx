import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Container from "react-bootstrap/Container";
import React from "react";
import { useGameMode } from "../../hooks/useGameMode.js";
import { GameModes } from "../../enums/GameModes.js";

function GameOverDialog({
  showDialog,
  setGameResult,
  toggleRestart,
  togglePlayWordle,
  solution,
}) {
  const { gameMode } = useGameMode();
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
        <Modal.Body></Modal.Body>
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
            {gameMode === GameModes.PRACTICE && (
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
