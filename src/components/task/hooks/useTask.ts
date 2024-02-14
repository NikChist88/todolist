import { useDispatch, useSelector } from 'react-redux'
import { useCallback } from 'react'
import { AppDispatch, RootState } from '../../../store/store'
import { TaskStatuses } from '../../../api/todolistsApi'
import {
  updateTaskTC,
  deleteTaskTC,
  createTaskTC,
} from '../../../store/reducers/tasksReducer/tasksThunks'
import { FilterType } from '../../../store/reducers/todolistsReducer/todolistsReducer'
import { TasksType } from '../../../store/reducers/tasksReducer/tasksReducer'
import {
  setErrorAC,
  setMessageAC,
} from '../../../store/reducers/appReducer/appReducer'
import { useConfirm } from 'material-ui-confirm'
import { AxiosError } from 'axios'

export const useTask = (
  todolistId: string,
  filter: FilterType,
  id?: string,
  title?: string
) => {
  const tasks = useSelector<RootState, TasksType>((state) => state.tasks)
  const dispatch: AppDispatch = useDispatch()
  const confirm = useConfirm()

  // Filtered Tasks
  let filteredTasks = tasks[todolistId]
  if (filter === 'active')
    filteredTasks = filteredTasks.filter((t) => t.status === TaskStatuses.New)
  if (filter === 'completed')
    filteredTasks = filteredTasks.filter(
      (t) => t.status === TaskStatuses.Completed
    )

  const createTask = useCallback(
    (title: string) => {
      if (filteredTasks.some((t) => t.title === title)) {
        dispatch(setMessageAC(`Task ${title.toUpperCase()} already exists!`, 'info'))
      } else {
        dispatch(createTaskTC(todolistId, title))
      }
    },
    [todolistId, filteredTasks, dispatch]
  )

  const updateTaskTitle = useCallback(
    (newTitle: string) => {
      if (filteredTasks.some((t) => t.title === newTitle)) {
        dispatch(setMessageAC(`Task ${newTitle.toUpperCase()} already exists!`, 'info'))
      } else {
        dispatch(updateTaskTC(todolistId, id!, { title: newTitle }))
      }
    },
    [id, todolistId, filteredTasks, dispatch]
  )

  const deleteTask = useCallback(
    (todolistId: string, id: string) => {
      confirm({ description: `Delete Task ${title?.toUpperCase()}?` })
        .then(() => {
          dispatch(deleteTaskTC(todolistId, id!))
          dispatch(
            setMessageAC(`Task ${title?.toUpperCase()} successfully deleted!`, 'success')
          )
        })
        .catch((err: AxiosError) => {
          err && dispatch(setErrorAC(err.message))
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
