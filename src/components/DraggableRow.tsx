import React from "react";
import { useDrag, useDrop } from "react-dnd";

type DraggableRowProps = {
  row: { id: number; name?: string }; // Row data including id and name
  index: number; // Row index in the grid
  moveRow: (dragIndex: number, hoverIndex: number) => void; // Function to handle reordering
};

const DraggableRow: React.FC<DraggableRowProps> = ({ row, index, moveRow }) => {
  // Drag setup
  const [{ isDragging }, drag] = useDrag({
    type: "ROW", // Use ROW type for drag-and-drop
    item: { index }, // Pass the index of the dragged row
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  // Drop setup
  const [, drop] = useDrop({
    accept: "ROW", // Accept only rows
    hover: (item: { index: number }) => {
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex !== hoverIndex) {
        moveRow(dragIndex, hoverIndex); // Call moveRow to reorder rows
        item.index = hoverIndex; // Update the dragged item's index
      }
    },
  });

  // Combine drag and drop functionality
  const handleRef = (node: HTMLDivElement | null) => {
    if (node) {
      drag(node); // Attach drag behavior
      drop(node); // Attach drop behavior
    }
  };

  return (
    <>
      {/* The draggable row */}
      <div
        ref={handleRef} // Use the combined drag/drop ref here
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
        <strong>{row.id}</strong>
      </div>
    </>
  );
};

export default DraggableRow;
