import Board from "./components/Board";
import React from "react";

function App() {
  const col1 = "red-500";
  const col2 = "orange-500";
  const col3 = "green-500";
  return (
    <div className="App">
      <span className="flex justify-center p-5 text-4xl font-extrabold font-playfair">
        Adam's Kanban Board
      </span>
      <Board col1={col1} col2={col2} col3={col3} />
    </div>
  );
}

export default App;
