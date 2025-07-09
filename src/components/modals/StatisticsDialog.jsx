import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import ButtonToolbar from "react-bootstrap/ButtonToolbar";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../Firebase.jsx";

function StatisticsDialog(props) {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const docSnap = await getDoc(doc(db, "Users", auth.currentUser.uid));
      setUserData(docSnap.data());
    };

    fetchUserData();
  }, []);

  return (
    <>
      <Modal show={logInOpen} onHide={toggleLogIn}>
        <Modal.Header closeButton>
          <Container className="flex-center">
            <Modal.Title>Log in</Modal.Title>
          </Container>
        </Modal.Header>
        <Modal.Body>
          <div className={"flex-center"}>
            <ButtonGroup className="me-2" aria-label="First group">
              <Button>Classic</Button>
              <Button>Royale</Button>
            </ButtonGroup>
          </div>
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

export default StatisticsDialog;
