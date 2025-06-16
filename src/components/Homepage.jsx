import { useState } from "react";
import Wordle from "../Wordle";
import SignInForm from "./SignUpDialog";
import useToggleState from "../hooks/useToggleState";

import '.././styles/Homepage.css'

const Homepage = ({setPlayWordle}) => {

  return  (
  <button id="play-wordle-btn" onClick={() => setPlayWordle(true)}>Play Wordle</button>)
}
 
export default Homepage;
