import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { FaTrash } from "react-icons/fa";

const Ticket = ({ tickets, setTickets, ticket, index }) => {
  const handleDelete = () => {
    setTickets(tickets.filter((item) => item._id !== ticket._id));
  };
  return (
    <Draggable draggableId={`${ticket._id}`} key={ticket._id} index={index}>
      {(provided, snapshot) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          isDragging={snapshot.isDragging}
        >
          <div
            className={`flex-col rounded-md bg-[#ffffff] text-black text-ellipsis px-2 pb-1 my-2`}
          >
            <div className="flex flex-col">
              <p className="text-md font-opensans font-semibold mt-3">
                {ticket.title}
              </p>

              <p className="object-contain">{ticket.description}</p>
              <div className="flex flex-row justify-between border-t">
                {ticket.points === "1" ? (
                  <p className="text-gray-500 mt-3">
                    {`${ticket.points}`} point
                  </p>
                ) : (
                  <p className="text-gray-500 mt-3">
                    {`${ticket.points}`} points
                  </p>
                )}

                <button className="px-2" onClick={() => handleDelete()}>
                  <FaTrash />
                </button>
              </div>
            </div>
          </div>
          {provided.placeholder}
        </div>
      )}
    </Draggable>
  );
};

export default Ticket;
