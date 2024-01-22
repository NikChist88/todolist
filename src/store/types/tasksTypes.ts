import {
  CreateTodolistActionType,
  RemoveTodolistActionType,
} from './todolistsTypes'

export type TaskType = {
  id: string
  title: string
  isDone: boolean
}

export type TasksType = {
  [todolistId: string]: TaskType[]
}

export enum UserTaskActionTypes {
  REMOVE_TASK = 'REMOVE_TASK',
  CREATE_TASK = 'CREATE_TASK',
  UPDATE_TASK_TITLE = 'UPDATE_TASK_TITLE',
  CHANGE_TASK_STATUS = 'CHANGE_TASK_STATUS',
  CREATE_TODOLIST = 'CREATE_TODOLIST',
  REMOVE_TODOLIST = 'REMOVE_TODOLIST',
}

export type RemoveTaskActionType = {
  type: UserTaskActionTypes.REMOVE_TASK
  payload: { taskId: string; todolistId: string }
}

export type AddTaskActionType = {
  type: UserTaskActionTypes.CREATE_TASK
  payload: { taskTitle: string; todolistId: string; taskId: string }
}

export type UpdateTaskTitleActionType = {
  type: UserTaskActionTypes.UPDATE_TASK_TITLE
  payload: { newTaskTitle: string; taskId: string; todolistId: string }
}

export type ChangeTaskStatusActionType = {
  type: UserTaskActionTypes.CHANGE_TASK_STATUS
  payload: { taskId: string; todolistId: string; isDone: boolean }
}

export type TasksActionsType =
  | RemoveTaskActionType
  | AddTaskActionType
  | UpdateTaskTitleActionType
  | ChangeTaskStatusActionType
  | CreateTodolistActionType
  | RemoveTodolistActionType
