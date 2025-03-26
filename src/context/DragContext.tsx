import React, { createContext, useContext, useState } from "react";

type DragContextType = {
    draggedRows: any[];
    setDraggedRows: (rows: any[]) => void;
};

const DragContext = createContext<DragContextType>({
    draggedRows: [],
    setDraggedRows: () => { },
});

export const DragContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [draggedRows, setDraggedRows] = useState<any[]>([]);

    return (
        <DragContext.Provider value={{ draggedRows, setDraggedRows }}>
            {children}
        </DragContext.Provider>
    );
};

export const useDragContext = () => useContext(DragContext);
