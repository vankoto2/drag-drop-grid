import React, { createContext, useContext, useState } from 'react';

type DragContextType = {
    draggedRows: any[];
    setDraggedRows: (rows: any[]) => void;
};

const DragContext = createContext<DragContextType | undefined>(undefined);

export const DragContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [draggedRows, setDraggedRows] = useState<any[]>([]);

    return (
        <DragContext.Provider value={{ draggedRows, setDraggedRows }}>
            {children}
        </DragContext.Provider>
    );
};

export const useDragContext = () => {
    const context = useContext(DragContext);
    if (!context) {
        throw new Error('useDragContext must be used within DragContextProvider');
    }
    return context;
};
