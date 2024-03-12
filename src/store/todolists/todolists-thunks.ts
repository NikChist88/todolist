import axios from "axios"
import { todolistsAPI } from "../../api/todolists-api"
import { AppThunk, AppRootState } from "../store"
import { setAppStatus, setAppError } from "../app/app-reducer"
import { actions } from "./todolists-reducer"
import { Dispatch } from "redux"
import { createAsyncThunk } from "@reduxjs/toolkit"

export const fetchTodolistsTC = (): AppThunk => async (dispatch: Dispatch) => {
  dispatch(setAppStatus("loading"))
  try {
    const { data } = await todolistsAPI.getTodolists()
    dispatch(actions.setTodolists(data))
    dispatch(setAppStatus("succeeded"))
  } catch (err) {
    if (axios.isAxiosError(err)) {
      dispatch(setAppError({ message: err.message.toString(), severity: "error" }))
    } else {
      dispatch(setAppStatus("failed"))
    }
  }
}

export const createTodolistTC =
  (title: string): AppThunk =>
  async (dispatch: Dispatch) => {
    try {
      const { data } = await todolistsAPI.createTodolist(title)
      if (data.resultCode === 0) {
        dispatch(actions.createTodolist(data.data.item))
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        dispatch(setAppError({ message: err.message.toString(), severity: "error" }))
      } else {
        dispatch(setAppStatus("failed"))
      }
    }
  }

export const deleteTodolistTC =
  (id: string): AppThunk =>
  async (dispatch: Dispatch) => {
    try {
      const { data } = await todolistsAPI.deleteTodolist(id)
      if (data.resultCode === 0) {
        dispatch(actions.deleteTodolist(id))
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        dispatch(setAppError({ message: err.message.toString(), severity: "error" }))
      } else {
        dispatch(setAppStatus("failed"))
      }
    }
  }

export const updateTitleTC =
  (todolistId: string, title: string): AppThunk =>
  async (dispatch: Dispatch, getState: () => AppRootState) => {
    const state = getState()
    const todolist = state.todolists.find((tl) => tl.id === todolistId)

    if (!todolist) {
      dispatch(setAppError({ message: "Todolist not found!", severity: "error" }))
      return
    }

    try {
      const { data } = await todolistsAPI.updateTodolist(todolistId, title)
      if (data.resultCode === 0) {
        dispatch(actions.updateTitle({ id: todolistId, title: title }))
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        dispatch(setAppError({ message: err.message.toString(), severity: "error" }))
      } else {
        dispatch(setAppStatus("failed"))
      }
    }
  }
