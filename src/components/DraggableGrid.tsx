import React, { useState, useMemo, useCallback, JSX } from "react";
import {
    DataGrid,
    GridColDef,
    GridPaginationModel,
    GridRowSelectionModel,
} from "@mui/x-data-grid";
import { useDrag, useDrop } from "react-dnd";
import { useDragContext } from "../context/DragContext";
import DraggableRow from "./DraggableRow";

type GridProps<T extends { id: number }> = {
    gridData: T[]; // Generic data type
    setGridData: React.Dispatch<React.SetStateAction<T[]>>;
    onDropRow: (rows: T[]) => void;
    disablePaging?: boolean;
};

// The DraggableGrid component
const DraggableGrid = <T extends { id: number }>({
    gridData,
    setGridData, // Now receiving the state setter
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
            const uniqueRows = draggedRows.filter(
                (draggedRow) => !gridData.some((row) => row.id === draggedRow.id)
            );
            // Remove the moved rows from the source grid
            setGridData((prev) =>
                prev.filter((row) => !draggedRows.some((draggedRow) => draggedRow.id === row.id))
            );
            onDropRow(uniqueRows); // Handle the rows being dropped
            setDraggedRows([]); // Clear dragged rows after dropping
        },
    });

    const handleRowSelection = useCallback(
        (selectionModel: GridRowSelectionModel) => {
            const selectedRows = gridData.filter((row) => selectionModel.includes(row.id));
            setDraggedRows(selectedRows); // Update dragged rows in the context
        },
        [gridData, setDraggedRows]
    );

    const moveRow = (dragIndex: number, hoverIndex: number) => {
        const updatedRows = [...gridData];
        const [movedRow] = updatedRows.splice(dragIndex, 1); // Remove the dragged row
        updatedRows.splice(hoverIndex, 0, movedRow); // Insert it at the new position
        setGridData(updatedRows); // Update the grid's state
    };


    const columns: GridColDef[] = useMemo(
        () =>
            Object.keys(gridData[0] || {}).map((key) => ({
                field: key,
                headerName: key.charAt(0).toUpperCase() + key.slice(1),
                width: 150,
                renderCell: (params) => {
                    // Render the DraggableRow component for each row
                    if (key === "id") {
                        return <DraggableRow
                            row={params.row}
                            index={gridData.indexOf(params.row)}
                            moveRow={moveRow} // Pass moveRow to handle reordering
                        />
                    }
                    return params.value; // Default rendering for other columns
                },
            })),
        [gridData]
    );

    if (!gridData || gridData.length === 0) {
        return (
            <div
                ref={(node) => {
                    dragRef(node);
                    dropRef(node);
                }}
                style={{
                    display: "flex",
                    justifyContent: "center",
                    width: "100%",
                    alignItems: "center",
                    flexDirection: "column",
                    height: "400px",
                    border: "1px dashed gray",
                    borderRadius: "8px",
                    backgroundColor: "#f9f9f9",
                    color: "#7f8c8d",
                }}>
                <svg
                    style={{ marginBottom: "10px" }}
                    xmlns="http://www.w3.org/2000/svg"
                    width="64"
                    height="64"
                    fill="#7f8c8d"
                    viewBox="0 0 24 24"
                >
                    <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm1-15h-2v2h2V7zm0 4h-2v6h2v-6z" />
                </svg>
                <h1>No Data Available</h1>
                <p>There is currently no data to display. Please try again later.</p>
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
                columns={columns as GridColDef[]}
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

export default React.memo(
    DraggableGrid
) as <T extends { id: number }>(props: GridProps<T>) => JSX.Element;

