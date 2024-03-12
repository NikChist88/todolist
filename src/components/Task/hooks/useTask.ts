import { useCallback } from "react"
import { useAppDispatch, useAppSelector } from "../../../store/store"
import { TaskStatuses } from "../../../api/todolists-api"
import { updateTaskTC, deleteTaskTC, createTaskTC } from "../../../store/tasks/tasks-thunks"
import { FilterType } from "../../../store/todolists/todolists-reducer"
import { setAppError } from "../../../store/app/app-reducer"
import { useConfirm } from "material-ui-confirm"
import { AxiosError } from "axios"
import { selectTasks } from "../../../store/tasks/tasks-selectors"

export const useTask = (todolistId: string, id: string, filter?: FilterType, title?: string) => {
  const tasks = useAppSelector(selectTasks)
  const dispatch = useAppDispatch()
  const confirm = useConfirm()

  const createTask = useCallback(
    (title: string) => {
      if (tasks[todolistId].some((t) => t.title === title)) {
        dispatch(setAppError({ message: `Task ${title.toUpperCase()} already exists!`, severity: "info" }))
      } else {
        dispatch(createTaskTC({ todolistId, title }))
      }
    },
    [todolistId, tasks, dispatch]
  )

  const updateTaskTitle = useCallback(
    (newTitle: string) => {
      if (tasks[todolistId].some((t) => t.title === newTitle)) {
        dispatch(setAppError({ message: `Task ${newTitle.toUpperCase()} already exists!`, severity: "info" }))
      } else {
        dispatch(updateTaskTC({ todolistId, id, model: { title: newTitle } }))
      }
    },
    [id, todolistId, tasks, dispatch]
  )

  const deleteTask = useCallback(
    (todolistId: string, id: string) => {
      confirm({ description: `Delete task ${title?.toUpperCase()}?` })
        .then(() => {
          dispatch(deleteTaskTC({ todolistId, id }))
          dispatch(setAppError({ message: `Task ${title?.toUpperCase()} successfully deleted!`, severity: "success" }))
        })
        .catch((err: AxiosError) => {
          err && dispatch(setAppError({ message: err.message.toString(), severity: "error" }))
        })
    },
    [title, dispatch, confirm]
  )

  const changeTaskStatus = useCallback(
    (status: boolean) => {
      dispatch(updateTaskTC({ todolistId, id, model: { status: status ? TaskStatuses.Completed : TaskStatuses.New } }))
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
