import { v1 } from 'uuid'

export type FilterType = 'all' | 'active' | 'completed'

export type TaskType = {
  id: string
  title: string
  isDone: boolean
}

export type TasksType = {
  [todolistId: string]: TaskType[]
}

export type TodolistType = {
  id: string
  title: string
  filter: FilterType
}

const todolistId_1: string = v1()
// const todolistId_2: string = v1()

export const todolists: TodolistType[] = [
  { id: todolistId_1, title: 'what to learn', filter: 'all' },
  // { id: todolistId_2, title: 'what to buy', filter: 'all' },
]

export const tasks: TasksType = {
  [todolistId_1]: [
    { id: v1(), title: 'html', isDone: false },
    { id: v1(), title: 'css', isDone: false },
    { id: v1(), title: 'js', isDone: false },
  ],
  // [todolistId_2]: [
  //   { id: v1(), title: 'beer', isDone: false },
  //   { id: v1(), title: 'milk', isDone: false },
  //   { id: v1(), title: 'meet', isDone: false },
  // ],
}