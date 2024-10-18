# Kanban Board Application

## Overview

This project is a **Kanban Board Application** developed in JavaScript, designed to help users organize tasks into columns and cards. It supports the functionality of adding, editing, deleting, and moving tasks (or cards) between different columns on the board. The state of the board is saved locally in the browser's `localStorage`, ensuring the user’s tasks remain persistent even after a page refresh.

## Features

- **Add Tasks**: Easily add new tasks (cards) to columns.
- **Edit Tasks**: Inline editing allows tasks to be modified after creation.
- **Drag and Drop**: Drag cards to reorder them or move them between columns.
- **Delete Tasks**: Remove tasks from the board with the delete button.
- **Save State**: Automatically saves the board’s state to `localStorage`.
- **Login Simulation**: Simple login functionality to manage user sessions.

## Installation

1. **Clone the repository**:
    ```bash
    git clone https://github.com/khaled99xp/kanban-board.git
    ```

2. **Navigate to the project directory**:
    ```bash
    cd kanban-board
    ```

3. **Open the `index.html` file in a browser**:
    - You can use Live Server in VSCode or simply double-click the `index.html` file to open it in your default browser.

## File Structure

- `index.html`: The main HTML file for the project.
- `style.css`: The CSS file containing styles for the board.
- `modules/`: A folder containing modular JavaScript files.
  - `login.mjs`: Handles user login functionality.
  - `setupAddButton.mjs`: Handles the logic for adding new tasks to columns.
  - `setupDragBox.mjs`: Manages drag-and-drop functionality for entire columns.
  - `setupDragCard.mjs`: Manages drag-and-drop functionality for individual cards.
- `localStorage.js`: Handles saving and loading data from `localStorage`.

## Usage

1. **Login**:
   - The application requires a simple login to access the board.
   - Enter any username to start using the board.

2. **Add New Tasks**:
   - To add a task, click on the "Add Card" button in any column and type in the task name.

3. **Edit Tasks**:
   - Click on any task to edit its content. Press "Enter" or click outside the input field to save the changes.

4. **Move Tasks**:
   - Drag tasks between columns or reorder them within the same column.

5. **Delete Tasks**:
   - Click the "Delete" button on any task to remove it from the board.

## Technologies Used

- **JavaScript (ES Modules)**: The project uses modular JavaScript to organize the code into separate files.
- **HTML5**: For structuring the content.
- **CSS3**: For styling the Kanban board.
- **LocalStorage**: Used to save the state of the board persistently.



## License

This project is open source and available under the [MIT License](LICENSE).
