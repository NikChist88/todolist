import { useCallback } from "react"
import { useAppDispatch, useAppSelector } from "../../../store/store"
import { TaskStatuses } from "../../../api/todolists-api"
import { FilterType } from "../../../store/todolists/todolists-reducer"
import { setAppError } from "../../../store/app/app-reducer"
import { selectors, thunks } from "../../../store/tasks"

export const useTask = (todolistId: string, id: string, filter?: FilterType, title?: string) => {
  const tasks = useAppSelector(selectors.selectTasks)
  const dispatch = useAppDispatch()

  const createTask = useCallback(
    (title: string) => {
      if (tasks[todolistId].some((t) => t.title === title)) {
        dispatch(setAppError({ message: `Task ${title.toUpperCase()} already exists!`, severity: "info" }))
      } else {
        dispatch(thunks.createTask({ todolistId, title }))
      }
    },
    [todolistId, tasks, dispatch]
  )

  const updateTaskTitle = useCallback(
    (newTitle: string) => {
      if (tasks[todolistId].some((t) => t.title === newTitle)) {
        dispatch(setAppError({ message: `Task ${newTitle.toUpperCase()} already exists!`, severity: "info" }))
      } else {
        dispatch(thunks.updateTask({ todolistId, id, model: { title: newTitle } }))
      }
    },
    [id, todolistId, tasks, dispatch]
  )

  const deleteTask = useCallback(
    (todolistId: string, id: string) => {
      if (window.confirm(`Delete task ${title?.toUpperCase()}?`)) {
        dispatch(thunks.deleteTask({ todolistId, id }))
        dispatch(setAppError({ message: `Task ${title?.toUpperCase()} successfully deleted!`, severity: "success" }))
      }
    },
    [title, dispatch]
  )

  const changeTaskStatus = useCallback(
    (status: boolean) => {
      dispatch(
        thunks.updateTask({ todolistId, id, model: { status: status ? TaskStatuses.Completed : TaskStatuses.New } })
      )
    },
    [id, todolistId, dispatch]
  )

  return {
    createTask,
    updateTaskTitle,
    deleteTask,
    changeTaskStatus,
  }
}
