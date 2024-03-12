import { createSlice } from "@reduxjs/toolkit"
import { TaskPriorities, TaskStatuses, TaskType } from "../../api/todolists-api"
import { actions as todolistActions } from "../todolists/todolists-reducer"
import { createTaskTC, deleteTaskTC, fetchTasks, updateTaskTC } from "./tasks-thunks"

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
    builder.addCase(createTaskTC.fulfilled, (state, action) => {
      state[action.payload.todolistId].unshift(action.payload.task)
    })
    builder.addCase(deleteTaskTC.fulfilled, (state, action) => {
      const tasks = state[action.payload.todolistId]
      const index = tasks.findIndex((t) => t.id === action.payload.id)
      tasks.splice(index, 1)
    })
    builder.addCase(updateTaskTC.fulfilled, (state, action) => {
      if (action.payload) {
        const tasks = state[action.payload.todolistId]
        const index = tasks.findIndex((t) => (action.payload ? t.id === action.payload.id : t))
        tasks[index] = { ...tasks[index], ...action.meta.arg.model }
      }
    })
    builder.addCase(todolistActions.createTodolist, (state, action) => {
      state[action.payload.id] = []
    })
    builder.addCase(todolistActions.deleteTodolist, (state, action) => {
      delete state[action.payload]
    })
    builder.addCase(todolistActions.setTodolists, (state, action) => {
      action.payload.forEach((tl) => (state[tl.id] = []))
    })
    builder.addCase(todolistActions.clearData, () => {
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
