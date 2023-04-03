import Board from "./components/Board";
import React from "react";
import RainbowBg from "./assets/rainbowbg.jpg";

function App() {
  return (
    <div className="App">
      <img
        className="absolute h-full w-full -z-10"
        alt="bg"
        src={RainbowBg}
      ></img>
      <span className="flex justify-center p-3 text-4xl font-extrabold font-playfair bg-[#22222250]">
        <span className="text-white opacity-100">Kanban</span>
      </span>
      <Board />
    </div>
  );
}

export default App;
