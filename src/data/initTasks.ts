import { v1 } from 'uuid'
import { TaskType } from '../types/types'

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
