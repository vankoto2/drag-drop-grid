import React, { useEffect, useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DragContextProvider } from './context/DragContext';
import ErrorBoundary from './components/ErrorBoundary';
import DraggableGrid from './components/DraggableGrid';
import { fetchData } from './services/apiService';

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

  const handleDropToTarget = (droppedRows: RowData[]) => {
    setSourceGridData((prev) =>
      prev.filter((row) => !droppedRows.some((droppedRow) => droppedRow.id === row.id))
    );
    setTargetGridData((prev) => [...prev, ...droppedRows]);
  };

  const handleDropToSource = (droppedRows: RowData[]) => {
    setTargetGridData((prev) =>
      prev.filter((row) => !droppedRows.some((droppedRow) => droppedRow.id === row.id))
    );
    setSourceGridData((prev) => [...prev, ...droppedRows]);
  };

  if (loading) {
    return <div>Loading data...</div>;
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <DragContextProvider>
        <ErrorBoundary>
          <div style={{ margin: '20px' }}>
            <h1>MUI Drag and Drop</h1>
            <div style={{ display: 'flex', gap: '20px' }}>
              {/* Source Grid */}
              <DraggableGrid
                gridData={sourceGridData}
                setGridData={setSourceGridData}
                onDropRow={handleDropToSource}
              />
              {/* Target Grid */}
              <DraggableGrid
                gridData={targetGridData}
                setGridData={setTargetGridData}
                onDropRow={handleDropToTarget}
              />
            </div>
          </div>
        </ErrorBoundary>
      </DragContextProvider>
    </DndProvider>
  );
};

export default App;
