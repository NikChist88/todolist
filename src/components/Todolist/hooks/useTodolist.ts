import { useCallback } from "react"
import { useAppDispatch, useAppSelector } from "../../../store/store"
import { FilterType, changeFilterAC } from "../../../store/reducers/todolists-reducer/todolists-reducer"
import {
  createTodolistTC,
  deleteTodolistTC,
  updateTitleTC,
} from "../../../store/reducers/todolists-reducer/todolists-thunks"
import { setErrorAC, setMessageAC } from "../../../store/reducers/app-reducer/app-reducer"
import { useConfirm } from "material-ui-confirm"
import { AxiosError } from "axios"

export const useTodolist = (todolistId?: string, title?: string) => {
  const todolists = useAppSelector((state) => state.todolists)
  const dispatch = useAppDispatch()
  const confirm = useConfirm()

  const createTodolist = useCallback(
    (title: string) => {
      if (todolists.some((tl) => tl.title === title)) {
        dispatch(setMessageAC(`Todolist ${title.toUpperCase()} already exists!`, "info"))
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
        dispatch(setMessageAC(`Todolist ${title?.toUpperCase()} successfully deleted!`, "success"))
      })
      .catch((err: AxiosError) => {
        err && dispatch(setErrorAC(err.message))
      })
  }, [todolistId, title, dispatch, confirm])

  const updateTitle = useCallback(
    (newTitle: string) => {
      if (todolists.some((tl) => tl.title === newTitle)) {
        dispatch(setMessageAC(`Todolist ${newTitle.toUpperCase()} already exists!`, "info"))
      } else {
        dispatch(updateTitleTC(todolistId!, newTitle))
      }
    },
    [todolists, todolistId, dispatch]
  )

  const changeFilter = useCallback(
    (filter: FilterType, id: string) => {
      dispatch(changeFilterAC(filter, id))
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
