import Wordle from "../../Wordle";
import { useEffect, useRef, useState } from "react";
import useToggleState from "../../hooks/useToggleState.jsx";

const API_URL =
  "https://raw.githubusercontent.com/Bengor0/wordle-words-API/refs/heads/main/wordle-wordbank.json";

const RoyaleGM = ({ darkMode, userData, setUserData, gameMode }) => {
  const [solution, setSolution] = useState([]);
  const solutionRef = useRef([]);
  const [isGameOver, toggleIsGameOver] = useToggleState(false);
  const [restart, toggleRestart] = useToggleState(false);
  const wordSet = useRef(new Set());

  useEffect(() => {
    const fetchWords = async () => {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();
        const wordArray = [...data.words];
        wordArray.forEach((word) => wordSet.current.add(word.toUpperCase()));
        while (solutionRef.current.length < 5) {
          const randomWord =
            wordArray[Math.floor(Math.random() * (wordArray.length - 1))];
          setSolution((prevState) => [
            ...prevState,
            randomWord.toUpperCase().split(""),
          ]);
          solutionRef.current = [
            ...solutionRef.current,
            randomWord.toUpperCase().split(""),
          ];
        }
        solutionRef.current.forEach((solution) =>
          console.log(solution.join("")),
        );
      } catch (error) {
        console.error(error);
      }
    };

    fetchWords();
  }, [restart]);

  return (
    <>
      <h1 style={{ color: "white" }}>To be implemented</h1>
      {solution.map((solution, index) => (
        <div style={{ color: "white" }} key={index}>
          {solution}
        </div>
      ))}
    </>
  );
  // <Wordle
  //   darkMode={darkMode}
  //   userData={userData}
  //   setUserData={setUserData}
  //   gameMode={gameMode}
  //   solution={solution}
  //   wordSet={wordSet}
  //   isGameOver={isGameOver}
  //   toggleIsGameOver={toggleIsGameOver}
  //   toggleRestart={toggleRestart}
  //   key={restart}
  // />
};

export default RoyaleGM;
