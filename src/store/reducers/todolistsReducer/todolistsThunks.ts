import { AxiosError } from 'axios'
import { todolistsAPI } from '../../../api/todolistsApi'
import { AppThunk } from '../../store'
import { setErrorAC, setStatusAC } from '../appReducer/appReducer'
import {
  setTodolistsAC,
  createTodolistAC,
  deleteTodolistAC,
} from './todolistsReducer'

export const fetchTodolistsTC = (): AppThunk => (dispatch) => {
  dispatch(setStatusAC('loading'))
  todolistsAPI
    .getTodolists()
    .then((res) => {
      if (res.status === 200) {
        dispatch(setTodolistsAC(res.data))
        dispatch(setStatusAC('succeeded'))
      }
    })
    .catch((err: AxiosError) => {
      dispatch(setErrorAC(err.message))
    })
}

export const createTodolistTC =
  (title: string): AppThunk =>
  (dispatch) => {
    todolistsAPI
      .createTodolist(title)
      .then(({ data }) => {
        if (data.resultCode === 0) {
          dispatch(createTodolistAC(data.data.item))
        }
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
