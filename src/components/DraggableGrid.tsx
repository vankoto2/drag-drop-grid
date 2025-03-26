import React, { useState } from "react";
import {
    DataGrid,
    GridColDef,
    GridPaginationModel,
    GridRowSelectionModel,
} from "@mui/x-data-grid";
import { useDrag, useDrop } from "react-dnd";
import { useDragContext } from "../context/DragContext";

type GridProps<T> = {
    gridData: T[];
    setGridData: React.Dispatch<React.SetStateAction<T[]>>;
    onDropRow: (rows: T[]) => void;
    disablePaging?: boolean;
};

// The DraggableGrid component
const DraggableGrid = <T extends { id: number }>({
    gridData,
    onDropRow,
    disablePaging = false,
}: GridProps<T>) => {
    const { draggedRows, setDraggedRows } = useDragContext();

    const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
        pageSize: 5,
        page: 0,
    });

    // Handle dragging rows
    const [{ isDragging }, dragRef] = useDrag({
        type: "ROW",
        item: { rows: draggedRows },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    // Set up a drop zone for drag-and-drop
    const [, dropRef] = useDrop({
        accept: "ROW",
        drop: () => {
            onDropRow(draggedRows); // Move only the selected rows Execute the external callback function
            setDraggedRows([]); // Clear the dragged rows after dropping
        },
    });

    const handleRowSelection = (selectionModel: GridRowSelectionModel) => {
        const selectedRows = gridData.filter((row) => selectionModel.includes(row.id));
        setDraggedRows(selectedRows); // Update dragged rows in the context
    };

    if (!gridData || gridData.length === 0) {
        return (
            <div
                ref={(node) => {
                    dragRef(node);
                    dropRef(node);
                }}
                style={{
                    height: 400,
                    width: "100%",
                    border: "1px dashed gray",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "16px",
                    color: "#888",
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
            }}
            style={{
                opacity: isDragging ? 0.5 : 1,
                height: 400,
                width: "100%",
                border: "1px dashed gray",
                padding: "10px",
            }}
        >
            <DataGrid
                rows={gridData}
                columns={Object.keys(gridData[0]).map((key) => ({
                    field: key,
                    headerName: key.charAt(0).toUpperCase() + key.slice(1),
                    width: 150,
                })) as GridColDef[]}
                paginationModel={disablePaging ? undefined : paginationModel}
                onPaginationModelChange={!disablePaging ? setPaginationModel : undefined}
                checkboxSelection
                pageSizeOptions={!disablePaging ? [5, 10, 20] : undefined}
                onRowSelectionModelChange={(selectionModel) =>
                    handleRowSelection(selectionModel as GridRowSelectionModel)
                }
            />
        </div>
    );
};

export default DraggableGrid;
