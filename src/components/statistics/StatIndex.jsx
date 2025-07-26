import React from "react";
import "./StatIndex.css";

function StatIndex({ value, label }) {
  const aspectRatio = 3;
  return (
    <div className="index-window flex-center">
      <div>
        <span className="index-value">{value}</span>
        <span className="index-label">{label}</span>
      </div>
    </div>
  );
}

export default StatIndex;
