import React from "react";
import { Droppable } from "react-beautiful-dnd";
import Ticket from "./Ticket";

const Column = ({ title, tickets, setTickets, id, col }) => {
  return (
    <div
      className={`flex flex-col border bg-[#167891] rounded-xl w-[300px] min-h-[600px] overflow-hidden`}
    >
      <div
        className={`p-4 text-center text-xl font-opensans font-semibold border-b border-black `}
      >
        {title}
      </div>

      <Droppable droppableId={id}>
        {(provided, snapshot) => (
          <div
            className="p-3 grow min-height-100"
            ref={provided.innerRef}
            {...provided.droppableProps}
            isDraggingOver={snapshot.isDraggingOver}
          >
            {tickets &&
              tickets.map((ticket, index) => (
                <Ticket
                  setTickets={setTickets}
                  tickets={tickets}
                  ticket={ticket}
                  key={index}
                  index={index}
                  col={col}
                />
              ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default Column;
