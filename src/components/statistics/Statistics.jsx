import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

import "./Statistics.css";
import StatisticsContext from "../../contexts/StatisticsContext.js";
import { FaLock } from "react-icons/fa";

function Statistics({ children }) {
  return <div className="stats-window">{children}</div>;
}

function StatsContainer({ children }) {
  const [containerAspRat, setContainerAspRat] = useState(0);
  return (
    <StatisticsContext.Provider value={{ setContainerAspRat }}>
      <div
        className="stats-container"
        style={{
          display: "flex",
          width: "100%",
          aspectRatio: containerAspRat,
        }}
      >
        {children}
      </div>
    </StatisticsContext.Provider>
  );
}

function StatUnit({ value, category }) {
  const { setContainerAspRat } = useContext(StatisticsContext);
  const aspectRatio = 1;

  useEffect(() => {
    setContainerAspRat((prev) => prev + aspectRatio);

    return () => setContainerAspRat((prev) => prev - aspectRatio);
  }, []);

  return (
    <div
      className="stat-unit flex-center"
      style={{
        aspectRatio: aspectRatio,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <span
        className="unit-value"
        style={{ fontSize: "3vh", fontWeight: "500" }}
      >
        {value}
      </span>
      <span className="unit-category" style={{ fontSize: "1.6vh" }}>
        {category}
      </span>
    </div>
  );
}

function StatIndex({ value, label }) {
  const { setContainerAspRat } = useContext(StatisticsContext);
  const aspectRatio = 5;

  useEffect(() => {
    setContainerAspRat((prev) => prev + aspectRatio);

    return () => setContainerAspRat((prev) => prev - aspectRatio);
  }, []);

  return (
    <div
      className="stat-index flex-center"
      style={{
        aspectRatio: aspectRatio,
      }}
    >
      <div>
        <span
          className="index-value"
          style={{ fontSize: "5vh", fontWeight: "500" }}
        >
          {value}
        </span>
        <span className="index-label">{label}</span>
      </div>
    </div>
  );
}

function StatLock({ gamesPlayed }) {
  const LOCK_NUMBER = 5;
  return (
    <div className="stats-lock flex-center">
      <FaLock className="lock-svg" />
      <div className="lock-message">
        {typeof gamesPlayed === "number"
          ? `Play ${LOCK_NUMBER - gamesPlayed} more ${
              LOCK_NUMBER - gamesPlayed === 1 ? "game." : "games."
            }`
          : "Log in to see your stats."}
      </div>
    </div>
  );
}

Statistics.Container = StatsContainer;
Statistics.Unit = StatUnit;
Statistics.Index = StatIndex;
Statistics.StatLock = StatLock;

export default Statistics;
