import { Dispatch } from 'redux'
import { TodolistType, todolistsAPI } from '../../../api/todolistsAPI'
import {
  SetTodolistsActionType,
  TodolistsActionsTypes,
  UserTodolistsActionTypes,
} from './todolistsTypes'
import { setTodolistsAC } from './todolistsActionCreator'

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
        id: action.payload.todolistId,
        title: action.payload.title,
        filter: 'all',
        addedDate: '',
        order: 0,
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

export const fetchTodolistsTC = () => {
  return (dispatch: Dispatch<SetTodolistsActionType>) => {
    todolistsAPI.getTodolists().then((res) => {
      dispatch(setTodolistsAC(res.data))
    })
  }
}
