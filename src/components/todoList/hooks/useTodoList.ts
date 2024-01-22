import { useSelector, useDispatch } from 'react-redux'
import { useCallback } from 'react'
import {
  removeTodolistAC,
  changeTodolistFilterAC,
} from '../../../store/actionCreators/todolistsActionCreator'
import { createTaskAC } from '../../../store/actionCreators/tasksActionCreators'
import { AppRootStateType } from '../../../store/store'
import { TaskType } from '../../../store/types/tasksTypes'
import { FilterType } from '../../../store/types/todolistsTypes'

export const useTodoList = (id: string, title: string, filter: FilterType) => {

  const tasks = useSelector<AppRootStateType, TaskType[]>(
    (state) => state.tasks[id]
  )

  const dispatch = useDispatch()

  // Add Task
  const addTask = useCallback(
    (title: string) => {
      if (
        tasks &&
        tasks.find((t: TaskType) => t.title === title.toLowerCase())
      ) {
        window.alert(`Task ${title.toUpperCase()} already exists!`)
      } else dispatch(createTaskAC(title, id))
    },
    [id, tasks, dispatch]
  )

  // Delete Todolist Handler
  const deleteTodolistHandler = useCallback(() => {
    if (window.confirm(`Delete Todolist ${title.toUpperCase()}?`)) {
      dispatch(removeTodolistAC(id))
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
    filteredTasks = filteredTasks.filter((t: TaskType) => t.isDone === false)
  if (filter === 'completed')
    filteredTasks = filteredTasks.filter((t: TaskType) => t.isDone === true)

  return {
    filteredTasks,
    addTask,
    deleteTodolistHandler,
    changeFilter,
  }
}
