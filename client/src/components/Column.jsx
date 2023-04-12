import React from "react";
import { Droppable } from "react-beautiful-dnd";
import Ticket from "./Ticket";
import CreateTicket from "./CreateTicket";

const Column = ({ title, tickets, setTickets, id, user, action }) => {
  console.log("USER", user);
  return (
    <div
      className={`flex flex-col rounded-md bg-[#bebebede] w-[350px] min-h-[600px] overflow-hidden`}
    >
      <div className="flex flex-row  justify-between p-2 text-lg font-opensans font-semibold px-3">
        <span>{title}</span>
        <CreateTicket
          tickets={tickets}
          setTickets={setTickets}
          user={user}
          action={action}
        />
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
                  user={user}
                />
              ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>

      <div className=""></div>
    </div>
  );
};

export default Column;
