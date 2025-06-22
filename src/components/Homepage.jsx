import { useState } from "react";
import Wordle from "../Wordle";
import SignInForm from "./modals/SignUpDialog.jsx";
import useToggleState from "../hooks/useToggleState";

import ".././styles/Homepage.css";
import { Button } from "react-bootstrap";

const Homepage = ({ setPlayWordle }) => {
  return (
    <Button variant="primary" onClick={() => setPlayWordle(true)}>
      Play worlde
    </Button>
  );
};

export default Homepage;
