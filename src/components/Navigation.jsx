import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import DarkModeButton from "./DarkModeButton";
import Button from "react-bootstrap/Button";
import { IoStatsChart } from "react-icons/io5";
import { IoHelpCircleOutline } from "react-icons/io5";
import ".././styles/Navigation.css";

function Navigation({
  darkMode,
  toggleDarkMode,
  toggleLogIn,
  userData,
  setUserData,
  setGameMode,
}) {
  return (
    <Navbar className={`custom-navbar ${darkMode}`}>
      <Container>
        <Navbar.Brand className={`nav-brand ${darkMode}`} href="#home">
          Wordle
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavDropdown
              title="Mode"
              id="basic-nav-dropdown"
              className={darkMode}
            >
              <NavDropdown.Item onClick={() => setGameMode("Classic")}>
                Classic
              </NavDropdown.Item>
              <NavDropdown.Item onClick={() => setGameMode("Royale")}>
                Royale
              </NavDropdown.Item>
              <NavDropdown.Item onClick={() => setGameMode("Practice")}>
                Practice
              </NavDropdown.Item>
            </NavDropdown>
            <Container className="stats flex-center">
              <IoStatsChart size="50%" className={`stats-icon ${darkMode}`} />
            </Container>
            <Container className="info flex-center">
              <IoHelpCircleOutline
                size="60%"
                className={`info-icon ${darkMode}`}
              />
            </Container>
            {userData ? (
              <Container className="button flex-center">
                <Button
                  variant="primary"
                  onClick={() => setUserData(null)}
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
            <DarkModeButton
              darkMode={darkMode}
              toggleDarkMode={toggleDarkMode}
            />
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigation;
