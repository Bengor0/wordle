import { use, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Container from "react-bootstrap/Container";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../Firebase.jsx";
import { toast, Toaster } from "sonner";
import { getDoc, doc } from "firebase/firestore";

function GameOverDialog({
  gameOverDialog,
  toggleGameOverDialog,
  togglePlayWordle,
}) {
  return (
    <>
      <Modal show={gameOverDialog} onHide={toggleGameOverDialog}>
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
                toggleGameOverDialog();
                togglePlayWordle();
              }}
            >
              Go home
            </Button>
          </Container>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default GameOverDialog;
