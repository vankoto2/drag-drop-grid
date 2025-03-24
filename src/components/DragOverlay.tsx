import React from 'react';
import { useDragContext } from '../context/DragContext';

const DragOverlay: React.FC = () => {
    const { draggedRows } = useDragContext();
    console.log('Dragged Rows:', draggedRows.length);

    if (!draggedRows.length) return null;

    return (
        <div
            style={{
                position: 'fixed',
                pointerEvents: 'none',
                top: 0,
                left: 0,
                zIndex: 1000,
                backgroundColor: 'rgba(255, 255, 255, 0.8)',
                border: '1px solid #ccc',
                padding: '10px',
            }}
        >
            Dragging {draggedRows.length} row(s)
        </div>
    );
};

export default DragOverlay;
