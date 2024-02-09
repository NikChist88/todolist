import { TodolistType } from '../../../api/types'
import { todolistsAPI } from '../../../api/todolistsApi'
import { Dispatch } from 'react'

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


// actions
export const createTodolistAC = (todolist: TodolistType) =>
  ({ type: 'CREATE_TODOLIST', todolist } as const)

export const deleteTodolistAC = (id: string) =>
  ({ type: 'DELETE_TODOLIST', id } as const)

export const changeTodolistFilterAC = (filter: FilterType, id: string) =>
  ({ type: 'CHANGE_TODOLIST_FILTER', id, filter } as const)

export const setTodolistsAC = (todolists: TodolistType[]) =>
  ({ type: 'SET_TODOLISTS', todolists } as const)


// thunks
export const fetchTodolistsTC =
  () => (dispatch: Dispatch<TodolistsActionsTypes>) => {
    todolistsAPI
      .getTodolists()
      .then((res) => {
        res.status === 200 && dispatch(setTodolistsAC(res.data))
      })
      .catch((err: string) => {
        console.error(err)
      })
  }

export const createTodolistTC =
  (title: string) => (dispatch: Dispatch<TodolistsActionsTypes>) => {
    todolistsAPI
      .createTodolist(title)
      .then(({ status, data }) => {
        status === 200 && dispatch(createTodolistAC(data.data.item))
      })
      .catch((err: string) => {
        console.error(err)
      })
  }

export const deleteTodolistTC =
  (id: string) => (dispatch: Dispatch<TodolistsActionsTypes>) => {
    todolistsAPI
      .deleteTodolist(id)
      .then((res) => {
        res.status === 200 && dispatch(deleteTodolistAC(id))
      })
      .catch((err: string) => {
        console.error(err)
      })
  }

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
