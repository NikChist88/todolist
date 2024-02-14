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
import { setErrorAC } from '../../../store/reducers/appReducer/appReducer'

export const useTask = (
  todolistId: string,
  filter: FilterType,
  id?: string,
  title?: string
) => {

  const tasks = useSelector<RootState, TasksType>((state) => state.tasks)
  const dispatch: AppDispatch = useDispatch()

  // Filtered Tasks
  let filteredTasks = tasks[todolistId]
  if (filter === 'active')
    filteredTasks = filteredTasks.filter((t) => t.status === TaskStatuses.New)
  if (filter === 'completed')
    filteredTasks = filteredTasks.filter(
      (t) => t.status === TaskStatuses.Completed
    )

  const createTask = useCallback((title: string) => {
    if (filteredTasks.some((t) => t.title === title)) {
      dispatch(setErrorAC(`Task ${title.toUpperCase()} already exists!`))
    } else {
      dispatch(createTaskTC(todolistId, title))
    }
  }, [todolistId, filteredTasks, dispatch])

  const updateTaskTitle = useCallback((newTitle: string) => {
    if (filteredTasks.some((t) => t.title === newTitle)) {
      dispatch(setErrorAC(`Task ${newTitle.toUpperCase()} already exists!`))
    } else {
      dispatch(updateTaskTC(todolistId, id!, { title: newTitle }))
    }
  }, [id, todolistId, filteredTasks, dispatch])

  const deleteTask = useCallback((todolistId: string, id: string) => {
    if (window.confirm(`Delete Task ${title?.toUpperCase()}?`)) {
      dispatch(deleteTaskTC(todolistId, id!))
    }
  }, [title, dispatch])

  const changeTaskStatus = useCallback((status: boolean) => {
    dispatch(updateTaskTC(todolistId, id!, {
        status: status ? TaskStatuses.Completed : TaskStatuses.New,
    }))
  }, [id, todolistId, dispatch])

  return {
    filteredTasks,
    createTask,
    updateTaskTitle,
    deleteTask,
    changeTaskStatus,
  }
}
