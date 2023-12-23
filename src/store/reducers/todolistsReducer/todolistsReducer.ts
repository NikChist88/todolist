import { TodolistType } from '../../store'
import { FilterType } from '../../store'
import { v1 } from 'uuid'

type RemoveTodolistActionType = {
  type: 'REMOVE-TODOLIST'
  id: string
}

type CreateTodolistActionType = {
  type: 'CREATE-TODOLIST'
  title: string
}

type ChangeTodolistFilterActionType = {
  type: 'CHANGE-TODOLIST-FILTER'
  id: string
  filter: FilterType
}

type ActionsType =
  | RemoveTodolistActionType
  | CreateTodolistActionType
  | ChangeTodolistFilterActionType

export const todolistsReducer = (
  state: TodolistType[],
  action: ActionsType
): TodolistType[] => {
  switch (action.type) {
    case 'REMOVE-TODOLIST':
      return state.filter((tl) => tl.id !== action.id)

    case 'CREATE-TODOLIST':
      return [
        ...state,
        {
          id: v1(),
          title: action.title,
          filter: 'all',
        },
      ]

    case 'CHANGE-TODOLIST-FILTER':
      return state.map((tl) =>
        tl.id === action.id ? { ...tl, filter: action.filter } : tl
      )

    default:
      throw new Error('Wrong action type!')
  }
}

export const RemoveTodolistAC = (
  todolistId: string
): RemoveTodolistActionType => {
  return { type: 'REMOVE-TODOLIST', id: todolistId }
}

export const CreateTodolistAC = (title: string): CreateTodolistActionType => {
  return { type: 'CREATE-TODOLIST', title: title }
}

export const ChangeTodolistFilterAC = (
  filter: FilterType,
  todolistId: string
): ChangeTodolistFilterActionType => {
  return {
    type: 'CHANGE-TODOLIST-FILTER',
    id: todolistId,
    filter: filter,
  }
}
