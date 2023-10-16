import { createSlice, configureStore } from '@reduxjs/toolkit';
import { ITask } from './utils/types';

interface TaskStoreState {
  value: ITask[];
}

const initialState: TaskStoreState = {
  value: [],
};

const tasksSlice = createSlice({
  name: 'Tasks',
  initialState,
  reducers: {
    setTasks: (state, action: { payload: ITask[] }) => {
      return {
        ...state,
        value: action.payload,
      };
    },
    addTask: (state, action: { payload: ITask }) => {
      return {
        ...state,
        value: [...state.value, action.payload],
      };
    },
    updateTask: (state, action: { payload: ITask }) => {
      const newTasksArray = [
        ...state.value.filter((task) => task.id !== action.payload.id),
        { ...action.payload },
      ].sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );

      return {
        ...state,
        value: newTasksArray,
      };
    },
    deleteTask: (state, action: { payload: number }) => {
      return {
        ...state,
        value: [...state.value.filter((task) => task.id !== action.payload)],
      };
    },
    deleteAllTasks: (state) => {
      return {
        ...state,
        value: [],
      };
    },
  },
});

const store = configureStore({
  reducer: tasksSlice.reducer,
});

export const { setTasks, addTask, updateTask, deleteTask, deleteAllTasks } =
  tasksSlice.actions;

export const selectTasks: (state: TaskStoreState) => ITask[] = (state) =>
  state.value;

export default store;
