import React from "react";
import { Draggable } from "react-beautiful-dnd";

const Ticket = ({ ticket, index, col }) => {
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
            className={`flex-col border border-white rounded-xl ${col} text-black text-ellipsis my-3 p-2`}
          >
            <p className=" text-xl font-opensans font-semibold">
              {ticket.title}
            </p>
            <p>{ticket.description}</p>
          </div>
          {provided.placeholder}
        </div>
      )}
    </Draggable>
  );
};

export default Ticket;
