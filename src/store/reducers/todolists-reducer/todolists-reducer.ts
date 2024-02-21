import { TodolistType } from "../../../api/todolists-api"

// reducer
export const todolistsReducer = (
  state: TodolistDomainType[] = [],
  action: TodolistsActionsTypes
): TodolistDomainType[] => {
  switch (action.type) {
    case "CREATE_TODOLIST":
      return [{ ...action.todolist, filter: "all" }, ...state]

    case "DELETE_TODOLIST":
      return state.filter((tl) => tl.id !== action.id)

    case "UPDATE_TITLE":
      return state.map((tl) => (tl.id === action.id ? { ...tl, title: action.title } : tl))

    case "CHANGE_FILTER":
      return state.map((tl) => (tl.id === action.id ? { ...tl, filter: action.filter } : tl))

    case "SET_TODOLISTS":
      return action.todolists.map((tl) => ({ ...tl, filter: "all" }))

    default:
      return state
  }
}

// actions
export const createTodolistAC = (todolist: TodolistType) => ({ type: "CREATE_TODOLIST", todolist } as const)

export const deleteTodolistAC = (id: string) => ({ type: "DELETE_TODOLIST", id } as const)

export const updateTitleAC = (id: string, title: string) =>
  ({
    type: "UPDATE_TITLE",
    id,
    title,
  } as const)

export const changeFilterAC = (filter: FilterType, id: string) => ({ type: "CHANGE_FILTER", id, filter } as const)

export const setTodolistsAC = (todolists: TodolistType[]) => ({ type: "SET_TODOLISTS", todolists } as const)

// types
export type FilterType = "all" | "active" | "completed"

export type TodolistDomainType = TodolistType & {
  filter: FilterType
}

export type TodolistsActionsTypes =
  | ReturnType<typeof createTodolistAC>
  | ReturnType<typeof deleteTodolistAC>
  | ReturnType<typeof updateTitleAC>
  | ReturnType<typeof changeFilterAC>
  | ReturnType<typeof setTodolistsAC>
