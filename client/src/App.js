import Board from "./components/Board";
import React from "react";

function App() {
  return (
    <div className="App">
      <span className="flex justify-center p-5 text-4xl font-extrabold font-playfair bg-[#167891]">
        Adam's Kanban Board
      </span>
      <Board />
    </div>
  );
}

export default App;
