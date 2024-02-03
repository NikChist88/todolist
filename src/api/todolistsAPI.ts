import axios from 'axios'
import {
  TodolistType,
  GetTaskResponse,
  TaskType,
  UpdateTaskModelType,
  ResponseType,
} from './types'

const instance = axios.create({
  withCredentials: true,
  headers: {
    'API-KEY': '4e024169-0fcb-4c25-aa1d-c6adfa882144',
  },
  baseURL: 'https://social-network.samuraijs.com/api/1.1/',
})

export const todolistsAPI = {
  // Todolists
  getTodolists() {
    return instance.get<TodolistType[]>('todo-lists')
  },

  createTodolist(title: string) {
    return instance.post<ResponseType<{ item: TodolistType }>>('todo-lists', {
      title: title,
    })
  },

  deleteTodolist(id: string) {
    return instance.delete<ResponseType>(`todo-lists/${id}`)
  },

  updateTodolist(id: string, title: string) {
    return instance.put<ResponseType>(`todo-lists/${id}`, { title: title })
  },

  // Tasks
  getTasks(todolistId: string) {
    return instance.get<GetTaskResponse>(`todo-lists/${todolistId}/tasks/`)
  },

  createTask(todolistId: string, title: string) {
    return instance.post<ResponseType<{ item: TaskType }>>(
      `todo-lists/${todolistId}/tasks`,
      {
        title: title,
      }
    )
  },

  deleteTask(todolistId: string, taskId: string) {
    return instance.delete<ResponseType>(
      `todo-lists/${todolistId}/tasks/${taskId}`
    )
  },

  updateTask(todolistId: string, taskId: string, model: UpdateTaskModelType) {
    return instance.put<ResponseType<TaskType>>(
      `todo-lists/${todolistId}/tasks/${taskId}`,
      { ...model }
    )
  },
}
