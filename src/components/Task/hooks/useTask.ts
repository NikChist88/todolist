import { useCallback } from "react"
import { useAppDispatch, useAppSelector } from "../../../store/store"
import { TaskStatuses } from "../../../api/todolists-api"
import { updateTaskTC, deleteTaskTC, createTaskTC } from "../../../store/tasks/tasks-thunks"
import { FilterType } from "../../../store/todolists/todolists-reducer"
import { setError, setMessage } from "../../../store/app/app-reducer"
import { useConfirm } from "material-ui-confirm"
import { AxiosError } from "axios"
import { selectTasks } from "../../../store/tasks/tasks-selectors"

export const useTask = (todolistId: string, filter?: FilterType, id?: string, title?: string) => {
  const tasks = useAppSelector(selectTasks)
  const dispatch = useAppDispatch()
  const confirm = useConfirm()

  // Filtered Tasks
  let filteredTasks = tasks[todolistId]
  if (filter === "active") filteredTasks = filteredTasks.filter((t) => t.status === TaskStatuses.New)
  if (filter === "completed") filteredTasks = filteredTasks.filter((t) => t.status === TaskStatuses.Completed)

  const createTask = useCallback(
    (title: string) => {
      if (filteredTasks.some((t) => t.title === title)) {
        dispatch(setMessage({ message: `Task ${title.toUpperCase()} already exists!`, severity: "info" }))
      } else {
        dispatch(createTaskTC(todolistId, title))
      }
    },
    [todolistId, filteredTasks, dispatch]
  )

  const updateTaskTitle = useCallback(
    (newTitle: string) => {
      if (filteredTasks.some((t) => t.title === newTitle)) {
        dispatch(setMessage({ message: `Task ${newTitle.toUpperCase()} already exists!`, severity: "info" }))
      } else {
        dispatch(updateTaskTC(todolistId, id!, { title: newTitle }))
      }
    },
    [id, todolistId, filteredTasks, dispatch]
  )

  const deleteTask = useCallback(
    (todolistId: string, id: string) => {
      confirm({ description: `Delete task ${title?.toUpperCase()}?` })
        .then(() => {
          dispatch(deleteTaskTC(todolistId, id!))
          dispatch(setMessage({ message: `Task ${title?.toUpperCase()} successfully deleted!`, severity: "success" }))
        })
        .catch((err: AxiosError) => {
          err && dispatch(setError(err.message))
        })
    },
    [title, dispatch, confirm]
  )

  const changeTaskStatus = useCallback(
    (status: boolean) => {
      dispatch(
        updateTaskTC(todolistId, id!, {
          status: status ? TaskStatuses.Completed : TaskStatuses.New,
        })
      )
    },
    [id, todolistId, dispatch]
  )

  return {
    filteredTasks,
    createTask,
    updateTaskTitle,
    deleteTask,
    changeTaskStatus,
  }
}
