import { TaskType } from '../../../api/types'
import { TasksActionsTypes } from './tasksActionCreators'
import { TodolistsActionsTypes } from '../todolistsReducer/todolistsActionCreator'

export type TasksType = {
  [todolistId: string]: TaskType[]
}

export const tasksReducer = (
  state: TasksType = {},
  action: TasksActionsTypes | TodolistsActionsTypes
): TasksType => {
  switch (action.type) {
    // Create Task
    case 'CREATE_TASK':
      return {
        ...state,
        [action.task.todoListId]: [
          action.task,
          ...state[action.task.todoListId],
        ],
      }

    // Delete Task
    case 'DELETE_TASK':
      return {
        ...state,
        [action.todolistId]: state[action.todolistId].filter(
          (t) => t.id !== action.id
        ),
      }

    // Update Task
    case 'UPDATE_TASK':
      return {
        ...state,
        [action.todolistId]: state[action.todolistId].map((t) =>
          t.id === action.id ? { ...t, ...action.model } : t
        ),
      }

    // Create Todolist
    case 'CREATE_TODOLIST':
      return { ...state, [action.todolist.id]: [] }

    // Delete Todolist
    case 'DELETE_TODOLIST': {
      const copyState = { ...state }
      delete copyState[action.id]
      return copyState
    }

    // Set Todolists
    case 'SET_TODOLISTS': {
      const copyState = { ...state }
      action.todolists.forEach((tl) => (copyState[tl.id] = []))
      return copyState
    }

    // Set Tasks
    case 'SET_TASKS':
      return { ...state, [action.todolistId]: action.tasks }

    // Default
    default:
      return state
  }
}
