import { TodolistType } from '../../../api/types'
import { TodolistsActionsTypes } from './todolistsActionCreator'

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
    case 'CREATE_TODOLIST': {
      const newTodolist: TodolistDomainType = {
        ...action.payload.todolist,
        filter: 'all',
      }

      return [newTodolist, ...state]
    }

    // Delete Todolist
    case 'DELETE_TODOLIST': {
      return state.filter(
        (tl: TodolistDomainType) => tl.id !== action.payload.id
      )
    }

    // Change Todolist Filter
    case 'CHANGE_TODOLIST_FILTER': {
      return state.map((tl: TodolistDomainType) =>
        tl.id === action.payload.id
          ? { ...tl, filter: action.payload.filter }
          : tl
      )
    }

    // Set Todolists
    case 'SET_TODOLISTS': {
      return action.payload.todolists.map((tl: TodolistType) => {
        return { ...tl, filter: 'all' }
      })
    }

    // Default
    default:
      return state
  }
}
