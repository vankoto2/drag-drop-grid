import React, { useState } from 'react';
import { DataGrid, GridColDef, GridPaginationModel, GridRowSelectionModel } from '@mui/x-data-grid';
import { useDrag, useDrop } from 'react-dnd';
import { useDragContext } from '../context/DragContext';

type RowData = {
    id: number;
    name: string;
};

type GridProps = {
    gridData: RowData[];
    setGridData: React.Dispatch<React.SetStateAction<RowData[]>>;
    onDropRow: (rows: RowData[]) => void;
    disablePaging?: boolean;
};

const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'name', headerName: 'Name', width: 150 },
];

const DraggableGrid: React.FC<GridProps> = ({ gridData, onDropRow, disablePaging = false }) => {
    // Access dragged rows from context
    const { draggedRows, setDraggedRows } = useDragContext();

    const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
        pageSize: 5,
        page: 0,
    });

    // Handle dragging rows
    const [{ isDragging }, dragRef] = useDrag({
        type: 'ROW',
        item: { rows: gridData },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    // Set up a drop zone for drag-and-drop
    const [, dropRef] = useDrop({
        accept: 'ROW',
        drop: () => {
            onDropRow(draggedRows); // Only move the selected (dragged) rows
            setDraggedRows([]); // Clear dragged rows after dropping
        },
    });

    const handleRowSelection = (selectionModel: GridRowSelectionModel) => {
        // Filter the selected rows based on the selection model
        const selectedRows = gridData.filter((row) => selectionModel.includes(row.id));
        setDraggedRows(selectedRows); // Update the context with selected rows
    };

    // Fallback UI for empty grid
    if (!gridData || gridData.length === 0) {
        return (
            <div
                ref={(node) => {
                    dragRef(node);
                    dropRef(node);
                }} // Attach the drop zone functionality to this div
                style={{
                    height: 400,
                    width: '100%',
                    border: '1px dashed gray',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '16px',
                    color: '#888',
                }}
            >
                No data available
            </div>
        );
    }

    return (
        <div
            ref={(node) => {
                dragRef(node);
                dropRef(node);
            }} // Attach the drop zone functionality to this div
            style={{
                opacity: isDragging ? 0.5 : 1,
                height: 400,
                width: '100%',
                border: '1px dashed gray',
                padding: '10px',
            }}
        >
            <DataGrid
                rows={gridData} // Rows displayed in the grid
                columns={columns} // Grid columns
                paginationModel={disablePaging ? undefined : paginationModel} // Enable paging only if not disabled
                onPaginationModelChange={!disablePaging ? setPaginationModel : undefined} // Update pagination if enabled
                checkboxSelection // Enable row selection via checkboxes
                pageSizeOptions={!disablePaging ? [5, 10, 20] : undefined} // Allow page size options only if paging is enabled
                onRowSelectionModelChange={(selectionModel) =>
                    handleRowSelection(selectionModel as GridRowSelectionModel)
                } // Handle row selection changes
            />
        </div>
    );
};

export default DraggableGrid;
