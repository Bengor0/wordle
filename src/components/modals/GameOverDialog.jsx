import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Container from "react-bootstrap/Container";

function GameOverDialog({
  gameMode,
  gameResult,
  setGameResult,
  toggleRestart,
  togglePlayWordle,
}) {
  return (
    <>
      <Modal
        show={gameResult}
        onHide={() => setGameResult("")}
        backdrop="static"
      >
        <Modal.Header closeButton>
          <Container className="flex-center">
            <Modal.Title>Game over</Modal.Title>
          </Container>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <h1>Hello</h1>
          </Container>
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
