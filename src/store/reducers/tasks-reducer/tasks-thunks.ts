import { AxiosError } from "axios"
import { todolistsAPI, UpdateTaskModelType } from "../../../api/todolists-api"
import { AppThunk, AppRootState } from "../../store"
import { setError, setStatus } from "../app-reducer/app-reducer"
import { actions, UpdateDomainModelTaskType } from "./tasks-reducer"
import { Dispatch } from "redux"

export const fetchTasksTC =
  (todolistId: string): AppThunk =>
  (dispatch: Dispatch) => {
    dispatch(setStatus({ status: "loading" }))
    todolistsAPI
      .getTasks(todolistId)
      .then(({ status, data }) => {
        if (status === 200) {
          dispatch(actions.setTasksAC({ todolistId: todolistId, tasks: data.items }))
          dispatch(setStatus({ status: "succeeded" }))
        }
      })
      .catch((err: AxiosError) => {
        dispatch(setError({ error: err.message }))
        dispatch(setStatus({ status: "failed" }))
      })
  }

export const createTaskTC =
  (todolistId: string, title: string): AppThunk =>
  (dispatch: Dispatch) => {
    todolistsAPI
      .createTask(todolistId, title)
      .then(({ status, data }) => {
        status === 200 && dispatch(actions.createTaskAC({ task: data.data.item }))
      })
      .catch((err: AxiosError) => {
        dispatch(setError({ error: err.message }))
      })
  }

export const deleteTaskTC =
  (todolistId: string, id: string): AppThunk =>
  (dispatch: Dispatch) => {
    todolistsAPI
      .deleteTask(todolistId, id)
      .then(({ status }) => {
        status === 200 && dispatch(actions.deleteTaskAC({ todolistId: todolistId, id: id }))
      })
      .catch((err: AxiosError) => {
        dispatch(setError({ error: err.message }))
      })
  }

export const updateTaskTC =
  (todolistId: string, id: string, model: UpdateDomainModelTaskType): AppThunk =>
  (dispatch: Dispatch, getState: () => AppRootState) => {
    const state = getState()
    const task = state.tasks[todolistId].find((t) => t.id === id)

    if (!task) {
      dispatch(setError({ error: "Task not found!" }))
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
        status === 200 && dispatch(actions.updateTaskAC({ todolistId: todolistId, id: id, model: apiModel }))
      })
      .catch((err: AxiosError) => {
        dispatch(setError({ error: err.message }))
      })
  }
