import { FilterType } from './todolistsReducer'
import {
  DeleteTodolistActionType,
  CreateTodolistActionType,
  ChangeTodolistFilterActionType,
  SetTodolistsActionType,
  UserTodolistsActionTypes,
} from './todolistsTypes'
import { TodolistType } from '../../../api/types'
import { todolistsAPI } from '../../../api/todolistsAPI'
import { Dispatch } from 'react'

// Actions
export const createTodolistAC = (
  todolist: TodolistType
): CreateTodolistActionType => {
  return {
    type: UserTodolistsActionTypes.CREATE_TODOLIST,
    payload: { todolist },
  }
}

export const deleteTodolistAC = (
  todolistId: string
): DeleteTodolistActionType => {
  return {
    type: UserTodolistsActionTypes.DELETE_TODOLIST,
    payload: { todolistId },
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

export const setTodolistsAC = (
  todolists: TodolistType[]
): SetTodolistsActionType => {
  return {
    type: UserTodolistsActionTypes.SET_TODOLISTS,
    payload: { todolists },
  }
}

// Thunks
export const fetchTodolistsTC = () => {
  return (dispatch: Dispatch<SetTodolistsActionType>) => {
    todolistsAPI
      .getTodolists()
      .then((res) => {
        dispatch(setTodolistsAC(res.data))
      })
      .catch((err: string) => {
        console.error(err)
      })
  }
}

export const createTodolistTC = (title: string) => {
  return (dispatch: Dispatch<CreateTodolistActionType>) => {
    todolistsAPI
      .createTodolist(title)
      .then(({ status, data }) => {
        status === 200 && dispatch(createTodolistAC(data.data.item))
      })
      .catch((err: string) => {
        console.error(err)
      })
  }
}

export const deleteTodolistTC = (id: string) => {
  return (dispatch: Dispatch<DeleteTodolistActionType>) => {
    todolistsAPI
      .deleteTodolist(id)
      .then((res) => {
        res.status === 200 && dispatch(deleteTodolistAC(id))
      })
      .catch((err: string) => {
        console.error(err)
      })
  }
}
