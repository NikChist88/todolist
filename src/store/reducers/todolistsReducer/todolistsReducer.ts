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
    case 'CREATE_TODOLIST':
      return [{ ...action.todolist, filter: 'all' }, ...state]

    // Delete Todolist
    case 'DELETE_TODOLIST':
      return state.filter((tl) => tl.id !== action.id)

    // Change Todolist Filter
    case 'CHANGE_TODOLIST_FILTER':
      return state.map((tl) =>
        tl.id === action.id ? { ...tl, filter: action.filter } : tl
      )

    // Set Todolists
    case 'SET_TODOLISTS':
      return action.todolists.map((tl) => ({ ...tl, filter: 'all' }))

    // Default
    default:
      return state
  }
}
