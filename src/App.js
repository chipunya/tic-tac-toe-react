import React from "react";
import "./App.css";
import { useState, useEffect } from "react";
function App() {
  const [cells, setCells] = useState([...Array(9).keys()]);
  const [player1, setPlayer1] = useState(true);
  const [dataForX, setDataForX] = useState([]);
  const [dataForO, setDataForO] = useState([]);
  const [winner, setWinner] = useState("");
  const [gameEnded, setGameEnded] = useState(false);
  const [gameStatus, setGameStatus] = useState("");

  const handleClick = (cellIndex) => {
    console.log(dataForX.includes(cellIndex));

    const newCells = [...cells];
    if (player1) {
      newCells[cellIndex] = "X";
      setDataForX([...dataForX, cellIndex]);
    } else {
      newCells[cellIndex] = "O";
      setDataForO([...dataForO, cellIndex]);
    }
    setCells(newCells);
    setPlayer1(!player1);
  };
  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  useEffect(() => {
    for (let i of winningCombinations) {
      let stringCombinations = i.join("");
      let stringDataX = dataForX.join("");
      let stringDataO = dataForO.join("");
      const checkCombinations = (arr, str) => {
        let counter = 0;
        for (let i of str) {
          if (arr.includes(i)) counter++;
          if (counter >= 3) return true;
        }
      };
      if (checkCombinations(stringDataX, stringCombinations)) {
        setWinner("X won");
        setGameEnded(true);
      } else if (checkCombinations(stringDataO, stringCombinations)) {
        setWinner("O won");
        setGameEnded(true);
      }
    }
    if (gameEnded) {
      setGameStatus("Game ended! Let's play again!");
    }
  }, [dataForX, dataForO, gameEnded]);

  const restart = () => {
    setCells([...Array(9).keys()]);
    setPlayer1(true);
    setDataForX([]);
    setDataForO([]);
    setWinner("");
    setGameEnded(false);
    setGameStatus("");
  };

  console.log("data for X", dataForX);
  console.log("data for O", dataForO);
  console.log(winner);

  return (
    <div className="App">
      <div
        className="container"
        // style={{
        //   display: "flex",
        //   flexWrap: "wrap",
        //   width: "400px",
        // }}
      >
        {cells.map((cell, i) => {
          return (
            <div
              className="cell"
              onClick={() => handleClick(cell)}
              key={i}
              style={{
                color: dataForX.includes(i)
                  ? "red"
                  : dataForO.includes(i)
                  ? "yellow"
                  : "transparent",
              }}
            >
              {cell}
            </div>
          );
        })}
      </div>
      <div className="status">
        {winner ? <p>{winner}</p> : ""}
        <p> {gameStatus}</p>
        {!winner && gameEnded ? <p>Draw!</p> : ""}
      </div>

      <div className="btn">
        <button onClick={restart}>play again</button>
      </div>
    </div>
  );
}

export default App;
