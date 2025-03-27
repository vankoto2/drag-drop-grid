# Draggable Grid with MUI Data Grid and React DND

## Overview
This project implements a generic drag-and-drop component built on the MUI Data Grid. Users can move rows between two tables or reorder rows within a single table. Data persistence and modification are handled via an API, and a dynamic drag preview provides an enhanced user experience.

## Features
- **Drag-and-Drop Functionality**: Move rows between tables or reorder them within the same table using `react-dnd`.
- **API Integration**: Persist changes to data via API calls.
- **Dynamic Preview**: Display an overlay of dragged rows with a badge showing the count of rows being moved.
- **Paging Support**: Handle paginated data properly across multiple pages.
- **State Management**: Use React Context API to manage the state of dragged rows.
- **Error Handling**: Provide visual feedback for expected warnings and unexpected critical errors.

## Technologies Used
- **React**: TypeScript-based implementation for type safety.
- **MUI Data Grid**: Interactive and customizable grid tables.
- **React DND**: Drag-and-drop library for seamless row movement.
- **API Integration**: ata persistence using a custom mock server built with Express.js and backed by a mock database (mockDb.js).
- **React Context API**: Manage global state for dragged rows.
- **Testing**: Reliable tests using Jest and React Testing Library.

## Key Functionalities
1. **Row Selection**:
   - Select single or multiple rows within the grid.
   - Drag them to another table or reorder within the same table.
2. **Drag Preview**:
   - Display the selected rows as an overlay.
   - Show a badge indicating the total count of rows being dragged.
3. **Paging Support**:
   - Handle pagination when moving rows between grids.
   - Disable paging in the target grid for easier row placement.
4. **Edge Case Handling**:
   - Handle scenarios like moving into empty grids.
   - Prevent duplication of rows.
5. **Processing After Drop**:
   - Use callback functions to process actions after dropping rows.

## Installation and Setup
1. Install dependencies:
### npm install
2. Start the mock API server:
### node mockServer.js
By default, the server will run at http://localhost:3001.

Backend endpoints:

GET /api/sourceGridData: Retrieve source grid data.

PUT /api/sourceGridData: Update source grid data.

GET /api/targetGridData: Retrieve target grid data.

PUT /api/targetGridData: Update target grid data.

3. Start the development server:
### npm start
