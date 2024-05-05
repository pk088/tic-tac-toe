import React, { useState } from "react";
import Square from "./Square";
import First from "../Music/First.mp3";
import Second from "../Music/Second.mp3";

const Board = () => {
  const [state, setState] = useState(Array(9).fill(null));
  const [isXTurn, setIsXTurn] = useState(true);
  const [sound, setSound] = useState(false);
  const [statecolor, setStatecolor] = useState(Array(9).fill(false));
  const [score, setScore] = useState({ X: 0, O: 0 });

  let bgcolor = [];
  let audio1 = new Audio(First);
  let audio2 = new Audio(Second);

  const checkWinner = () => {
    const winnerLogic = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let [index, logic] of winnerLogic.entries()) {
      const [a, b, c] = logic;
      if (state[a] !== null && state[a] === state[b] && state[a] === state[c]) {
        bgcolor = logic;
        return state[a];
      }
    }

    const isBoardFull = state.every((square) => square !== null);
    if (isBoardFull) {
      return "Tied";
    }

    return false;
  };

  const isWinner = checkWinner();

  const handleClick = (index) => {
    if (state[index] !== null) {
      return;
    }
    const copyState = [...state];
    copyState[index] = isXTurn ? "X" : "O";
    !isWinner && setState(copyState);
    !isWinner && setIsXTurn(!isXTurn);

    !isWinner && sound && (isXTurn ? audio1.play() : audio2.play());

    const allSquaresFilled = copyState.every((square) => square !== null);
    if (allSquaresFilled) {
      console.log("All squares are filled!");
    }
  };

  bgcolor.map((ele) => {
    statecolor[ele] = true;
  });

  const handleReset = () => {
    if (isWinner === "X") {
      setScore((prevScore) => ({ ...prevScore, X: prevScore.X + 1 }));
    }
    if (isWinner === "O") {
      setScore((prevScore) => ({ ...prevScore, O: prevScore.O + 1 }));
    }
    setState(Array(9).fill(null));
    setStatecolor(Array(9).fill(false));
  };

  return (
    <div className="board-container">
      <>
        <div className="turn-heading">
          {isWinner ? (
              <h4>
                <span>Game Over</span>
              </h4>)
              :
              (<h4>
              <span className="turn">{isXTurn ? "X" : "O"}</span>'s Turn
            </h4>
           
          )}
            <>
              
              <div className="score-card">
                <span>X- {score.X}</span>
                <span>O- {score.O}</span>
                <button
                onClick={() => setSound(!sound)}
                style={
                  sound
                    ? { backgroundColor: "green", color: "white" }
                    : { backgroundColor: "white", color: "black" }
                }
              >
                Music
              </button>
              </div>
              
            </>
                
        </div>
        <div className="board-row">
          <Square
            style={statecolor[0]}
            onClick={() => handleClick(0)}
            value={state[0]}
          />
          <Square
            style={statecolor[1]}
            onClick={() => handleClick(1)}
            value={state[1]}
          />
          <Square
            style={statecolor[2]}
            onClick={() => handleClick(2)}
            value={state[2]}
          />
        </div>
        <div className="board-row">
          <Square
            style={statecolor[3]}
            onClick={() => handleClick(3)}
            value={state[3]}
          />
          <Square
            style={statecolor[4]}
            onClick={() => handleClick(4)}
            value={state[4]}
          />
          <Square
            style={statecolor[5]}
            onClick={() => handleClick(5)}
            value={state[5]}
          />
        </div>
        <div className="board-row">
          <Square
            style={statecolor[6]}
            onClick={() => handleClick(6)}
            value={state[6]}
          />
          <Square
            style={statecolor[7]}
            onClick={() => handleClick(7)}
            value={state[7]}
          />
          <Square
            style={statecolor[8]}
            onClick={() => handleClick(8)}
            value={state[8]}
          />
        </div>
      </>
      {isWinner && (
        <>
          {isWinner !== "Tied" ? (
            <div style={{ marginTop: "20px" }}>
              {isWinner} Won the Game...!{" "}
              <button className="play-btn" onClick={handleReset}>
                Play Again
              </button>
            </div>
          ) : (
            <div style={{ marginTop: "20px" }}>
              Game Tied...!{" "}
              <button className="play-btn" onClick={handleReset}>
                Play Again
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};
export default Board;
