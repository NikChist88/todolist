import { AxiosError } from "axios"
import { todolistsAPI } from "../../../api/todolists-api"
import { AppThunk, AppRootState } from "../../store"
import { setErrorAC, setStatusAC } from "../app-reducer/app-reducer"
import { setTodolistsAC, createTodolistAC, deleteTodolistAC, updateTitleAC } from "./todolists-reducer"

export const fetchTodolistsTC = (): AppThunk => (dispatch) => {
  dispatch(setStatusAC("loading"))
  todolistsAPI
    .getTodolists()
    .then(({ status, data }) => {
      if (status === 200) {
        dispatch(setTodolistsAC(data))
        dispatch(setStatusAC("succeeded"))
      }
    })
    .catch((err: AxiosError) => {
      dispatch(setErrorAC(err.message))
      dispatch(setStatusAC("failed"))
    })
}

export const createTodolistTC =
  (title: string): AppThunk =>
  (dispatch) => {
    todolistsAPI
      .createTodolist(title)
      .then(({ data }) => {
        data.resultCode === 0 && dispatch(createTodolistAC(data.data.item))
      })
      .catch((err: AxiosError) => {
        dispatch(setErrorAC(err.message))
      })
  }

export const deleteTodolistTC =
  (id: string): AppThunk =>
  (dispatch) => {
    todolistsAPI
      .deleteTodolist(id)
      .then(({ data }) => {
        data.resultCode === 0 && dispatch(deleteTodolistAC(id))
      })
      .catch((err: AxiosError) => {
        dispatch(setErrorAC(err.message))
      })
  }

export const updateTitleTC =
  (todolistId: string, title: string): AppThunk =>
  (dispatch, getState: () => AppRootState) => {
    const state = getState()
    const todolist = state.todolists.find((tl) => tl.id === todolistId)

    if (!todolist) {
      dispatch(setErrorAC("Todolist not found!"))
      return
    }

    todolistsAPI
      .updateTodolist(todolistId, title)
      .then(({ status }) => {
        status === 200 && dispatch(updateTitleAC(todolistId, title))
      })
      .catch((err: AxiosError) => {
        dispatch(setErrorAC(err.message))
      })
  }
