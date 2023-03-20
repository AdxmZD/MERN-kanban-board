import React from "react";
import { Droppable } from "react-beautiful-dnd";

const Column = ({ title, tickets, id }) => {
  return (
    <div className="flex flex-col border border-gray-500 rounded-xl w-[300px] min-h-[500px] bg-gray-800">
      <div className="p-4 text-center text-xl font-opensans border-b">
        {title}
      </div>
      <Droppable droppableId={id}>
        {(provided, snapshot) => {
          <div
            className="p-3 bg-slate-800 grow min-height-100"
            ref={provided.innerRef}
            {...provided.droppableProps}
            isDraggingOver={snapshot.isDraggingOver}
          >
            {provided.placeholder}
          </div>;
        }}
      </Droppable>
    </div>
  );
};

export default Column;
