import { useSelector, useDispatch } from 'react-redux'
import { useCallback } from 'react'
import { RootStateType } from '../../../store/store'
import { TasksType } from '../../../store/reducers/tasksReducer/tasksReducer'
import {
  updateTaskAC,
  removeTaskAC,
  changeTaskStatusAC,
} from '../../../store/actionCreators/tasksActionCreators'
import { TaskStatuses, TaskType } from '../../../api/todolistsAPI'

export const useTask = (id: string, todolistId: string, task: string) => {
  const tasks = useSelector<RootStateType, TasksType>((state) => state.tasks)
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
  const changeTaskStatusHandler = useCallback(
    (status: boolean) => {
      dispatch(
        changeTaskStatusAC(
          id,
          todolistId,
          status ? TaskStatuses.Completed : TaskStatuses.New
        )
      )
    },
    [id, todolistId, dispatch]
  )

  return {
    updateTaskHandler,
    deleteTaskHandler,
    changeTaskStatusHandler,
  }
}
