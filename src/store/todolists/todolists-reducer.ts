import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { TodolistType } from "../../api/todolists-api"
import { createTodolist, deleteTodolist, fetchTodolists, updateTitle } from "./todolists-thunks"

const initialState: TodolistDomainType[] = []

const slice = createSlice({
  name: "todolists",
  initialState: initialState,
  reducers: {
    changeFilter(state, action: PayloadAction<{ id: string; filter: FilterType }>) {
      const index = state.findIndex((tl) => tl.id === action.payload.id)
      state[index].filter = action.payload.filter
    },
    clearData(state, action: PayloadAction) {
      return (state = [])
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchTodolists.fulfilled, (state, action) => {
      if (action.payload) {
        return action.payload.data.map((tl) => ({ ...tl, filter: "all" }))
      }
    })
    builder.addCase(createTodolist.fulfilled, (state, action) => {
      if (action.payload) {
        state.unshift({ ...action.payload.todolist, filter: "all" })
      }
    })
    builder.addCase(deleteTodolist.fulfilled, (state, action) => {
      const index = state.findIndex((tl) => tl.id === action.payload?.id)
      state.splice(index, 1)
    })
    builder.addCase(updateTitle.fulfilled, (state, action) => {
      if (action.payload) {
        const index = state.findIndex((tl) => tl.id === action.payload?.id)
        state[index].title = action.payload.title
      }
    })
  },
})

export const todolistsReducer = slice.reducer
export const { changeFilter, clearData } = slice.actions

export type TodolistDomainType = TodolistType & {
  filter: FilterType
}
export type FilterType = "all" | "active" | "completed"
