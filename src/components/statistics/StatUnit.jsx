import React from "react";
import "./StatUnit.css";

function StatUnit({ value, category }) {
  const aspectRatio = 1;
  return (
    <div className="stat-window flex-center">
      <span className="stat-value">{value}</span>
      <span className="stat-category">{category}</span>
    </div>
  );
}

export default StatUnit;
