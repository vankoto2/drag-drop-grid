import React from "react";
import { useDrag } from "react-dnd";

type DraggableRowProps = {
  row: { id: number; name?: string };
};

const DraggableRow: React.FC<DraggableRowProps> = ({ row }) => {
  const [{ isDragging }, drag] = useDrag({
    type: "ROW",
    item: { row },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  // Use a callback ref to handle the drag functionality
  const handleRef = (node: HTMLDivElement | null) => {
    if (node) {
      drag(node); // Attach the drag source to the DOM element
    }
  };

  return (
    <>
      {/* The draggable row */}
      <div
        ref={handleRef} // Use the callback ref here
        style={{
          opacity: isDragging ? 0.5 : 1,
          cursor: "move",
        //   padding: "8px",
        //   border: "1px solid #ccc",
        //   margin: "4px 0",
          background: "white",
          borderRadius: "4px",
        }}
      >
        {row.id}
      </div>
    </>
  );
};

export default DraggableRow;
