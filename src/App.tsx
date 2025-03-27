import React, { useEffect, useState, useCallback } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DragContextProvider } from './context/DragContext';
import ErrorBoundary from './components/ErrorBoundary';
import DraggableGrid from './components/DraggableGrid';
import DragOverlay from './components/DragOverlay';

type RowData = {
  id: number;
  name: string;
};

const App: React.FC = () => {
  const [sourceGridData, setSourceGridData] = useState<RowData[]>([]);
  const [targetGridData, setTargetGridData] = useState<RowData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
          const sourceResponse = await fetch("http://localhost:3001/api/sourceGridData");
          const targetResponse = await fetch("http://localhost:3001/api/targetGridData");
    
        const sourceData = await sourceResponse.json()
        const targetData = await targetResponse.json()
    
        setSourceGridData(sourceData);
        setTargetGridData(targetData);
      } catch (error) {
        console.log(error);
        
        setError("Critical Error: Failed to load data from the server."); // Unexpected error
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const updateSourceGridData = async (newData: any) => {
    await fetch("http://localhost:3001/api/sourceGridData", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newData),
      });;
  };

  const updateTargetGridData = async (newData: any) => {
    await fetch("http://localhost:3001/api/targetGridData", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newData),
    });
  };


  const handleDropToTarget = useCallback(
    async (droppedRows: RowData[]) => {
      const updatedSourceGrid = sourceGridData.filter(
        (row) => !droppedRows.some((droppedRow) => droppedRow.id === row.id)
      );
      const updatedTargetGrid = [...targetGridData, ...droppedRows];

      setSourceGridData(updatedSourceGrid);
      setTargetGridData(updatedTargetGrid);

      // Update the mock API
      await updateSourceGridData(updatedSourceGrid);
      await updateTargetGridData(updatedTargetGrid);
    },
    [sourceGridData, targetGridData]
  );


  const handleDropToSource = useCallback(
    async (droppedRows: RowData[]) => {
      const updatedTargetGrid = targetGridData.filter(
        (row) => !droppedRows.some((droppedRow) => droppedRow.id === row.id)
      );
      const updatedSourceGrid = [...sourceGridData, ...droppedRows];

      setTargetGridData(updatedTargetGrid);
      setSourceGridData(updatedSourceGrid);

      // Update the mock API
      await updateSourceGridData(updatedSourceGrid);
      await updateTargetGridData(updatedTargetGrid);
    },
    [sourceGridData, targetGridData]
  );

  if (loading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <div
          style={{
            width: "50px",
            height: "50px",
            border: "5px solid rgba(0, 0, 0, 0.1)",
            borderTop: "5px solid #3498db",
            borderRadius: "50%",
            animation: "spin 1s linear infinite",
          }}
        ></div>
        <style>
          {`
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `}
        </style>
      </div>
    );
  }

  // Display critical error visually
  if (error) {
    return (
      <div style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        height: "100vh",
        color: "#e74c3c",
      }}>
        <svg
          style={{ marginBottom: "20px" }}
          xmlns="http://www.w3.org/2000/svg"
          width="64"
          height="64"
          fill="#e74c3c"
          viewBox="0 0 24 24"
        >
          <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm1-15h-2v2h2V7zm0 4h-2v6h2v-6z" />
        </svg>
        <h1>Critical Error</h1>
        <p>{error}</p>
      </div>
    );
  }

  if (!sourceGridData.length && !targetGridData.length) {
    return <div>Error loading data. Please try again later.</div>;
  }


  return (
    <DndProvider backend={HTML5Backend}>
      <DragContextProvider>
        <ErrorBoundary>
          <div style={{
            margin: '20px',
            padding: '20px',
            textAlign: "center",
            fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
          }}>
            <h1 style={{ marginBottom: '30px', color: '#2c3e50' }}>MUI Drag and Drop Grids</h1>
            <DragOverlay />
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '40px',
              justifyContent: 'center',
              alignItems: 'flex-start',
            }}>
              {/* Source Grid */}
              <div style={{
                width: '45%',
                minWidth: '300px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                borderRadius: '8px',
                overflow: 'hidden',
                border: '1px solid #ccc',
                backgroundColor: '#ecf0f1',
                padding: '20px',
              }}>
                <h2 style={{ marginBottom: '10px', color: '#34495e' }}>Source Grid</h2>
                <DraggableGrid
                  gridData={sourceGridData}
                  setGridData={setSourceGridData}
                  onDropRow={handleDropToSource} // External callback function
                />
              </div>

              {/* Target Grid */}
              <div style={{
                width: '45%',
                minWidth: '300px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                borderRadius: '8px',
                overflow: 'hidden',
                border: '1px solid #ccc',
                backgroundColor: '#ecf0f1',
                padding: '20px',
              }}>
                <h2 style={{ marginBottom: '10px', color: '#34495e' }}>Target Grid</h2>
                <DraggableGrid
                  gridData={targetGridData}
                  setGridData={setTargetGridData}
                  onDropRow={handleDropToTarget} // External callback function
                  disablePaging={true} // Disable paging for the target grid
                />
              </div>
            </div>
          </div>
        </ErrorBoundary>
      </DragContextProvider>
    </DndProvider>
  );
};

export default App;
