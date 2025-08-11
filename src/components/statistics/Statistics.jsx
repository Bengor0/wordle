import React from "react";
import { FaLock } from "react-icons/fa";
import "./Statistics.css";

function Statistics({ children }) {
  return <div className="stats-window">{children}</div>;
}

function StatsContainer({ children, className }) {
  return (
    <div className={`stats-container${className ? " " + className : ""}`}>
      {children}
    </div>
  );
}

function StatUnit({ value, category }) {
  return (
    <div className="stat-unit flex-center">
      <span className="unit-value">{value}</span>
      <span className="unit-category">{category}</span>
    </div>
  );
}

function StatIndex({ value, label }) {
  return (
    <div className="stat-index flex-center">
      <div>
        <span className="index-value">{value}</span>
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
