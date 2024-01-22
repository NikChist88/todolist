import { useSelector, useDispatch } from 'react-redux'
import { useCallback } from 'react'
import { AppRootStateType } from '../../../store/store'
import { TasksType, TaskType } from '../../../store/types/tasksTypes'
import {
  updateTaskAC,
  removeTaskAC,
  changeTaskStatusAC,
} from '../../../store/actionCreators/tasksActionCreators'

export const useTask = (
  id: string,
  todolistId: string,
  task: string,
  isDone: boolean
) => {

  const tasks = useSelector<AppRootStateType, TasksType>((state) => state.tasks)
  const dispatch = useDispatch()

  // Update Task Title Handler
  const updateTaskHandler = useCallback(
    (newTitle: string) => {
      if (
        tasks[todolistId].find(
          (t: TaskType) => t.title === newTitle.toLowerCase()
        )
      ) {
        window.alert(`Task ${newTitle.toUpperCase()} already exists!`)
      } else {
        dispatch(updateTaskAC(id, todolistId, newTitle))
      }
    },
    [id, todolistId, tasks, dispatch]
  )

  // Delete Task
  const deleteTaskHandler = useCallback(() => {
    if (window.confirm(`Do you want to delete a task ${task.toUpperCase()}?`)) {
      dispatch(removeTaskAC(id, todolistId))
    }
  }, [id, todolistId, task, dispatch])

  // Change Task Status
  const changeTaskStatusHandler = useCallback(() => {
    dispatch(changeTaskStatusAC(id, todolistId, isDone))
  }, [id, todolistId, isDone, dispatch])

  return {
    updateTaskHandler,
    deleteTaskHandler,
    changeTaskStatusHandler
  }
}
