import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Container from "react-bootstrap/Container";

function LogInDialog({ openLogIn, toggleOpenLogIn, toggleOpenSignUp }) {

  return (
    <>
      <Modal show={openLogIn} onHide={toggleOpenLogIn}>
        <Modal.Header closeButton>
          <Container className="flex-center">
            <Modal.Title>Log in</Modal.Title>
          </Container>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="nickname-input">
              <Form.Label>Nickname</Form.Label>
              <Form.Control required type="text" autoFocus />
            </Form.Group>
            <Form.Group className="mb-3" controlId="password-input">
              <Form.Label>Password</Form.Label>
              <Form.Control required ype="password" />
            </Form.Group>
            <Button variant="primary" type="submit">
              Log in
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer className="flex-center">
          <Container className="flex-center">
            <h5>OR</h5>
          </Container>
          <Container className="flex-center">
            <Button
              variant="primary"
              onClick={() => {
                toggleOpenLogIn();
                toggleOpenSignUp();
              }}
            >
              Sign up
            </Button>
          </Container>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default LogInDialog;
