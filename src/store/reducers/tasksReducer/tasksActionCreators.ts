import {
  TaskPriorities,
  TaskStatuses,
  TaskType,
  UpdateTaskModelType,
} from '../../../api/types'
import { todolistsAPI } from '../../../api/todolistsAPI'
import { Dispatch } from 'react'
import { RootStateType } from '../../store'

// types
export type TasksActionsTypes =
  | ReturnType<typeof createTaskAC>
  | ReturnType<typeof deleteTaskAC>
  | ReturnType<typeof updateTaskAC>
  | ReturnType<typeof setTasksAC>

export type UpdateDomainModelTaskType = {
  description?: string
  title?: string
  status?: TaskStatuses
  priority?: TaskPriorities
  startDate?: string
  deadline?: string
}


// actions
export const createTaskAC = (task: TaskType) =>
  ({ type: 'CREATE_TASK', task } as const)

export const deleteTaskAC = (todolistId: string, id: string) =>
  ({ type: 'DELETE_TASK', todolistId, id } as const)

export const updateTaskAC = (
  todolistId: string,
  id: string,
  model: UpdateDomainModelTaskType
) => ({ type: 'UPDATE_TASK', todolistId, id, model } as const)

export const setTasksAC = (todolistId: string, tasks: TaskType[]) =>
  ({ type: 'SET_TASKS', todolistId, tasks } as const)

  
// thunks
export const fetchTasksTC =
  (todolistId: string) => (dispatch: Dispatch<TasksActionsTypes>) => {
    todolistsAPI
      .getTasks(todolistId)
      .then(({ status, data }) => {
        status === 200 && dispatch(setTasksAC(todolistId, data.items))
      })
      .catch((err: string) => {
        console.error(err)
      })
  }

export const createTaskTC =
  (todolistId: string, title: string) =>
  (dispatch: Dispatch<TasksActionsTypes>) => {
    todolistsAPI
      .createTask(todolistId, title)
      .then(({ status, data }) => {
        status === 200 && dispatch(createTaskAC(data.data.item))
      })
      .catch((err: string) => {
        console.error(err)
      })
  }

export const deleteTaskTC =
  (todolistId: string, id: string) =>
  (dispatch: Dispatch<TasksActionsTypes>) => {
    todolistsAPI
      .deleteTask(todolistId, id)
      .then((res) => {
        res.status === 200 && dispatch(deleteTaskAC(todolistId, id))
      })
      .catch((err: string) => {
        console.error(err)
      })
  }

export const updateTaskTC =
  (todolistId: string, id: string, model: UpdateDomainModelTaskType) =>
  (dispatch: Dispatch<TasksActionsTypes>, getState: () => RootStateType) => {
    const state = getState()
    const task = state.tasks[todolistId].find((t) => t.id === id)

    if (!task) {
      console.error('Task not found!')
      return
    }

    const apiModel: UpdateTaskModelType = {
      description: task.description,
      title: task.title,
      status: task.status,
      priority: task.priority,
      startDate: task.startDate,
      deadline: task.deadline,
      ...model,
    }

    todolistsAPI
      .updateTask(todolistId, id, apiModel)
      .then((res) => {
        res.status === 200 && dispatch(updateTaskAC(todolistId, id, model))
      })
      .catch((err: string) => {
        console.error(err)
      })
  }
