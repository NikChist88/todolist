import { v1 } from 'uuid'
import { FilterType } from '../reducers/todolistsReducer/todolistsReducer'
import {
  RemoveTodolistActionType,
  CreateTodolistActionType,
  ChangeTodolistFilterActionType,
  UserTodolistsActionTypes,
} from '../types/todolistsTypes'

export const removeTodolistAC = (
  todolistId: string
): RemoveTodolistActionType => {
  return {
    type: UserTodolistsActionTypes.REMOVE_TODOLIST,
    payload: { todolistId },
  }
}

export const createTodolistAC = (title: string): CreateTodolistActionType => {
  return {
    type: UserTodolistsActionTypes.CREATE_TODOLIST,
    payload: { title, todolistId: v1() },
  }
}

export const changeTodolistFilterAC = (
  filter: FilterType,
  todolistId: string
): ChangeTodolistFilterActionType => {
  return {
    type: UserTodolistsActionTypes.CHANGE_TODOLIST_FILTER,
    payload: { todolistId, filter },
  }
}
