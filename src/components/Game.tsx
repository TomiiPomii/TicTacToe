import React, { useState } from "react";
import "../styles/Game.css";
import { Cell } from "./Cell";

// Converter for the Game Grid
type CharConverter = Record<number, string>;
const convert: CharConverter = {
  0: "",
  1: "X",
  2: "O",
};

export const TicTacToe: React.FC = () => {
  // Symbol was in die Zellen gepackt wird verwalten
  const [player, setPlayer] = useState(1);

  // Methode um das momentane Symbol zu kriegen, und um es direkt zu Tauschen
  const getPlayer = (): number => {
    // Spieler für momentanen Zug zwichenspeichern
    const thisMove = player;

    if (player === 1) setPlayer(2);
    else setPlayer(1);

    return thisMove;
  };

  // Game Grid | Numbers convert to a charcter
  const [grid, setGrid] = useState<number[][]>([
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ]);
  // If a Symbol changes, it does through this method
  const changeGrid = (row: number, col: number): void => {
    if (grid[row][col] !== 0) return;

    const tempGrid = grid;
    tempGrid[row][col] = getPlayer();
    setGrid(tempGrid);
  };

  // This function checks if there is a winner
  const checkWinner = (): number => {
    //Horizontal Checking
    for (let row of grid) {
      const distinctValues = new Set(row);
      if (distinctValues.size === 1) return row[0];
    }

    //Vertical checking
    for (let i = 0; i < 3; i++) {
      const distinctValues = new Set([grid[0][i], grid[1][i], grid[2][i]]);
      if (distinctValues.size === 1) return grid[0][i];
    }

    //Diagonal checking
    if (grid[0][0] === grid[1][1] && grid[0][0] === grid[2][2])
      return grid[0][0];
    if (grid[0][2] === grid[1][1] && grid[0][0] === grid[2][0])
      return grid[0][0];

    return 0;
  };

  const resetGame = () => {
    setGrid([
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ]);
    setPlayer(1);
  };

  return (
    <div className="container">
      <div className="display">
        {checkWinner() === 0 && <h2>{convert[player]} is next!</h2>}
        {checkWinner() !== 0 && <h2>{convert[checkWinner()]} won!</h2>}
        <button onClick={resetGame}>Start over!</button>
      </div>
      <div className="grid">
        {grid.map((row, rowIndex) => {
          return (
            <div key={String(rowIndex)} className="row">
              {row.map((cell, cellIndex) => {
                return (
                  <Cell
                    symbol={convert[grid[rowIndex][cellIndex]]}
                    onClick={() => changeGrid(rowIndex, cellIndex)}
                    key={`${rowIndex}${cellIndex}`}
                  />
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
};
