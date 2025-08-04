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
import { useAuth } from "../hooks/useAuth.js";
import { useGameMode } from "../hooks/useGameMode.js";
import { GameModes } from "../enums/GameModes.js";
import { useDarkMode } from "../hooks/useDarkMode.js";

function Navigation({
  toggleLogIn,
  playWordle,
  togglePlayWordle,
  toggleStats,
}) {
  const { currentUser } = useAuth();
  const { setGameMode } = useGameMode();
  const { darkMode } = useDarkMode();
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
                <IoStatsChart
                  size="50%"
                  className={`stats-icon`}
                  onClick={() => {
                    if (currentUser) {
                      setGameMode(GameModes.CLASSIC);
                      toggleStats();
                    } else {
                      toast.error("Log in to see stats");
                    }
                  }}
                />
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
              <DarkModeButton />
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default Navigation;
