import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { TodolistType } from "../../../api/todolists-api"

const initialState: TodolistDomainType[] = []

const slice = createSlice({
  name: "todolists",
  initialState: initialState,
  reducers: {
    createTodolist(state, action: PayloadAction<{ todolist: TodolistType }>) {
      state.unshift({ ...action.payload.todolist, filter: "all" })
    },
    deleteTodolist(state, action: PayloadAction<{ id: string }>) {
      const index = state.findIndex((tl) => tl.id === action.payload.id)
      state.splice(index, 1)
    },
    updateTitle(state, action: PayloadAction<{ id: string; title: string }>) {
      const index = state.findIndex((tl) => tl.id === action.payload.id)
      state[index].title = action.payload.title
    },
    changeFilter(state, action: PayloadAction<{ id: string; filter: FilterType }>) {
      const index = state.findIndex((tl) => tl.id === action.payload.id)
      state[index].filter = action.payload.filter
    },
    setTodolists(state, action: PayloadAction<{ todolists: TodolistType[] }>) {
      return action.payload.todolists.map((tl) => ({ ...tl, filter: "all" }))
    },
    clearData(state, action: PayloadAction) {
      return (state = [])
    },
  },
})

export const todolistsReducer = slice.reducer
export const actions = slice.actions

export type TodolistDomainType = TodolistType & {
  filter: FilterType
}
export type FilterType = "all" | "active" | "completed"
