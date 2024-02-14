import { TodolistsActionsTypes } from '../todolistsReducer/todolistsReducer'
import {
  TaskPriorities,
  TaskStatuses,
  TaskType,
} from '../../../api/todolistsApi'

// reducer
export const tasksReducer = (
  state: TasksType = {},
  action: TasksActionsTypes | TodolistsActionsTypes
): TasksType => {
  switch (action.type) {
    case 'CREATE_TASK':
      return {
        ...state,
        [action.task.todoListId]: [
          action.task,
          ...state[action.task.todoListId],
        ],
      }

    case 'DELETE_TASK':
      return {
        ...state,
        [action.todolistId]: state[action.todolistId].filter(
          (t) => t.id !== action.id
        ),
      }

    case 'UPDATE_TASK':
      return {
        ...state,
        [action.todolistId]: state[action.todolistId].map((t) =>
          t.id === action.id ? { ...t, ...action.model } : t
        ),
      }

    case 'CREATE_TODOLIST':
      return { ...state, [action.todolist.id]: [] }

    case 'DELETE_TODOLIST': {
      const copyState = { ...state }
      delete copyState[action.id]
      return copyState
    }

    case 'SET_TODOLISTS': {
      const copyState = { ...state }
      action.todolists.forEach((tl) => (copyState[tl.id] = []))
      return copyState
    }

    case 'SET_TASKS':
      return { ...state, [action.todolistId]: action.tasks }

    default:
      return state
  }
}


// actions
export const createTaskAC = (task: TaskType) =>
  ({ type: 'CREATE_TASK', task } as const)

export const deleteTaskAC = (todolistId: string, id: string) =>
  ({ type: 'DELETE_TASK', todolistId, id } as const)

export const updateTaskAC = (
  todolistId: string,
  id: string,
  model: UpdateDomainModelTaskType
) => ({ type: 'UPDATE_TASK', todolistId, id, model } as const)

export const setTasksAC = (todolistId: string, tasks: TaskType[]) =>
  ({ type: 'SET_TASKS', todolistId, tasks } as const)


// types
export type TasksType = {
  [todolistId: string]: TaskType[]
}

export type TasksActionsTypes =
  | ReturnType<typeof createTaskAC>
  | ReturnType<typeof deleteTaskAC>
  | ReturnType<typeof updateTaskAC>
  | ReturnType<typeof setTasksAC>

export type UpdateDomainModelTaskType = {
  description?: string
  title?: string
  status?: TaskStatuses
  priority?: TaskPriorities
  startDate?: string
  deadline?: string
}
