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

export const useTodolist = (title?: string) => {
  const todolists = useSelector<RootState, TodolistDomainType[]>(
    (state) => state.todolists
  )
  const dispatch: AppDispatch = useDispatch()

  const createTodolist = useCallback(
    (title: string) => {
      if (todolists.some((tl) => tl.title === title)) {
        window.alert(`Todolist ${title.toUpperCase()} already exists!`)
      } else {
        dispatch(createTodolistTC(title))
      }
    },
    [todolists, dispatch]
  )

  const deleteTodolist = useCallback((id: string) => {
    if (window.confirm(`Delete Todolist ${title?.toUpperCase()}?`)) {
      dispatch(deleteTodolistTC(id))
    }
  }, [title, dispatch]
  )

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
