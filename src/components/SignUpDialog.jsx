import { useRef, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Container from "react-bootstrap/Container";

function SignUpDialog({ openSignUp, toggleOpenSignUp }) {
  const nicknameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const repeatPasswordRef = useRef(null);

  const handleSignUp = () => {

  }

  const isNicknameAvailable = () => {

  }

  const isEmailAvailable = () => {

  }

  const passwordsMatch = () => {
    return passwordRef.current.value === repeatPasswordRef.current.value;
  }

  return (
    <>
      <Modal show={openSignUp} onHide={toggleOpenSignUp} backdrop="static">
        <Modal.Header closeButton>
          <Container className="flex-center">
            <Modal.Title>Sign up</Modal.Title>
          </Container>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="nickname-input">
              <Form.Label>Nickname</Form.Label>
              <Form.Control required type="text" autoFocus ref={nicknameRef} placeholder="example123"/>
            </Form.Group>
            <Form.Group required className="mb-3" controlId="email-input">
              <Form.Label>Email address</Form.Label>
              <Form.Control required type="email" ref={emailRef} placeholder="name@example.com"/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="password-input">
              <Form.Label>Password</Form.Label>
              <Form.Control required type="password" ref={passwordRef} placeholder="PasswordExample123?!"/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="repeat-password-input">
              <Form.Label>Repeat password</Form.Label>
              <Form.Control required type="password" ref={repeatPasswordRef} placeholder="PasswordExample123?!"/>
            </Form.Group>
            <Button variant="primary" type="submit">
              Sign up
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
                console.log("Hello");
                toggleOpenSignUp();
              }}
            >
              Continue with Google
            </Button>
          </Container>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default SignUpDialog;
