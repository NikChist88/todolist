import {
  TodolistType,
  TodolistsActionsTypes,
  UserTodolistsActionTypes,
} from '../../types/todolists'

const initialState: TodolistType[] = []

export const todolistsReducer = (
  state: TodolistType[] = initialState,
  action: TodolistsActionsTypes
): TodolistType[] => {
  switch (action.type) {
    // Create Todolist
    case UserTodolistsActionTypes.CREATE_TODOLIST: {
      const newTodolist: TodolistType = {
        id: action.payload.todolistId,
        title: action.payload.title,
        filter: 'all',
      }

      return [newTodolist, ...state]
    }

    // Remove Todolist
    case UserTodolistsActionTypes.REMOVE_TODOLIST: {
      return state.filter(
        (tl: TodolistType) => tl.id !== action.payload.todolistId
      )
    }

    // Change Todolist Filter
    case UserTodolistsActionTypes.CHANGE_TODOLIST_FILTER: {
      return state.map((tl: TodolistType) =>
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
