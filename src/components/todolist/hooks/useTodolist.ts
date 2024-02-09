import { useDispatch, useSelector } from 'react-redux'
import { Dispatch, useCallback } from 'react'
import { ThunkDispatch } from 'redux-thunk'
import { RootStateType } from '../../../store/store'
import {
  FilterType,
  TodolistDomainType,
  deleteTodolistTC,
  changeTodolistFilterAC,
  TodolistsActionsTypes,
  createTodolistTC,
} from '../../../store/reducers/todolistsReducer/todolistsReducer'
import { AppActionsTypes, setErrorAC } from '../../../store/reducers/appReducer/appReducer'

export const useTodolist = (title?: string) => {
  const todolists = useSelector<RootStateType, TodolistDomainType[]>(
    (state) => state.todolists
  )
  const dispatch: Dispatch<TodolistsActionsTypes | AppActionsTypes> = useDispatch()
  const thunkDispatch: ThunkDispatch<
    RootStateType,
    any,
    TodolistsActionsTypes
  > = useDispatch()

  const createTodolist = useCallback((title: string) => {
    if (todolists.some((tl) => tl.title === title)) {
      dispatch(setErrorAC(`Todolist ${title.toUpperCase()} already exists!`))
    } else {
      thunkDispatch(createTodolistTC(title))
    }
  }, [todolists, dispatch, thunkDispatch])

  const deleteTodolist = useCallback(
    (id: string) => {
      if (window.confirm(`Delete todolist ${title?.toUpperCase()}?`)) {
        thunkDispatch(deleteTodolistTC(id))
      }
    },
    [title, thunkDispatch]
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
