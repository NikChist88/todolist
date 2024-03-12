import { useCallback } from "react"
import { useAppDispatch, useAppSelector } from "../../../store/store"
import { FilterType, actions } from "../../../store/todolists/todolists-reducer"
import { createTodolistTC, deleteTodolistTC, updateTitleTC } from "../../../store/todolists/todolists-thunks"
import { setAppError } from "../../../store/app/app-reducer"
import { useConfirm } from "material-ui-confirm"
import { AxiosError } from "axios"
import { selectTodolists } from "../../../store/todolists/todolists-selectors"

export const useTodolist = (todolistId?: string, title?: string) => {
  const todolists = useAppSelector(selectTodolists)
  const dispatch = useAppDispatch()
  const confirm = useConfirm()

  const createTodolist = useCallback(
    (title: string) => {
      if (todolists.some((tl) => tl.title === title)) {
        dispatch(setAppError({ message: `Todolist ${title.toUpperCase()} already exists!`, severity: "info" }))
      } else {
        dispatch(createTodolistTC(title))
      }
    },
    [todolists, dispatch]
  )

  const deleteTodolist = useCallback(() => {
    confirm({ description: `Delete todolist ${title?.toUpperCase()}?` })
      .then(() => {
        dispatch(deleteTodolistTC(todolistId!))
        dispatch(setAppError({ message: `Todolist ${title?.toUpperCase()} successfully deleted!`, severity: "success" }))
      })
      .catch((err: AxiosError) => {
        err && dispatch(setAppError({message: err.message.toString(), severity: 'error'}))
      })
  }, [todolistId, title, dispatch, confirm])

  const updateTitle = useCallback(
    (newTitle: string) => {
      if (todolists.some((tl) => tl.title === newTitle)) {
        dispatch(setAppError({ message: `Todolist ${newTitle.toUpperCase()} already exists!`, severity: "info" }))
      } else {
        dispatch(updateTitleTC(todolistId!, newTitle))
      }
    },
    [todolists, todolistId, dispatch]
  )

  const changeFilter = useCallback(
    (id: string, filter: FilterType) => {
      dispatch(actions.changeFilter({ id, filter }))
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
