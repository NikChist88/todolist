import axios from 'axios'

const instance = axios.create({
  withCredentials: true,
  headers: {
    'API-KEY': '4e024169-0fcb-4c25-aa1d-c6adfa882144',
  },
  baseURL: 'https://social-network.samuraijs.com/api/1.1/',
})

export type TodolistType = {
  id: string
  title: string
  addedDate: string
  order: number
}

type ResponseType<Data = {}> = {
  resultCode: number
  messages: string[]
  data: Data
}

type TaskType = {
  description: string
  title: string
  status: number
  priority: number
  startDate: string
  deadline: string
  id: string
  todoListId: string
  order: number
  addedDate: string
}

type GetTaskResponse = {
  error: string | null
  totalCount: number
  items: TaskType[]
}

type UpdateTaskType = {
  description: string
  title: string
  status: number
  priority: number
  startDate: string
  deadline: string
}

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

  updateTodolistTitle(id: string, title: string) {
    return instance.put<ResponseType>(`todo-lists/${id}`, { title: title })
  },

  // Tasks
  getTasks(todolistId: string) {
    return instance.get<GetTaskResponse>(`todo-lists/${todolistId}/tasks`)
  },

  deleteTask(todolistId: string, taskId: string) {
    return instance.delete<ResponseType>(
      `todo-lists/${todolistId}/tasks/${taskId}`
    )
  },

  createTask(todolistId: string, title: string) {
    return instance.post<ResponseType<{ item: TaskType }>>(
      `todo-lists/${todolistId}/tasks`,
      {
        title: title,
      }
    )
  },

  updateTaskTitle(todolistId: string, taskId: string, title: string) {
    return instance.put<UpdateTaskType>(
      `todo-lists/${todolistId}/tasks/${taskId}`,
      { title: title }
    )
  },
}
