///////////////////////
// Welcome to Cursor //
///////////////////////

/*
Step 1: Try generating a react component that lets you play tictactoe with Cmd+K or Ctrl+K on a new line.
  - Then integrate it into the code below and run with npm start

Step 2: Try highlighting all the code with your mouse, then hit Cmd+k or Ctrl+K.
  - Instruct it to change the game in some way (e.g. add inline styles, add a start screen, make it 4x4 instead of 3x3)

Step 3: Hit Cmd+L or Ctrl+L and ask the chat what the code does

Step 4: To try out cursor on your own projects, go to the file menu (top left) and open a folder.
*/

import React, { useState } from "react";
import ReactDOM from "react-dom/client";

function App() {
  const [start, setStart] = useState(false);

  return (
    <div className="App" style={{ textAlign: "center" }}>
      <header className="App-header">Tic Tac Toe</header>
      {!start ? (
        <button onClick={() => setStart(true)}>Start Game</button>
      ) : (
        <TicTacToe />
      )}
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

function TicTacToe() {
  const [board, setBoard] = useState(Array(16).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const winner = calculateWinner(board);

  function handleClick(i) {
    const boardCopy = [...board];
    if (winner || boardCopy[i]) return;
    boardCopy[i] = xIsNext ? "X" : "O";
    setBoard(boardCopy);
    setXIsNext(!xIsNext);
  }

  function renderSquare(i) {
    return (
      <button
        onClick={() => handleClick(i)}
        style={{ width: "50px", height: "50px" }}
      >
        {board[i]}
      </button>
    );
  }

  return (
    <div>
      <div className="status">
        {winner ? "Winner: " + winner : "Next Player: " + (xIsNext ? "X" : "O")}
      </div>
      <div>
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
        {renderSquare(3)}
      </div>
      <div>
        {renderSquare(4)}
        {renderSquare(5)}
        {renderSquare(6)}
        {renderSquare(7)}
      </div>
      <div>
        {renderSquare(8)}
        {renderSquare(9)}
        {renderSquare(10)}
        {renderSquare(11)}
      </div>
      <div>
        {renderSquare(12)}
        {renderSquare(13)}
        {renderSquare(14)}
        {renderSquare(15)}
      </div>
    </div>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2, 3],
    [4, 5, 6, 7],
    [8, 9, 10, 11],
    [12, 13, 14, 15],
    [0, 4, 8, 12],
    [1, 5, 9, 13],
    [2, 6, 10, 14],
    [3, 7, 11, 15],
    [0, 5, 10, 15],
    [3, 6, 9, 12],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c, d] = lines[i];
    if (
      squares[a] &&
      squares[a] === squares[b] &&
      squares[a] === squares[c] &&
      squares[a] === squares[d]
    ) {
      return squares[a];
    }
  }
  return null;
}
