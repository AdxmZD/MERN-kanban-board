import { React, useEffect, useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import Column from "./Column";
import { v4 as uuidv4 } from "uuid";

const Board = ({ col1, col2, col3 }) => {
  const [todo, setTodo] = useState([]);
  const [inprog, setInprog] = useState([]);
  const [done, setDone] = useState([]);
  const [isform, setIsform] = useState(false);
  const [ticket, setTicket] = useState({
    title: "",
    description: "",
    id: uuidv4(),
  });

  const createTicket = () => {
    setTodo([...todo, ticket]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    createTicket();
    setTicket({ title: "", description: "", id: uuidv4() });
    console.log(ticket);
    setIsform(!isform);
  };

  const handleDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    console.log(source.droppableId);
    console.log(draggableId);
    console.log(destination.droppableId);

    // IF SOURCE AND DESTINATION ARE THE SAME. DO NOTHING

    if (source.droppableId === destination.droppableId) return;

    // REMOVE FROM SOURCE ARRAY

    if (source.droppableId === "1") {
      setTodo(removeItemById(draggableId, todo));
    } else if (source.droppableId === "2") {
      setInprog(removeItemById(draggableId, inprog));
    } else if (source.droppableId === "3") {
      setDone(removeItemById(draggableId, done));
    }

    // GET ITEM

    const item = findItemById(draggableId, [...todo, ...inprog, ...done]);

    // ADD TO DESTINATION ARRAY

    if (destination.droppableId === "1") {
      setTodo([...todo, item]);
    } else if (destination.droppableId === "2") {
      setInprog([...inprog, item]);
    } else if (destination.droppableId === "3") {
      setDone([...done, item]);
    }
  };

  function findItemById(id, array) {
    return array.find((item) => item.id === id);
  }

  function removeItemById(id, array) {
    return array.filter((item) => item.id !== id);
  }

  useEffect(() => {
    console.log(todo);
    console.log(inprog);
    console.log(done);
  }, [todo, inprog, done]);

  return (
    <div>
      <div className="flex justify-center mb-10 mt-5">
        {!isform ? (
          <button
            className="p-3 text-xl font-semibold font-opensans border border-black rounded-md"
            onClick={() => setIsform(!isform)}
          >
            Create Ticket
          </button>
        ) : (
          <form
            className="flex flex-col justify-between gap-4 w-[500px]"
            onSubmit={handleSubmit}
          >
            <input
              className="p-2 text-black"
              type="text"
              placeholder="Enter ticket title"
              value={ticket.title}
              onChange={(e) => setTicket({ ...ticket, title: e.target.value })}
              required
            />
            <textarea
              className="p-2 text-black"
              type="text"
              placeholder="Enter description"
              value={ticket.description}
              onChange={(e) =>
                setTicket({ ...ticket, description: e.target.value })
              }
              required
              rows={4}
            />
            <div className="flex flex-row justify-center gap-4">
              <button
                type="submit"
                className="p-2 text-xl font-semibold font-opensans bg-blue-500 rounded-md"
              >
                Create
              </button>
              <button
                className="p-2 text-xl font-semibold font-opensans bg-slate-500 rounded-md"
                onClick={() => setIsform(!isform)}
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="flex flex-row justify-center gap-10">
          <Column
            title={"To Do"}
            tickets={todo}
            setTickets={setTodo}
            id={"1"}
            col={col1}
          />
          <Column
            title={"In Progress"}
            tickets={inprog}
            setTickets={setInprog}
            id={"2"}
            col={col2}
          />
          <Column
            title={"Done"}
            tickets={done}
            setTickets={setDone}
            id={"3"}
            col={col3}
          />
        </div>
      </DragDropContext>
    </div>
  );
};

export default Board;
