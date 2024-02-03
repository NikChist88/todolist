export type TodolistType = {
  id: string
  title: string
  addedDate: string
  order: number
}

export type TaskType = {
  description: string
  title: string
  status: TaskStatuses
  priority: TaskPriorities
  startDate: string
  deadline: string
  id: string
  todoListId: string
  order: number
  addedDate: string
}

export enum TaskStatuses {
  New = 0,
  InProgress = 1,
  Completed = 2,
  Draft = 3,
}

export enum TaskPriorities {
  Low = 0,
  Middle = 1,
  Hi = 2,
  Urgently = 3,
  Later = 4,
}

export type ResponseType<Data = {}> = {
  resultCode: number
  messages: string[]
  data: Data
}

export type GetTaskResponse = {
  error: string | null
  totalCount: number
  items: TaskType[]
}

export type UpdateTaskModelType = {
  description: string
  title: string
  status: TaskStatuses
  priority: TaskPriorities
  startDate: string
  deadline: string
}