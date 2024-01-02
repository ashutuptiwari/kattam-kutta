import React, { useState, useEffect } from "react";
import "./game.css";
import sendMove from "../api/sendMove";
import getMove from "../api/getMove";

const Game = () => {
  const [board, setBoard] = useState<number[][]>([
    Array(3).fill(0),
    Array(3).fill(0),
    Array(3).fill(0),
  ]);
  const [move, setMove] = useState(0);

  useEffect(() => {
    console.log("board updated",board);
  }, [board]);

  useEffect(() => {
    sendMove(-1, -1, -1);
  }, []);

  const handleCellClick = async (row: number, col: number) => {
    if(board[row][col]!==0)
    {
        alert("invalid move.Try Again!!");
        return;
    }
    setMove(move + 1);
    const response1 = await sendMove(row, col, move);
    const updatedBoard = [...board];
    updatedBoard[row][col] = 1; // 1 for 'O', 2 for 'X'
    if (response1) {
      
      if (response1.data.termination!==-1) {
        console.log('response1 data termination not -1',response1.data.termination);
        if(response1.data.termination===1)
        {
            setTimeout(() => alert("Player 1.1 Wins"), 20);
        }
        else if(response1.data.termination===2)
        {
            setTimeout(() => alert("Agent Smith.1 Wins"), 20);
        }
        else if(response1.data.termination===0)
        {
            setTimeout(() => alert("Khichdhi.1"), 20);
        }
        
        setTimeout(
          () =>
            {setBoard([Array(3).fill(0), Array(3).fill(0), Array(3).fill(0)]);
              setMove(0);
            },
          1000
        );
        return;
      }
    }
    console.log("new move fetched!!");
    const response2 = await getMove();
    if (response2 && response2.data) {
      setMove(move + 1);
      let r = response2.data.row;
      let c = response2.data.col;
      updatedBoard[r][c] = 2;
      setBoard(updatedBoard);
      if (response2.data.termination) {
        
        if (response2.data.termination!==-1) {
          console.log('response2 data termination not -1',response2.data.termination);
          if(response2.data.termination===1)
          {
              setTimeout(() => alert("Player 1.2 Wins"), 20);
          }
          else if(response2.data.termination===2)
          {
              setTimeout(() => alert("Agent Smith Wins.2"), 20);
          }
          else if(response2.data.termination===0)
          {
              setTimeout(() => alert("Khichdhi.2"), 20);
          }
          
          setTimeout(
            () =>
              {setBoard([Array(3).fill(0), Array(3).fill(0), Array(3).fill(0)]);
              setMove(0);
              },
            1000
          );
          return; 
        }
      }
    }
  };

  return (
    <div className="center">
      <div className="game-grid">
        {board.map((row, rowIndex) => (
          <div key={rowIndex} className="row">
            {row.map((cell, colIndex) => (
              <div
                key={colIndex}
                className={`cell ${
                  cell === 1 ? "circle" : cell === 2 ? "cross" : ""
                }`}
                onClick={() => handleCellClick(rowIndex, colIndex)}
              >
                {cell === 1 && "O"}
                {cell === 2 && "X"}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Game;
