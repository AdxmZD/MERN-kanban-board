import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { FaTrash } from "react-icons/fa";

const Ticket = ({ tickets, setTickets, ticket, index, col }) => {
  const handleDelete = () => {
    setTickets(tickets.filter((item) => item.id !== ticket.id));
  };
  return (
    <Draggable draggableId={`${ticket.id}`} key={ticket.id} index={index}>
      {(provided, snapshot) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          isDragging={snapshot.isDragging}
        >
          <div
            className={`flex-col border border-white rounded-xl bg-${col} text-black text-ellipsis my-3 p-2`}
          >
            <div className="flex justify-between">
              <p className=" text-lg font-opensans font-semibold">
                {ticket.title}
              </p>
              <button onClick={() => handleDelete()}>
                <FaTrash />
              </button>
            </div>
            <p>{ticket.description}</p>
          </div>
          {provided.placeholder}
        </div>
      )}
    </Draggable>
  );
};

export default Ticket;
