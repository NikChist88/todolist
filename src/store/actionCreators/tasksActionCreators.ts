import {
  RemoveTaskActionType,
  UpdateTaskTitleActionType,
  AddTaskActionType,
  ChangeTaskStatusActionType,
  UserTaskActionTypes,
} from '../types/tasksTypes'
import { TaskStatuses } from '../../api/todolistsAPI'
import { v1 } from 'uuid'

export const removeTaskAC = (
  taskId: string,
  todolistId: string
): RemoveTaskActionType => {
  return {
    type: UserTaskActionTypes.REMOVE_TASK,
    payload: { taskId, todolistId },
  }
}

export const createTaskAC = (
  taskTitle: string,
  todolistId: string
): AddTaskActionType => {
  return {
    type: UserTaskActionTypes.CREATE_TASK,
    payload: { taskTitle, todolistId, taskId: v1() },
  }
}

export const updateTaskAC = (
  taskId: string,
  todolistId: string,
  newTaskTitle: string
): UpdateTaskTitleActionType => {
  return {
    type: UserTaskActionTypes.UPDATE_TASK_TITLE,
    payload: { taskId, todolistId, newTaskTitle },
  }
}

export const changeTaskStatusAC = (
  taskId: string,
  todolistId: string,
  status: TaskStatuses
): ChangeTaskStatusActionType => {
  return {
    type: UserTaskActionTypes.CHANGE_TASK_STATUS,
    payload: { taskId, todolistId, status },
  }
}
