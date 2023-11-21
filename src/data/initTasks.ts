import { v1 } from 'uuid'

export type TaskType = {
  id: string
  task: string
  isDone: boolean
}

export const initTasks: TaskType[] = [
  {
    id: v1(),
    task: 'HTML',
    isDone: false,
  },
  {
    id: v1(),
    task: 'CSS',
    isDone: false,
  },
  {
    id: v1(),
    task: 'JS',
    isDone: false,
  },
]
