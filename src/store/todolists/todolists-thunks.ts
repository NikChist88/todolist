import { todolistsAPI } from "../../api/todolists-api"
import { AppRootState } from "../store"
import { setAppStatus, setAppError } from "../app/app-reducer"
import { createAsyncThunk } from "@reduxjs/toolkit"

export const fetchTodolistsTC = createAsyncThunk(
  "todolists/fetchTodolists",
  async (param, { dispatch, rejectWithValue }) => {
    dispatch(setAppStatus("loading"))
    try {
      const { data, status } = await todolistsAPI.getTodolists()
      if (status === 200) {
        dispatch(setAppStatus("succeeded"))
        return { data }
      } else {
        dispatch(setAppStatus("failed"))
        dispatch(setAppError({ message: "An error occured!", severity: "error" }))
      }
    } catch (err) {
      return rejectWithValue(err)
    }
  }
)

export const createTodolistTC = createAsyncThunk(
  "todolists/createTodolist",
  async (title: string, { dispatch, rejectWithValue }) => {
    try {
      const { data } = await todolistsAPI.createTodolist(title)
      if (data.resultCode === 0) {
        return { todolist: data.data.item }
      } else {
        dispatch(setAppError({ message: data.messages.toString(), severity: "error" }))
      }
    } catch (err) {
      return rejectWithValue(err)
    }
  }
)

export const deleteTodolistTC = createAsyncThunk(
  "todolists/deleteTodolist",
  async (id: string, { dispatch, rejectWithValue }) => {
    try {
      const { data } = await todolistsAPI.deleteTodolist(id)
      if (data.resultCode === 0) {
        return { id: id }
      } else {
        dispatch(setAppError({ message: data.messages.toString(), severity: "error" }))
      }
    } catch (err) {
      return rejectWithValue(err)
    }
  }
)

export const updateTitleTC = createAsyncThunk(
  "todolists/updateTitle",
  async (param: { todolistId: string; title: string }, { dispatch, rejectWithValue, getState }) => {
    const state = getState() as AppRootState
    const todolist = state.todolists.find((tl) => tl.id === param.todolistId)

    if (!todolist) {
      dispatch(setAppError({ message: "Todolist not found!", severity: "error" }))
      return
    }

    try {
      const { data } = await todolistsAPI.updateTodolist(param.todolistId, param.title)
      if (data.resultCode === 0) {
        return { id: param.todolistId, title: param.title }
      } else {
        dispatch(setAppError({ message: data.messages.toString(), severity: "error" }))
      }
    } catch (err) {
      return rejectWithValue(err)
    }
  }
)
