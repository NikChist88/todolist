import { TodolistType } from '../../../api/todolistsAPI'
import {
  TodolistsActionsTypes,
  UserTodolistsActionTypes,
} from '../../types/todolistsTypes'

export type FilterType = 'all' | 'active' | 'completed'

export type TodolistDomainType = TodolistType & {
  filter: FilterType
}

// const initialState: TodolistDomainType[] = []

export const todolistsReducer = (
  state: TodolistDomainType[] = [],
  action: TodolistsActionsTypes
): TodolistDomainType[] => {
  switch (action.type) {

    // Create Todolist
    case UserTodolistsActionTypes.CREATE_TODOLIST: {
      const newTodolist: TodolistDomainType = {
        id: action.payload.todolistId,
        title: action.payload.title,
        filter: 'all',
        addedDate: '',
        order: 0
      }

      return [newTodolist, ...state]
    }

    // Remove Todolist
    case UserTodolistsActionTypes.REMOVE_TODOLIST: {
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

    // Default
    default:
      return state
  }
}
