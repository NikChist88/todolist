import { useSelector, useDispatch } from 'react-redux'
import { useCallback } from 'react'
import {
  deleteTodolistTC,
  changeTodolistFilterAC,
} from '../../../store/reducers/todolistsReducer/todolistsActionCreator'
import { createTaskTC } from '../../../store/reducers/tasksReducer/tasksActionCreators'
import { RootStateType } from '../../../store/store'
import { TaskType, TaskStatuses } from '../../../api/types'
import { FilterType } from '../../../store/reducers/todolistsReducer/todolistsReducer'
import { ThunkDispatch } from 'redux-thunk'
import { TodolistsActionsTypes } from '../../../store/reducers/todolistsReducer/todolistsTypes'

export const useTodoList = (id: string, title: string, filter: FilterType) => {
  const tasks = useSelector<RootStateType, TaskType[]>(
    (state) => state.tasks[id]
  )
  const dispatch: ThunkDispatch<RootStateType, any, TodolistsActionsTypes> =
    useDispatch()

  // Add Task
  const addTask = useCallback(
    (title: string) => {
      if (
        tasks &&
        tasks.find((t: TaskType) => t.title === title.toLowerCase())
      ) {
        window.alert(`Task ${title.toUpperCase()} already exists!`)
      } else {
        dispatch(createTaskTC(id, title))
      }
    },
    [id, tasks, dispatch]
  )

  // Delete Todolist Handler
  const deleteTodolistHandler = useCallback(() => {
    if (window.confirm(`Delete Todolist ${title.toUpperCase()}?`)) {
      dispatch(deleteTodolistTC(id))
    }
  }, [id, title, dispatch])

  // Change Todolist Filter
  const changeFilter = useCallback(
    (filter: FilterType, id: string) => {
      dispatch(changeTodolistFilterAC(filter, id))
    },
    [dispatch]
  )

  // Filtered Tasks
  let filteredTasks = tasks
  if (filter === 'active')
    filteredTasks = filteredTasks.filter(
      (t: TaskType) => t.status === TaskStatuses.New
    )
  if (filter === 'completed')
    filteredTasks = filteredTasks.filter(
      (t: TaskType) => t.status === TaskStatuses.Completed
    )

  return {
    filteredTasks,
    addTask,
    deleteTodolistHandler,
    changeFilter,
  }
}
