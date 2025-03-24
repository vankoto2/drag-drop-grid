import { useState, useCallback } from "react";

export const useDragState = () => {
  const [draggedRows, setDraggedRows] = useState<any[]>([]);

  const handleDragStart = useCallback((rows: any[]) => {
    setDraggedRows(rows);
  }, []);

  const handleDragEnd = useCallback(() => {
    setDraggedRows([]);
  }, []);

  return { draggedRows, handleDragStart, handleDragEnd };
};
