import { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { createTodolistAC } from '../../../store/actionCreators/todolistsActionCreator'

export const useApp = () => {
  const dispatch = useDispatch()

  // Create Todolist
  const createTodolist = useCallback(
    (title: string) => {
      dispatch(createTodolistAC(title))
    },
    [dispatch]
  )

  return {
    createTodolist,
  }
}
