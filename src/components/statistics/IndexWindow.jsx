import React from "react";
import "./IndexWindow.css";

function IndexWindow({ value, label }) {
  return (
    <div className="index-window flex-center">
      <div>
        <span className="index-value">{value}</span>
        <span className="index-label">{label}</span>
      </div>
    </div>
  );
}

export default IndexWindow;
