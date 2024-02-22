import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { TaskPriorities, TaskStatuses, TaskType } from "../../../api/todolists-api"
import { actions as todolistActions } from "../todolists-reducer/todolists-reducer"

const initialState: TasksType = {}

const slice = createSlice({
  name: "tasks",
  initialState: initialState,
  reducers: {
    createTaskAC(state, action: PayloadAction<{ task: TaskType }>) {
      state[action.payload.task.todoListId].unshift(action.payload.task)
    },
    deleteTaskAC(state, action: PayloadAction<{ todolistId: string; id: string }>) {
      const tasks = state[action.payload.todolistId]
      const index = tasks.findIndex((t) => t.id === action.payload.id)
      tasks.splice(index, 1)
    },
    updateTaskAC(state, action: PayloadAction<{ todolistId: string; id: string; model: UpdateDomainModelTaskType }>) {
      const tasks = state[action.payload.todolistId]
      const index = tasks.findIndex((t) => t.id === action.payload.id)
      tasks[index] = { ...tasks[index], ...action.payload.model }
    },
    setTasksAC(state, action: PayloadAction<{ todolistId: string; tasks: TaskType[] }>) {
      state[action.payload.todolistId] = action.payload.tasks
    },
  },
  extraReducers: (builder) => {
    builder.addCase(todolistActions.createTodolist, (state, action) => {
      state[action.payload.todolist.id] = []
    })
    builder.addCase(todolistActions.deleteTodolist, (state, action) => {
      delete state[action.payload.id]
    })
    builder.addCase(todolistActions.setTodolists, (state, action) => {
      action.payload.todolists.forEach((tl) => (state[tl.id] = []))
    })
    builder.addCase(todolistActions.clearData, () => {
      return {}
    })
  },
})

export const tasksReducer = slice.reducer
export const actions = slice.actions

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