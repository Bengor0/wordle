import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import DarkModeButton from "./DarkModeButton";
import Button from "react-bootstrap/Button";
import { IoStatsChart } from "react-icons/io5";
import { IoHelpCircleOutline } from "react-icons/io5";
import ".././styles/Navigation.css";

function Navigation({ darkMode, toggleDarkMode, toggleOpenLogInDialog }) {
  return (
    <Navbar className={`custom-navbar ${darkMode}`}>
      <Container>
        <Navbar.Brand className={`nav-brand ${darkMode}`} href="#home">
          Wordle
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavDropdown title="Mode" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Classic</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Royale</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Practice</NavDropdown.Item>
            </NavDropdown>
            <Container className="stats flex-center">
              <IoStatsChart  size="50%" className={`stats-icon ${darkMode}`}/>
            </Container>
            <Container className="stats flex-center">
              <IoHelpCircleOutline size="60%" className={`info-icon ${darkMode}`}/>
            </Container>

            <Button variant="primary" onClick={toggleOpenLogInDialog}>
              Log in
            </Button>
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
