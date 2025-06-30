import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import DarkModeButton from "./DarkModeButton";
import Button from "react-bootstrap/Button";
import { IoStatsChart } from "react-icons/io5";
import { IoHelpCircleOutline } from "react-icons/io5";
import ".././styles/Navigation.css";
import { auth } from "./Firebase.jsx";
import { signOut } from "firebase/auth";
import { toast, Toaster } from "sonner";

function Navigation({
  darkMode,
  toggleDarkMode,
  toggleLogIn,
  currentUser,
  playWordle,
  togglePlayWordle,
}) {
  const handleLogout = async () => {
    try {
      await signOut(auth);
      window.location.reload();
    } catch (error) {
      console.error("Error signing out:", error.message);
      toast.error(error.message);
    }
  };

  return (
    <>
      <Toaster richColors position="top-center" />
      <Navbar className={darkMode}>
        <Container>
          <Navbar.Brand
            className={`nav-brand`}
            onClick={() => playWordle && togglePlayWordle()}
          >
            Wordle
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Container className="stats flex-center">
                <IoStatsChart size="50%" className={`stats-icon`} />
              </Container>
              <Container className="info flex-center">
                <IoHelpCircleOutline size="60%" className={`info-icon`} />
              </Container>
              {currentUser ? (
                <Container className="button flex-center">
                  <Button
                    variant="primary"
                    onClick={handleLogout}
                    style={{ fontSize: "12px", width: "60px" }}
                  >
                    Log out
                  </Button>
                </Container>
              ) : (
                <Container className="button flex-center">
                  <Button
                    variant="primary"
                    onClick={toggleLogIn}
                    style={{ fontSize: "12px", width: "60px" }}
                  >
                    Log in
                  </Button>
                </Container>
              )}
              <DarkModeButton toggleDarkMode={toggleDarkMode} />
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default Navigation;
