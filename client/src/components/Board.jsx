import { React, useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import Column from "./Column";

const Board = () => {
  const [todo, setTodo] = useState([]);
  const [inprog, setInprog] = useState([]);
  const [done, setDone] = useState([]);
  const [isform, setIsform] = useState(false);

  // const createTicket = () => {

  // };

  return (
    <div>
      <div className="flex justify-center mb-10 mt-10">
        {!isform ? (
          <button
            className="p-3 text-xl font-semibold font-opensans bg-slate-700 rounded-md"
            onClick={() => setIsform(!isform)}
          >
            Create Ticket
          </button>
        ) : (
          <form className="flex flex-col justify-between gap-4 w-[500px]">
            <input
              className="p-2"
              type="text"
              placeholder="Enter ticket title"
            />
            <input
              className="p-2"
              type="text"
              placeholder="Enter description"
            />
            <div className="flex flex-row justify-center gap-4">
              <button className="p-2 text-xl font-semibold font-opensans bg-blue-900 rounded-md">
                Create
              </button>
              <button
                className="p-2 text-xl font-semibold font-opensans bg-slate-700 rounded-md"
                onClick={() => setIsform(!isform)}
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
      <DragDropContext>
        <div className="flex flex-row justify-center gap-10">
          <Column title={"To Do"} tickets={todo} id={"1"} />
          <Column title={"In Progress"} tickets={inprog} id={"2"} />
          <Column title={"Done"} tickets={done} id={"3"} />
        </div>
      </DragDropContext>
    </div>
  );
};

export default Board;
