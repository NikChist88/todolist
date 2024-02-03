import { TodolistType } from '../../../api/types'
import { FilterType } from './todolistsReducer'

export enum UserTodolistsActionTypes {
  CREATE_TODOLIST = 'CREATE_TODOLIST',
  DELETE_TODOLIST = 'DELETE_TODOLIST',
  CHANGE_TODOLIST_FILTER = 'CHANGE_TODOLIST_FILTER',
  SET_TODOLISTS = 'SET_TODOLISTS',
}

export type CreateTodolistActionType = {
  type: UserTodolistsActionTypes.CREATE_TODOLIST
  payload: { todolist: TodolistType }
}

export type DeleteTodolistActionType = {
  type: UserTodolistsActionTypes.DELETE_TODOLIST
  payload: { todolistId: string }
}

export type ChangeTodolistFilterActionType = {
  type: UserTodolistsActionTypes.CHANGE_TODOLIST_FILTER
  payload: { todolistId: string; filter: FilterType }
}

export type SetTodolistsActionType = {
  type: UserTodolistsActionTypes.SET_TODOLISTS
  payload: { todolists: TodolistType[] }
}

export type TodolistsActionsTypes =
  | CreateTodolistActionType
  | DeleteTodolistActionType
  | ChangeTodolistFilterActionType
  | SetTodolistsActionType
