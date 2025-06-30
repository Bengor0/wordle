import { use, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Container from "react-bootstrap/Container";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../Firebase.jsx";
import { toast, Toaster } from "sonner";
import { getDoc, doc } from "firebase/firestore";

function LogInDialog({ logInOpen, toggleLogIn, toggleSignUp }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("User logged in.");
      toast.success("Logged in.");
      toggleLogIn();
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  return (
    <>
      <Toaster richColors position="top-center" />
      <Modal show={logInOpen} onHide={toggleLogIn}>
        <Modal.Header closeButton>
          <Container className="flex-center">
            <Modal.Title>Log in</Modal.Title>
          </Container>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={(e) => handleSubmit(e)}>
            <Form.Group className="mb-3" controlId="email-input">
              <Form.Label>Email</Form.Label>
              <Form.Control
                autoFocus
                required
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="password-input">
              <Form.Label>Password</Form.Label>
              <Form.Control
                required
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
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
                toggleLogIn();
                toggleSignUp();
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
