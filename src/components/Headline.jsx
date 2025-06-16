import { useState } from "react";

const Headline = ({ headlineText }) => {

  return (
    <h1 className="headline">
      {headlineText.split("").map((letter, index) => (
        <span
          key={index}
          className="headline-span"
          style={{ "--index": index }}
        >
          {letter}
        </span>
      ))}
    </h1>
  );
};

export default Headline;