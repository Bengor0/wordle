import ".././styles/Homepage.css";
import React from "react";
import GameModeSelector from "./GameModeSelector.jsx";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "./Firebase.jsx";
import { words } from "./words.js";

function Homepage({ togglePlayWordle }) {
  return (
    <div className="homepage flex-center">
      <GameModeSelector togglePlayWordle={togglePlayWordle} />
    </div>
  );
}

export default Homepage;
