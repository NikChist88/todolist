import { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import {
  createTodolistTC,
  TodolistsActionsTypes,
} from '../../../store/reducers/todolistsReducer/todolistsActionCreator'
import { ThunkDispatch } from 'redux-thunk'
import { RootStateType } from '../../../store/store'

export const useApp = () => {
  const dispatch: ThunkDispatch<RootStateType, any, TodolistsActionsTypes> =
    useDispatch()

  // Create Todolist
  const createTodolist = useCallback(
    (title: string) => {
      dispatch(createTodolistTC(title))
    },
    [dispatch]
  )

  return {
    createTodolist,
  }
}
