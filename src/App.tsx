import React, { useEffect, useState, useCallback } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DragContextProvider } from './context/DragContext';
import ErrorBoundary from './components/ErrorBoundary';
import DraggableGrid from './components/DraggableGrid';
// import { fetchData, updateData } from './services/apiService';
import { fetchData } from './services/apiService';
import DragOverlay from './components/DragOverlay';

type RowData = {
  id: number;
  name: string;
};

const App: React.FC = () => {
  const [sourceGridData, setSourceGridData] = useState<RowData[]>([]);
  const [targetGridData, setTargetGridData] = useState<RowData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchData();
        setSourceGridData(data); // Fill the source grid with data from the server
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const handleDropToTarget = useCallback(
    (droppedRows: RowData[]) => {
      const updatedSourceGrid = sourceGridData.filter(
        (row) => !droppedRows.some((droppedRow) => droppedRow.id === row.id)
      );
      const updatedTargetGrid = [...targetGridData, ...droppedRows];

      setSourceGridData(updatedSourceGrid);
      setTargetGridData(updatedTargetGrid);
      
      // Persist the updated data to the API
      // try {
      //   await updateData({ source: updatedSourceGrid, target: updatedTargetGrid });
      // } catch (error) {
      //   console.error("Failed to save data:", error);
      // }
    },
    [sourceGridData, targetGridData]
  );


  const handleDropToSource = useCallback(
    (droppedRows: RowData[]) => {
      const updatedTargetGrid = targetGridData.filter(
        (row) => !droppedRows.some((droppedRow) => droppedRow.id === row.id)
      );
      const updatedSourceGrid = [...sourceGridData, ...droppedRows];

      setTargetGridData(updatedTargetGrid);
      setSourceGridData(updatedSourceGrid);
    },
    [sourceGridData, targetGridData]
  );

  if (loading) {
    return <div>Loading data...</div>;
  }

  if (!sourceGridData.length && !targetGridData.length) {
    return <div>Error loading data. Please try again later.</div>;
  }


  return (
    <DndProvider backend={HTML5Backend}>
      <DragContextProvider>
        <ErrorBoundary>
          <div style={{ margin: '20px' }}>
            <h1>MUI Drag and Drop</h1>
            <DragOverlay />
            <div style={{ display: 'flex', gap: '20px' }}>
              {/* Source Grid */}
              <DraggableGrid
                gridData={sourceGridData}
                setGridData={setSourceGridData}
                onDropRow={handleDropToSource} // External callback function
              />
              {/* Target Grid */}
              <DraggableGrid
                gridData={targetGridData}
                setGridData={setTargetGridData}
                onDropRow={handleDropToTarget} // External callback function
                disablePaging={true} // Disable paging for the target grid
              />
            </div>
          </div>
        </ErrorBoundary>
      </DragContextProvider>
    </DndProvider>
  );
};

export default App;
