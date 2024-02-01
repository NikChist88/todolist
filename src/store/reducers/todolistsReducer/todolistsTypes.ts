import { TodolistType } from '../../../api/todolistsAPI'
import { FilterType } from './todolistsReducer'

export enum UserTodolistsActionTypes {
  REMOVE_TODOLIST = 'REMOVE_TODOLIST',
  CREATE_TODOLIST = 'CREATE_TODOLIST',
  CHANGE_TODOLIST_FILTER = 'CHANGE_TODOLIST_FILTER',
  SET_TODOLISTS = 'SET_TODOLISTS',
}

export type RemoveTodolistActionType = {
  type: UserTodolistsActionTypes.REMOVE_TODOLIST
  payload: { todolistId: string }
}

export type CreateTodolistActionType = {
  type: UserTodolistsActionTypes.CREATE_TODOLIST
  payload: { title: string; todolistId: string }
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
  | RemoveTodolistActionType
  | CreateTodolistActionType
  | ChangeTodolistFilterActionType
  | SetTodolistsActionType
