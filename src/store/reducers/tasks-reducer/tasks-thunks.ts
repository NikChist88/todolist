import { AxiosError } from "axios"
import { todolistsAPI, UpdateTaskModelType } from "../../../api/todolists-api"
import { AppThunk, AppRootState } from "../../store"
import { setErrorAC, setStatusAC } from "../app-reducer/app-reducer"
import { setTasksAC, createTaskAC, deleteTaskAC, UpdateDomainModelTaskType, updateTaskAC } from "./tasks-reducer"

export const fetchTasksTC =
  (todolistId: string): AppThunk =>
  (dispatch) => {
    dispatch(setStatusAC("loading"))
    todolistsAPI
      .getTasks(todolistId)
      .then(({ status, data }) => {
        if (status === 200) {
          dispatch(setTasksAC(todolistId, data.items))
          dispatch(setStatusAC("succeeded"))
        }
      })
      .catch((err: AxiosError) => {
        dispatch(setErrorAC(err.message))
        dispatch(setStatusAC("failed"))
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
      .catch((err: AxiosError) => {
        dispatch(setErrorAC(err.message))
      })
  }

export const deleteTaskTC =
  (todolistId: string, id: string): AppThunk =>
  (dispatch) => {
    todolistsAPI
      .deleteTask(todolistId, id)
      .then(({ status }) => {
        status === 200 && dispatch(deleteTaskAC(todolistId, id))
      })
      .catch((err: AxiosError) => {
        dispatch(setErrorAC(err.message))
      })
  }

export const updateTaskTC =
  (todolistId: string, id: string, model: UpdateDomainModelTaskType): AppThunk =>
  (dispatch, getState: () => AppRootState) => {
    const state = getState()
    const task = state.tasks[todolistId].find((t) => t.id === id)

    if (!task) {
      dispatch(setErrorAC("Task not found!"))
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
      .then(({ status }) => {
        status === 200 && dispatch(updateTaskAC(todolistId, id, model))
      })
      .catch((err: AxiosError) => {
        dispatch(setErrorAC(err.message))
      })
  }
