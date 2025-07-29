import React, { useEffect, useRef, useState } from "react";
import Accordion from "react-bootstrap/Accordion";
import "../styles/GameModeSelector.css";
import { FaPlay } from "react-icons/fa";
import { toast, Toaster } from "sonner";
import { useGameMode } from "../hooks/useGameMode.js";
import { useAuth } from "../hooks/useAuth.js";
import { GameModes } from "../enums/GameModes.js";

function GameModeSelector({ togglePlayWordle, className = "" }) {
  const { gameMode, setGameMode } = useGameMode();
  const { currentUser } = useAuth();
  const [changedMode, setChangedMode] = useState(gameMode);
  const accordionRef = useRef(null);
  const [collapse, setCollapse] = useState(false);

  useEffect(() => {
    gameMode !== changedMode && setChangedMode(gameMode);
  }, [gameMode]);

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
            <Accordion.Body
              onExited={() => {
                setGameMode(changedMode);
              }}
            >
              <ol>
                {Object.keys(GameModes).map((key, index) =>
                  GameModes[key] === gameMode ? null : (
                    <li
                      className={`selector-list ${index + 1 === Object.keys(GameModes).length && "last"}`}
                      key={index}
                      onClick={() => {
                        if (
                          currentUser ||
                          GameModes[key] === GameModes.PRACTICE
                        ) {
                          setCollapse(false);
                          setChangedMode(GameModes[key]);
                        } else toast.warning("Log in to play.");
                      }}
                    >
                      <span className="mode">
                        {GameModes[key].toUpperCase()}
                      </span>
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
