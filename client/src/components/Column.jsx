import React from "react";
import { Droppable } from "react-beautiful-dnd";
import Ticket from "./Ticket";

const Column = ({ title, tickets, id, col }) => {
  return (
    <div className="flex flex-col border border-gray-500 rounded-xl w-[300px] min-h-[600px] bg-gray-800 overflow-hidden">
      <div className="p-4 text-center text-xl font-opensans border-b">
        {title}
      </div>

      <Droppable droppableId={id}>
        {(provided, snapshot) => (
          <div
            className="p-3 bg-slate-800 grow min-height-100"
            ref={provided.innerRef}
            {...provided.droppableProps}
            isDraggingOver={snapshot.isDraggingOver}
          >
            {tickets &&
              tickets.map((ticket, index) => (
                <Ticket ticket={ticket} key={index} index={index} col={col} />
              ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default Column;
