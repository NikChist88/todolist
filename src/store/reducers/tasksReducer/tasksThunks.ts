import { todolistsAPI, UpdateTaskModelType } from '../../../api/todolistsApi'
import { AppThunk, RootState } from '../../store'
import { setStatusAC } from '../appReducer/appReducer'
import {
  setTasksAC,
  createTaskAC,
  deleteTaskAC,
  UpdateDomainModelTaskType,
  updateTaskAC,
} from './tasksReducer'

export const fetchTasksTC =
  (todolistId: string): AppThunk =>
  (dispatch) => {
    dispatch(setStatusAC('loading'))
    todolistsAPI
      .getTasks(todolistId)
      .then(({ status, data }) => {
        if (status === 200) {
          dispatch(setTasksAC(todolistId, data.items))
          dispatch(setStatusAC('succeeded'))
        }
      })
      .catch((err: string) => {
        console.error(err)
      })
  }

export const createTaskTC =
  (todolistId: string, title: string): AppThunk =>
  (dispatch) => {
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
  (todolistId: string, id: string): AppThunk =>
  (dispatch) => {
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
  (
    todolistId: string,
    id: string,
    model: UpdateDomainModelTaskType
  ): AppThunk =>
  (dispatch, getState: () => RootState) => {
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
