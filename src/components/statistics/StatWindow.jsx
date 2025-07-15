import React from "react";
import "./StatWindow.css";

function StatWindow({ value, category }) {
  return (
    <div className="stat-window flex-center">
      <span className="stat-value">{value}</span>
      <span className="stat-category">{category}</span>
    </div>
  );
}

export default StatWindow;
