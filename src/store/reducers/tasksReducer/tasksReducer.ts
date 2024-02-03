import { TaskType, TodolistType } from '../../../api/types'
import { TasksActionsType, UserTaskActionTypes } from './tasksTypes'
import { UserTodolistsActionTypes } from '../todolistsReducer/todolistsTypes'

export type TasksType = {
  [todolistId: string]: TaskType[]
}

export const tasksReducer = (
  state: TasksType = {},
  action: TasksActionsType
): TasksType => {
  switch (action.type) {
    // Create Task
    case UserTaskActionTypes.CREATE_TASK: {
      const newTask: TaskType = action.payload.task
      const updatedTasks: TaskType[] = [newTask, ...state[newTask.todoListId]]

      return {
        ...state,
        [newTask.todoListId]: updatedTasks,
      }
    }

    // Delete Task
    case UserTaskActionTypes.DELETE_TASK: {
      const filteredTasks = state[action.payload.todolistId].filter(
        (task: TaskType) => task.id !== action.payload.taskId
      )

      return { ...state, [action.payload.todolistId]: filteredTasks }
    }

    // Update Task
    case UserTaskActionTypes.UPDATE_TASK: {
      const updatedTasks = state[action.payload.todolistId].map(
        (task: TaskType) =>
          task.id === action.payload.taskId
            ? {
                ...task,
                ...action.payload.model,
              }
            : task
      )

      return { ...state, [action.payload.todolistId]: updatedTasks }
    }

    // Create Todolist
    case UserTodolistsActionTypes.CREATE_TODOLIST: {
      return { ...state, [action.payload.todolist.id]: [] }
    }

    // Delete Todolist
    case UserTodolistsActionTypes.DELETE_TODOLIST: {
      delete state[action.payload.todolistId]
      return state
    }

    // Set Todolists
    case UserTodolistsActionTypes.SET_TODOLISTS: {
      const copyState = { ...state }
      action.payload.todolists.forEach((tl: TodolistType) => {
        copyState[tl.id] = []
      })

      return copyState
    }

    // Set Tasks
    case UserTaskActionTypes.SET_TASKS: {
      return { ...state, [action.payload.todolistId]: action.payload.tasks }
    }

    // Default
    default:
      return state
  }
}
