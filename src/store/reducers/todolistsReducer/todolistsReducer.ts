import { TodolistType } from "../../../api/todolistsApi"

// reducer
export const todolistsReducer = (
  state: TodolistDomainType[] = [],
  action: TodolistsActionsTypes
): TodolistDomainType[] => {
  switch (action.type) {
    case 'CREATE_TODOLIST':
      return [{ ...action.todolist, filter: 'all' }, ...state]

    case 'DELETE_TODOLIST':
      return state.filter((tl) => tl.id !== action.id)

    case 'CHANGE_TODOLIST_FILTER':
      return state.map((tl) =>
        tl.id === action.id ? { ...tl, filter: action.filter } : tl
      )

    case 'SET_TODOLISTS':
      return action.todolists.map((tl) => ({ ...tl, filter: 'all' }))

    default:
      return state
  }
}


// actions
export const createTodolistAC = (todolist: TodolistType) =>
  ({ type: 'CREATE_TODOLIST', todolist } as const)

export const deleteTodolistAC = (id: string) =>
  ({ type: 'DELETE_TODOLIST', id } as const)

export const changeTodolistFilterAC = (filter: FilterType, id: string) =>
  ({ type: 'CHANGE_TODOLIST_FILTER', id, filter } as const)

export const setTodolistsAC = (todolists: TodolistType[]) =>
  ({ type: 'SET_TODOLISTS', todolists } as const)


// types
export type FilterType = 'all' | 'active' | 'completed'

export type TodolistDomainType = TodolistType & {
  filter: FilterType
}

export type TodolistsActionsTypes =
  | ReturnType<typeof createTodolistAC>
  | ReturnType<typeof deleteTodolistAC>
  | ReturnType<typeof changeTodolistFilterAC>
  | ReturnType<typeof setTodolistsAC>
