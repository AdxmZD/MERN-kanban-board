import { React, useEffect, useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import Column from "./Column";
import axios from "axios";

const Board = ({ user }) => {
  const [todo, setTodo] = useState([]);
  const [inprog, setInprog] = useState([]);
  const [done, setDone] = useState([]);
  const [board, setBoard] = useState({});

  const handleDragEnd = (result) => {
    const { destination, source, draggableId } = result;

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
    return array.find((item) => item._id === id);
  }

  function removeItemById(id, array) {
    return array.filter((item) => item._id !== id);
  }

  const getTickets = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/user/${user.username}/board`
      );
      setBoard(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getTickets();
    setTodo(board.todo);
    setInprog(board.inprog);
    setDone(board.completed);
  }, [todo, inprog, done]);

  return (
    <div>
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="flex flex-row justify-center gap-10 mt-10">
          <Column
            title={"To Do"}
            tickets={todo}
            setTickets={setTodo}
            id={"1"}
            user={user}
            action={"todo"}
          />
          <Column
            title={"In Progress"}
            tickets={inprog}
            setTickets={setInprog}
            id={"2"}
            user={user}
            action={"inprog"}
          />
          <Column
            title={"Done"}
            tickets={done}
            setTickets={setDone}
            id={"3"}
            user={user}
            action={"completed"}
          />
        </div>
      </DragDropContext>
    </div>
  );
};

export default Board;
