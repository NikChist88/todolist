import { TaskPriorities, TaskStatuses, TaskType } from '../../../api/types'
import {
  CreateTodolistActionType,
  DeleteTodolistActionType,
  SetTodolistsActionType,
} from '../todolistsReducer/todolistsTypes'

export enum UserTaskActionTypes {
  CREATE_TASK = 'CREATE_TASK',
  SET_TASKS = 'SET_TASKS',
  UPDATE_TASK = 'UPDATE_TASK',
  DELETE_TASK = 'DELETE_TASK',
  CREATE_TODOLIST = 'CREATE_TODOLIST',
  DELETE_TODOLIST = 'DELETE_TODOLIST',
}

export type CreateTaskActionType = {
  type: UserTaskActionTypes.CREATE_TASK
  payload: { task: TaskType }
}

export type DeleteTaskActionType = {
  type: UserTaskActionTypes.DELETE_TASK
  payload: { todolistId: string; taskId: string }
}

export type UpdateDomainModelTaskType = {
  description?: string
  title?: string
  status?: TaskStatuses
  priority?: TaskPriorities
  startDate?: string
  deadline?: string
}

export type UpdateTaskActionType = {
  type: UserTaskActionTypes.UPDATE_TASK
  payload: {
    todolistId: string
    taskId: string
    model: UpdateDomainModelTaskType
  }
}

export type SetTasksActionType = {
  type: UserTaskActionTypes.SET_TASKS
  payload: { todolistId: string; tasks: TaskType[] }
}

export type TasksActionsType =
  | CreateTaskActionType
  | DeleteTaskActionType
  | UpdateTaskActionType
  | CreateTodolistActionType
  | DeleteTodolistActionType
  | SetTodolistsActionType
  | SetTasksActionType
