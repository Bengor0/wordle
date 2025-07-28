import React, { useEffect, useRef, useState } from "react";
import Accordion from "react-bootstrap/Accordion";
import "../styles/GameModeSelector.css";
import { FaPlay } from "react-icons/fa";
import { toast, Toaster } from "sonner";

const GAME_MODES = ["practice", "classic", "royale"];

function GameModeSelector({
  togglePlayWordle,
  gameMode,
  setGameMode,
  className = "",
  currentUser,
}) {
  const [gameModes, setGameModes] = useState(GAME_MODES);
  const [changedMode, setChangedMode] = useState(gameMode);
  const accordionRef = useRef(null);
  const [collapse, setCollapse] = useState(false);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (accordionRef.current && !accordionRef.current.contains(e.target)) {
        setCollapse(false);
      }
    };

    document.addEventListener("mousedown", (e) => handleClickOutside(e));

    return () =>
      document.addEventListener("mousedown", (e) => handleClickOutside(e));
  }, []);

  return (
    <>
      <Toaster richColors position="top-center" />
      <div className={`game-mode-selector ${className}`}>
        <div className={"play-btn flex-center"} onClick={togglePlayWordle}>
          <FaPlay />
        </div>
        <Accordion
          activeKey={"true"}
          className={`game-mode`}
          ref={accordionRef}
        >
          <Accordion.Item
            eventKey={String(collapse)}
            style={{ borderTopLeftRadius: "0", borderBottomLeftRadius: "0" }}
          >
            <Accordion.Header
              onClick={() => {
                collapse ? setCollapse(false) : setCollapse(true);
              }}
            >
              <span className="current-mode">{changedMode.toUpperCase()}</span>
            </Accordion.Header>
            <Accordion.Body onExited={() => setGameMode(changedMode)}>
              <ol>
                {gameModes.map((mode, index) =>
                  mode === gameMode ? null : (
                    <li
                      className={`selector-list ${index + 1 === gameModes.length && "last"}`}
                      key={index}
                      onClick={() => {
                        if (currentUser || mode === "practice") {
                          setCollapse(false);
                          setChangedMode(mode);
                        } else toast.warning("Log in to play.");
                      }}
                    >
                      <span className="mode">{mode.toUpperCase()}</span>
                    </li>
                  ),
                )}
              </ol>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </div>
    </>
  );
}

export default GameModeSelector;
