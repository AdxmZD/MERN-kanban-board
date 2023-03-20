import Board from "./components/Board";

function App() {
  return (
    <div className="App">
      <span className="flex justify-center p-5 text-4xl font-bold font-playfair">
        Kanban Board
      </span>
      <Board />
    </div>
  );
}

export default App;
