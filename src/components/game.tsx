import React, { useState, useEffect } from "react";
import "./game.css";
import sendMove from "../api/sendMove";
import getMove from "../api/getMove";
import sendBot from "../api/sendBot";

const Game = () => {
  const [board, setBoard] = useState<number[][]>([
    Array(3).fill(0),
    Array(3).fill(0),
    Array(3).fill(0),
  ]);

  const [move, setMove] = useState(0);
  const [playFirst, setPlayfirst] = useState("None");
  const [disabledButton1, setDisabledButton1] = useState(false);
  const [disabledButton2, setDisabledButton2] = useState(false);
  const [change, setChange] = useState(true);

  const [disabledButton3, setDisabledButton3] = useState(false);
  const [disabledButton4, setDisabledButton4] = useState(false);
  const [bot, setBot] = useState("None");

  useEffect(() => {
    console.log("board updated", board);
  }, [board]);

  useEffect(() => {
    if (move === 0) {
      setDisabledButton1(false);
      setDisabledButton2(false);
      setPlayfirst("None");
      setChange(true);
    } else {
      setChange(false);
    }
  }, [move]);

  useEffect(() => {
    sendMove(-1, -1, -1);
  }, []);

  const sendB=async(f:number)=>{
    const response= await sendBot(f);
    if(response)
    {
      console.log(response.data.message)
    }
  }

  const handlePlaySecond = async () => {
    console.log("new move fetched!!");
    setMove(move + 1);
    const updatedBoard = [...board];
    const response2 = await getMove();
    if (response2 && response2.data) {
      let r = response2.data.row;
      let c = response2.data.col;
      updatedBoard[r][c] = 2;
      setBoard(updatedBoard);
      if (response2) {
        if (response2.data.termination !== -1) {
          setTimeout(() => {
            setBoard([Array(3).fill(0), Array(3).fill(0), Array(3).fill(0)]);
            setMove(0);
          }, 2000);
          return;
        }
      }
    }
  };

  const handleCellClick = async (row: number, col: number) => {
    if (board[row][col] !== 0) {
      alert("andha hai kya laude");
      return;
    }
    if(bot==='None')
    {
      alert("chose a bot!");
    }
    else if (playFirst === "None") {
      alert("choose first or second");
      return;
    } else if (playFirst === "user" || playFirst === "agent") {
      setMove(move + 1);
      const response1 = await sendMove(row, col, move);
      const updatedBoard = [...board];
      updatedBoard[row][col] = 1; // 1 for 'O', 2 for 'X'
      //setBoard(updatedBoard);
      if (response1) {
        if (response1.data.termination !== -1) {
          setBoard(updatedBoard);
          setTimeout(() => {
            setBoard([Array(3).fill(0), Array(3).fill(0), Array(3).fill(0)]);
            setMove(0);
          }, 1000);
          return;
        }
      }
      console.log("new move fetched!!");
      setMove(move + 1);
      const response2 = await getMove();
      if (response2 && response2.data) {
        let r = response2.data.row;
        let c = response2.data.col;
        updatedBoard[r][c] = 2;
        setBoard(updatedBoard);
        if (response2) {
          if (response2.data.termination !== -1) {
            setTimeout(() => {
              setBoard([Array(3).fill(0), Array(3).fill(0), Array(3).fill(0)]);
              setMove(0);
            }, 1000);
            return;
          }
        }
      }
    } else {
      alert("developer iss game ka chutiya hai");
    }
  };

  return (
    <div id="container">
      <div id="buttons">
        <button
          className={`button1 ${disabledButton3?"disabled":""}`}
          onClick={() => {
            if (change) {
              setBot('new');
              setDisabledButton3(false);
              setDisabledButton4(true);
              sendB(2);
            }
          }}
        >
          Train bot from scratch
        </button>
        <button
          className={`button1 ${disabledButton4?"disabled":""}`}
          onClick={() => {
            if (change) {
              setBot('optimal')
              setDisabledButton4(false);
              setDisabledButton3(true);
              sendB(1);
            }
          }}
        >
          Play with Optimal bot
        </button>
      </div>
      <div id="buttons">
        <button
          className={`button`}
          onClick={() => {
            setPlayfirst("user");
            setDisabledButton2(true);
          }}
          disabled={disabledButton1}
        >
          Play First
        </button>
        <button
          className={`button`}
          onClick={() => {
            if (!disabledButton2 && !disabledButton1) {
              setPlayfirst("agent");
              handlePlaySecond();
              setDisabledButton1(true);
            }
          }}
          disabled={disabledButton2}
        >
          Play Second
        </button>
      </div>
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
    </div>
  );
};
export default Game;
