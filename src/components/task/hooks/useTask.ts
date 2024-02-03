import { useSelector, useDispatch } from 'react-redux'
import { useCallback } from 'react'
import { RootStateType } from '../../../store/store'
import { TasksType } from '../../../store/reducers/tasksReducer/tasksReducer'
import {
  updateTaskTC,
  deleteTaskTC,
} from '../../../store/reducers/tasksReducer/tasksActionCreators'
import { TaskStatuses, TaskType } from '../../../api/types'
import { ThunkDispatch } from 'redux-thunk'
import { TasksActionsType } from '../../../store/reducers/tasksReducer/tasksTypes'

export const useTask = (id: string, todolistId: string, task: string) => {
  const tasks = useSelector<RootStateType, TasksType>((state) => state.tasks)
  const dispatch: ThunkDispatch<RootStateType, any, TasksActionsType> =
    useDispatch()

  // Update Task Title Handler
  const updateTaskTitleHandler = useCallback(
    (newTitle: string) => {
      if (
        tasks[todolistId].find(
          (t: TaskType) => t.title === newTitle.toLowerCase()
        )
      ) {
        window.alert(`Task ${newTitle.toUpperCase()} already exists!`)
      } else {
        dispatch(updateTaskTC(todolistId, id, { title: newTitle }))
      }
    },
    [id, todolistId, tasks, dispatch]
  )

  // Delete Task
  const deleteTaskHandler = useCallback(() => {
    if (window.confirm(`Do you want to delete a task ${task.toUpperCase()}?`)) {
      dispatch(deleteTaskTC(todolistId, id))
    }
  }, [id, todolistId, task, dispatch])

  // Change Task Status
  const changeTaskStatusHandler = useCallback(
    (status: boolean) => {
      dispatch(
        updateTaskTC(todolistId, id, {
          status: status ? TaskStatuses.Completed : TaskStatuses.New,
        })
      )
    },
    [id, todolistId, dispatch]
  )

  return {
    updateTaskTitleHandler,
    deleteTaskHandler,
    changeTaskStatusHandler,
  }
}
