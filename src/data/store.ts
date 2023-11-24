import { v1 } from 'uuid'

export type FilterType = 'all' | 'active' | 'completed'

export type TodoListType = {
  id: string
  titel: string
  filter: FilterType
}

export type TaskType = {
  title: string
  isDone: boolean
}

export type TasksType = {
  [todoLists: string]: TaskType[]
}

const todoListId_1: string = v1()
const todoListId_2: string = v1()

export const todoLists: TodoListType[] = [
  { id: todoListId_1, titel: 'What to learn', filter: 'all' },
  { id: todoListId_2, titel: 'What to buy', filter: 'all' },
]

export const tasks: TasksType = {
  [todoLists[0].id]: [
    { title: 'HTML', isDone: false },
    { title: 'CSS', isDone: false },
    { title: 'JS', isDone: false },
  ],
  [todoLists[1].id]: [
    { title: 'BEER', isDone: false },
    { title: 'MILK', isDone: false },
    { title: 'MEET', isDone: false },
  ],
}
