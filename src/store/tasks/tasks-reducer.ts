import { createSlice } from "@reduxjs/toolkit"
import { TaskPriorities, TaskStatuses, TaskType } from "../../api/todolists-api"
import { createTask, deleteTask, fetchTasks, updateTask } from "./tasks-thunks"
import { thunks, reducer } from "../todolists/"

const initialState: TasksType = {}

const slice = createSlice({
  name: "tasks",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchTasks.fulfilled, (state, action) => {
      if (action.payload) {
        state[action.payload.todolistId] = action.payload.tasks
      }
    })
    builder.addCase(createTask.fulfilled, (state, action) => {
      if (action.payload) {
        state[action.payload.todolistId].unshift(action.payload.task)
      }
    })
    builder.addCase(deleteTask.fulfilled, (state, action) => {
      const tasks = state[action.payload.todolistId]
      const index = tasks.findIndex((t) => t.id === action.payload.id)
      tasks.splice(index, 1)
    })
    builder.addCase(updateTask.fulfilled, (state, action) => {
      if (action.payload) {
        const tasks = state[action.payload.todolistId]
        const index = tasks.findIndex((t) => t.id === action.payload?.id)
        tasks[index] = { ...tasks[index], ...action.payload.model }
      }
    })
    builder.addCase(thunks.createTodolist.fulfilled, (state, action) => {
      if (action.payload) {
        state[action.payload.todolist.id] = []
      }
    })
    builder.addCase(thunks.deleteTodolist.fulfilled, (state, action) => {
      if (action.payload) {
        delete state[action.payload?.id]
      }
    })
    builder.addCase(thunks.fetchTodolists.fulfilled, (state, action) => {
      action.payload?.data.forEach((tl) => (state[tl.id] = []))
    })
    builder.addCase(reducer.clearData, () => {
      return {}
    })
  },
})

export const tasksReducer = slice.reducer

export type TasksType = {
  [todolistId: string]: TaskType[]
}
export type UpdateDomainModelTaskType = {
  description?: string
  title?: string
  status?: TaskStatuses
  priority?: TaskPriorities
  startDate?: string
  deadline?: string
}
