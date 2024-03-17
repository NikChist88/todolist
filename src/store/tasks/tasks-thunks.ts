import { todolistsAPI, UpdateTaskModelType } from "../../api/todolists-api"
import { setAppError, setAppStatus } from "../app/app-reducer"
import { AppRootState } from "../store"
import { UpdateDomainModelTaskType } from "./tasks-reducer"
import { createAsyncThunk } from "@reduxjs/toolkit"

export const fetchTasks = createAsyncThunk(
  "tasks/fetchTasks",
  async (todolistId: string, { dispatch, rejectWithValue }) => {
    dispatch(setAppStatus("loading"))
    try {
      const { data, status } = await todolistsAPI.getTasks(todolistId)
      if (status === 200) {
        const tasks = data.items
        dispatch(setAppStatus("succeeded"))
        return { todolistId, tasks }
      } else {
        dispatch(setAppError({ message: data.error, severity: "error" }))
        dispatch(setAppStatus("failed"))
      }
    } catch (err) {
      return rejectWithValue(err)
    }
  }
)

export const createTaskTC = createAsyncThunk(
  "tasks/createTask",
  async (param: { todolistId: string; title: string }, { dispatch, rejectWithValue }) => {
    try {
      const { data } = await todolistsAPI.createTask(param.todolistId, param.title)
      if (data.resultCode === 0) {
        return { todolistId: param.todolistId, task: data.data.item }
      } else {
        dispatch(setAppError({ message: data.messages.toString(), severity: "error" }))
      }
    } catch (err) {
      return rejectWithValue(err)
    }
  }
)

export const deleteTaskTC = createAsyncThunk("tasks/deleteTask", async (param: { todolistId: string; id: string }) => {
  await todolistsAPI.deleteTask(param.todolistId, param.id)
  return { todolistId: param.todolistId, id: param.id }
})

export const updateTaskTC = createAsyncThunk(
  "tasks/updateTask",
  async (
    param: { todolistId: string; id: string; model: UpdateDomainModelTaskType },
    { dispatch, rejectWithValue, getState }
  ) => {
    const state = getState() as AppRootState
    const task = state.tasks[param.todolistId].find((t) => t.id === param.id)

    if (!task) {
      dispatch(setAppError({ message: "Task not found!", severity: "error" }))
      return rejectWithValue("Task not found!")
    }

    const apiModel: UpdateTaskModelType = {
      description: task.description,
      title: task.title,
      status: task.status,
      priority: task.priority,
      startDate: task.startDate,
      deadline: task.deadline,
      ...param.model,
    }

    try {
      const { data } = await todolistsAPI.updateTask(param.todolistId, param.id, apiModel)
      if (data.resultCode === 0) {
        return { todolistId: param.todolistId, id: param.id, model: apiModel }
      } else {
        dispatch(setAppError({ message: data.messages.toString(), severity: "error" }))
      }
    } catch (err) {
      return rejectWithValue(err)
    }
  }
)
