import { useDispatch, useSelector } from 'react-redux'
import { useCallback } from 'react'
import { ThunkDispatch } from 'redux-thunk'
import { RootStateType } from '../../../store/store'
import { TaskStatuses } from '../../../api/types'
import {
  TasksType,
  updateTaskTC,
  deleteTaskTC,
  TasksActionsTypes,
  createTaskTC,
} from '../../../store/reducers/tasksReducer/tasksReducer'
import { FilterType } from '../../../store/reducers/todolistsReducer/todolistsReducer'

export const useTask = (
  todolistId: string,
  filter: FilterType,
  id?: string,
  title?: string
) => {

  const tasks = useSelector<RootStateType, TasksType>((state) => state.tasks)
  const dispatch: ThunkDispatch<RootStateType, any, TasksActionsTypes> =
    useDispatch()

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
      window.alert(`Task ${title.toUpperCase()} already exists!`)
    } else {
      dispatch(createTaskTC(todolistId, title))
    }
  }, [todolistId, filteredTasks, dispatch])

  const updateTaskTitle = useCallback((newTitle: string) => {
    if (filteredTasks.some((t) => t.title === newTitle)) {
      window.alert(`Task ${newTitle.toUpperCase()} already exists!`)
    } else {
      dispatch(updateTaskTC(todolistId, id!, { title: newTitle }))
    }
  }, [id, todolistId, filteredTasks, dispatch])

  const deleteTask = useCallback(() => {
    if (window.confirm(`Delete task ${title?.toUpperCase()}?`)) {
      dispatch(deleteTaskTC(todolistId, id!))
    }
  }, [id, todolistId, title, dispatch])

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
