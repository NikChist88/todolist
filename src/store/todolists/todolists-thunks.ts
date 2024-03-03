import axios from "axios"
import { todolistsAPI } from "../../api/todolists-api"
import { AppThunk, AppRootState } from "../store"
import { setStatus, setError } from "../app/app-reducer"
import { actions } from "./todolists-reducer"
import { Dispatch } from "redux"

export const fetchTodolistsTC = (): AppThunk => async (dispatch: Dispatch) => {
  dispatch(setStatus("loading"))
  try {
    const { data } = await todolistsAPI.getTodolists()
    dispatch(actions.setTodolists(data))
    dispatch(setStatus("succeeded"))
  } catch (err) {
    if (axios.isAxiosError(err)) {
      dispatch(setError(err.message))
    } else {
      dispatch(setStatus("failed"))
    }
  }
}

export const createTodolistTC =
  (title: string): AppThunk =>
  async (dispatch: Dispatch) => {
    dispatch(setStatus("loading"))
    try {
      const { data } = await todolistsAPI.createTodolist(title)
      if (data.resultCode === 0) {
        dispatch(actions.createTodolist(data.data.item))
        dispatch(setStatus("succeeded"))
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        dispatch(setError(err.message))
      } else {
        dispatch(setStatus("failed"))
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
        dispatch(setStatus("succeeded"))
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        dispatch(setError(err.message))
      } else {
        dispatch(setStatus("failed"))
      }
    }
  }

export const updateTitleTC =
  (todolistId: string, title: string): AppThunk =>
  async (dispatch: Dispatch, getState: () => AppRootState) => {
    const state = getState()
    const todolist = state.todolists.find((tl) => tl.id === todolistId)

    if (!todolist) {
      dispatch(setError("Todolist not found!"))
      return
    }

    try {
      const { data } = await todolistsAPI.updateTodolist(todolistId, title)
      if (data.resultCode === 0) {
        dispatch(actions.updateTitle({ id: todolistId, title: title }))
        dispatch(setStatus("succeeded"))
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        dispatch(setError(err.message))
      } else {
        dispatch(setStatus("failed"))
      }
    }
  }
