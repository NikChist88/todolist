import { useCallback } from "react"
import { useAppDispatch, useAppSelector } from "../../../store/store"
import { setAppError } from "../../../store/app/app-reducer"
import { thunks, selectors, reducer } from "../../../store/todolists"

export const useTodolist = (todolistId?: string, title?: string) => {
  const todolists = useAppSelector(selectors.selectTodolists)
  const dispatch = useAppDispatch()

  const createTodolist = useCallback(
    (title: string) => {
      if (todolists.some((tl) => tl.title === title)) {
        dispatch(setAppError({ message: `Todolist ${title.toUpperCase()} already exists!`, severity: "info" }))
      } else {
        dispatch(thunks.createTodolist(title))
      }
    },
    [todolists, dispatch]
  )

  const deleteTodolist = useCallback(() => {
    if (window.confirm(`Delete todolist ${title?.toUpperCase()}?`)) {
      dispatch(thunks.deleteTodolist(todolistId!))
      dispatch(
        setAppError({
          message: `Todolist ${title?.toUpperCase()} successfully deleted!`,
          severity: "success",
        })
      )
    }
  }, [todolistId, title, dispatch])

  const updateTitle = useCallback(
    (newTitle: string) => {
      if (todolists.some((tl) => tl.title === newTitle)) {
        dispatch(setAppError({ message: `Todolist ${newTitle.toUpperCase()} already exists!`, severity: "info" }))
      } else {
        dispatch(thunks.updateTitle({ todolistId: todolistId!, title: newTitle }))
      }
    },
    [todolists, todolistId, dispatch]
  )

  const changeFilter = useCallback(
    (id: string, filter: reducer.FilterType) => {
      dispatch(reducer.changeFilter({ id, filter }))
    },
    [dispatch]
  )

  return {
    createTodolist,
    deleteTodolist,
    updateTitle,
    changeFilter,
  }
}
