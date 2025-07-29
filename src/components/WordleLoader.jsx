import React from "react";
import "../styles/WordleLoader.css";

const WordleLoader = () => {
  return (
    <div className="wordle-loader">
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          className="tile"
          style={{ animationDelay: `${i * 0.15}s` }}
        />
      ))}
    </div>
  );
};

export default WordleLoader;
