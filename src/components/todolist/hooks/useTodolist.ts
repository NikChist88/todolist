import { useDispatch, useSelector } from 'react-redux'
import { useCallback } from 'react'
import { AppDispatch, RootState } from '../../../store/store'
import {
  FilterType,
  TodolistDomainType,
  changeTodolistFilterAC,
} from '../../../store/reducers/todolistsReducer/todolistsReducer'
import {
  createTodolistTC,
  deleteTodolistTC,
} from '../../../store/reducers/todolistsReducer/todolistsThunks'
import {
  setErrorAC,
  setMessageAC,
} from '../../../store/reducers/appReducer/appReducer'
import { useConfirm } from 'material-ui-confirm'
import { AxiosError } from 'axios'

export const useTodolist = (todolistId?: string, title?: string) => {
  const todolists = useSelector<RootState, TodolistDomainType[]>(
    (state) => state.todolists
  )
  const dispatch: AppDispatch = useDispatch()
  const confirm = useConfirm()

  const createTodolist = useCallback(
    (title: string) => {
      if (todolists.some((tl) => tl.title === title)) {
        dispatch(
          setMessageAC(`Todolist ${title.toUpperCase()} already exists!`, 'info')
        )
      } else {
        dispatch(createTodolistTC(title))
      }
    },
    [todolists, dispatch]
  )

  const deleteTodolist = useCallback(() => {
    confirm({ description: `Delete Todolist ${title?.toUpperCase()}?` })
      .then(() => {
        dispatch(deleteTodolistTC(todolistId!))
        dispatch(
          setMessageAC(`Todolist ${title?.toUpperCase()} successfully deleted!`, 'success')
        )
      })
      .catch((err: AxiosError) => {
        err && dispatch(setErrorAC(err.message))
      })
  }, [todolistId, title, dispatch, confirm])

  const changeFilter = useCallback(
    (filter: FilterType, id: string) => {
      dispatch(changeTodolistFilterAC(filter, id))
    },
    [dispatch]
  )

  return {
    createTodolist,
    deleteTodolist,
    changeFilter,
  }
}
