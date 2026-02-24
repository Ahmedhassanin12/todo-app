import { create } from "zustand";
import { mutative } from "zustand-mutative";
import type { ColumnId, ModalState, Task } from "@/modules/Tasks/types/task.types";

type Pages = Record<ColumnId, number>;

interface TaskStoreState {
  search: string;
  activeTaskId: number | null;
  pages: Pages;
  modal: ModalState;
}

interface TaskStoreActions {
  setSearch: (value: string) => void;
  setActiveTaskId: (id: number | null) => void;
  incrementPage: (columnId: ColumnId) => void;
  resetPages: () => void;
  openCreateModal: (column: ColumnId) => void;
  openEditModal: (task: Task) => void;
  setModalField: <K extends keyof ModalState>(field: K, value: ModalState[K]) => void;
  closeModal: () => void;
}

type TaskStore = TaskStoreState & TaskStoreActions;

const INITIAL_PAGES: Pages = {
  backlog: 1,
  in_progress: 1,
  review: 1,
  done: 1,
};

const INITIAL_MODAL: ModalState = {
  open: false,
  mode: "create",
  taskId: null,
  column: null,
  title: "",
  description: "",
};

export const useTaskStore = create<TaskStore>()(
  mutative((set) => ({
    search: "",
    activeTaskId: null,
    pages: { ...INITIAL_PAGES },
    modal: { ...INITIAL_MODAL },

    setSearch: (value) =>
      set((state) => {
        state.search = value;
      }),

    setActiveTaskId: (id) =>
      set((state) => {
        state.activeTaskId = id;
      }),

    incrementPage: (columnId) =>
      set((state) => {
        state.pages[columnId] += 1;
      }),

    resetPages: () =>
      set((state) => {
        state.pages = { ...INITIAL_PAGES };
      }),

    openCreateModal: (column) =>
      set((state) => {
        state.modal = {
          open: true,
          mode: "create",
          taskId: null,
          column,
          title: "",
          description: "",
        };
      }),

    openEditModal: (task) =>
      set((state) => {
        state.modal = {
          open: true,
          mode: "edit",
          taskId: task.id,
          column: task.column,
          title: task.title,
          description: task.description,
        };
      }),

    setModalField: (field, value) =>
      set((state) => {
        (state.modal as ModalState)[field] = value;
      }),

    closeModal: () =>
      set((state) => {
        state.modal = { ...INITIAL_MODAL };
      }),
  }))
);
