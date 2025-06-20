import { useRef, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Container from "react-bootstrap/Container";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "./Firebase";
import { setDoc, doc } from "firebase/firestore";
import { Toaster, toast } from "sonner";

function SignUpDialog({ signUpOpen, toggleSignUp }) {
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== rePassword) {
      console.log("Passwords dont match!");
      toast.warning("Passwords don't match!");
      return;
    } else if (password.length < 6) {
      console.log("Password needs to be at least 6 characters long!");
      toast.warning("Password is too short - at least 6 characters.");
      return;
    } else {
      try {
        await createUserWithEmailAndPassword(auth, email, password);
        const user = auth.currentUser;
        console.log(user);
        if (user) {
          await setDoc(doc(db, "Users", user.uid), {
            email: user.email,
            nickname: nickname,
            practicePlayed: 0,
            pracitceGuessed: 0,
            classicPlayed: 0,
            classicGuessed: 0,
            royalePlayed: 0,
            royaleScore: 0,
            achievements: [],
          });
        }
        toast.success("Signed up.")
        console.log("User registered successfully.");
        toggleSignUp();
      } catch (error) {
        console.log(error.message);
        toast(error.message);
      }
    }
  };

  return (
    <>
      <Toaster richColors position="top-center"/>
      <Modal show={signUpOpen} onHide={toggleSignUp} backdrop="static">
        <Modal.Header closeButton>
          <Container className="flex-center">
            <Modal.Title>Sign up</Modal.Title>
          </Container>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="nickname-input">
              <Form.Label>Nickname</Form.Label>
              <Form.Control
                required
                type="text"
                autoFocus
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                placeholder="example123"
              />
            </Form.Group>
            <Form.Group required className="mb-3" controlId="email-input">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="password-input">
              <Form.Label>Password</Form.Label>
              <Form.Control
                required
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="PasswordExample123?!"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="repeat-password-input">
              <Form.Label>Repeat password</Form.Label>
              <Form.Control
                required
                type="password"
                value={rePassword}
                onChange={(e) => setRePassword(e.target.value)}
                placeholder="PasswordExample123?!"
              />
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
                toggleSignUp();
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
