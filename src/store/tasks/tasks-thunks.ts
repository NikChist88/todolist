import { TaskType, todolistsAPI, UpdateTaskModelType } from "../../api/todolists-api"
import { setAppError, setAppStatus } from "../app/app-reducer"
import { UpdateDomainModelTaskType } from "./tasks-reducer"
import { createAsyncThunk } from "@reduxjs/toolkit"

export const fetchTasks = createAsyncThunk("tasks/fetchTasks", async (todolistId: string, { dispatch, rejectWithValue }) => {
  dispatch(setAppStatus("loading"))
  try {
    const { data, status } = await todolistsAPI.getTasks(todolistId)
    if (status === 200) {
      const tasks = data.items
      dispatch(setAppStatus("succeeded"))
      return { todolistId, tasks }
    }
  } catch (err) {
    dispatch(setAppStatus("failed"))
    dispatch(setAppError({ message: "An error occured!", severity: "error" }))
    return rejectWithValue(err)
  }
})

export const createTaskTC = createAsyncThunk(
  "tasks/createTask",
  async (param: { todolistId: string; title: string }) => {
    const { data } = await todolistsAPI.createTask(param.todolistId, param.title)
    return { todolistId: param.todolistId, task: data.data.item }
  }
)

export const deleteTaskTC = createAsyncThunk("tasks/deleteTask", async (param: { todolistId: string; id: string }) => {
  await todolistsAPI.deleteTask(param.todolistId, param.id)
  return { todolistId: param.todolistId, id: param.id }
})

export const updateTaskTC = createAsyncThunk(
  "tasks/updateTask",
  async (param: { todolistId: string; id: string; model: UpdateDomainModelTaskType }, thunkAPI) => {
    const state: any = thunkAPI.getState()
    const task: TaskType = state.tasks[param.todolistId].find((t: TaskType) => t.id === param.id)

    if (!task) {
      thunkAPI.dispatch(setAppError({ message: "Task not found!", severity: "error" }))
      return
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

    await todolistsAPI.updateTask(param.todolistId, param.id, apiModel)
    return { todolistId: param.todolistId, id: param.id, model: apiModel }
  }
)
