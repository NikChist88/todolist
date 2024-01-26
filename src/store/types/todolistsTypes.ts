import { FilterType } from "../reducers/todolistsReducer/todolistsReducer"

export enum UserTodolistsActionTypes {
  REMOVE_TODOLIST = 'REMOVE_TODOLIST',
  CREATE_TODOLIST = 'CREATE_TODOLIST',
  CHANGE_TODOLIST_FILTER = 'CHANGE_TODOLIST_FILTER',
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

export type TodolistsActionsTypes =
  | RemoveTodolistActionType
  | CreateTodolistActionType
  | ChangeTodolistFilterActionType
