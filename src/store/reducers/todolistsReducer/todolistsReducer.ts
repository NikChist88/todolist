import { TodolistType } from '../../../api/types'
import {
  TodolistsActionsTypes,
  UserTodolistsActionTypes,
} from './todolistsTypes'

export type FilterType = 'all' | 'active' | 'completed'

export type TodolistDomainType = TodolistType & {
  filter: FilterType
}

export const todolistsReducer = (
  state: TodolistDomainType[] = [],
  action: TodolistsActionsTypes
): TodolistDomainType[] => {
  switch (action.type) {
    // Create Todolist
    case UserTodolistsActionTypes.CREATE_TODOLIST: {
      const newTodolist: TodolistDomainType = {
        ...action.payload.todolist,
        filter: 'all',
      }

      return [newTodolist, ...state]
    }

    // Delete Todolist
    case UserTodolistsActionTypes.DELETE_TODOLIST: {
      return state.filter(
        (tl: TodolistDomainType) => tl.id !== action.payload.todolistId
      )
    }

    // Change Todolist Filter
    case UserTodolistsActionTypes.CHANGE_TODOLIST_FILTER: {
      return state.map((tl: TodolistDomainType) =>
        tl.id === action.payload.todolistId
          ? { ...tl, filter: action.payload.filter }
          : tl
      )
    }

    // Set Todolists
    case UserTodolistsActionTypes.SET_TODOLISTS: {
      return action.payload.todolists.map((tl: TodolistType) => {
        return { ...tl, filter: 'all' }
      })
    }

    // Default
    default:
      return state
  }
}
