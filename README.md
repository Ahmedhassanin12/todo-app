# Task Management Kanban Board

A modern, responsive Task Management application built with Next.js, Material UI, and TanStack Query. It features a fully functional Kanban board with drag-and-drop capabilities, real-time data persistence using JSON Server, and a sleek, user-friendly interface.

## 🚀 Features

- **Kanban Board**: Organize tasks across multiple columns: Backlog, In Progress, Review, and Done.
- **Drag and Drop**: Seamlessly move tasks between columns using @dnd-kit.
- **Task Management**: Create, edit, and delete tasks with detailed titles and descriptions.
- **Search & Filter**: Quickly find tasks using the global search bar in the header.
- **Pagination**: Efficiently handles large task lists with "Load more" functionality and automatic pagination.
- **Responsive Design**: Optimized for various screen sizes using Material UI's flexible grid system.
- **Data Persistence**: Uses a local JSON server to persist task data across sessions.

## 🛠️ Tech Stack

- **Framework**: [Next.js 15+](https://nextjs.org/) (App Router)
- **UI Components**: [Material UI (MUI)](https://mui.com/)
- **State Management**: [Zustand](https://zustand-demo.pmnd.rs/) with [Zustand Mutative](https://github.com/mweststrate/zustand-mutative)
- **Data Fetching**: [TanStack Query (React Query)](https://tanstack.com/query/latest)
- **Drag and Drop**: [@dnd-kit/core](https://dnd-kit.com/) & [@dnd-kit/sortable](https://dnd-kit.com/)
- **API Client**: [Axios](https://axios-http.com/)
- **Backend Mock**: [JSON Server](https://github.com/typicode/json-server)

## 🏁 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher)
- npm or yarn

### Installation

1.  Clone the repository:
    ```bash
    git clone [your-repo-url]
    cd todo-app
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

### Running the Project

You need to run **two** separate processes for the application to function correctly:

1.  **Start the JSON Server (Backend)**:
    Open a terminal and run:
    ```bash
    npm run json-server
    ```
    This will start the mock backend on `http://localhost:4000`.

2.  **Start the Next.js App (Frontend)**:
    Open another terminal and run:
    ```bash
    npm run dev
    ```
    This will start the frontend on `http://localhost:3000`.

### 📝 Project Structure

- `app/`: Next.js App Router pages and layouts.
- `components/`: Reusable UI components (buttons, cards, headers).
- `modules/`: Feature-specific logic (Tasks store, hooks, types, constants).
- `api/`: Axios configuration and API service definitions.
- `db.json`: Database file for JSON Server.
