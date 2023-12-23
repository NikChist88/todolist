import { TasksType } from '../../store'
import { TaskType } from '../../store'

type RemoveTaskActionType = {
  type: 'REMOVE-TASK'
  id: string
  todolistId: string
}

type AddTaskActionType = {
  type: 'ADD-TASK'
  newTask: TaskType
  todolistId: string
}

type UpdateTaskTitleActionType = {
  type: 'UPDATE-TASK-TITLE'
  newTaskTitle: string
  taskId: string
  todolistId: string
}

type ChangeTaskStatusActionType = {
  type: 'CHANGE-TASK-STATUS'
  taskId: string
  todolistId: string
}

type ActionsType =
  | RemoveTaskActionType
  | AddTaskActionType
  | UpdateTaskTitleActionType
  | ChangeTaskStatusActionType

export const RemoveTaskAC = (
  id: string,
  todolistId: string
): RemoveTaskActionType => {
  return { type: 'REMOVE-TASK', id: id, todolistId: todolistId }
}

export const AddTaskAC = (
  newTask: TaskType,
  todolistId: string
): AddTaskActionType => {
  return { type: 'ADD-TASK', newTask: newTask, todolistId: todolistId }
}

export const UpdateTaskTitleAC = (
  newTaskTitle: string,
  taskId: string,
  todolistId: string
): UpdateTaskTitleActionType => {
  return {
    type: 'UPDATE-TASK-TITLE',
    newTaskTitle: newTaskTitle,
    taskId: taskId,
    todolistId: todolistId,
  }
}

export const ChangeTaskStatusAC = (
  taskId: string,
  todolistId: string
): ChangeTaskStatusActionType => {
  return { type: 'CHANGE-TASK-STATUS', taskId: taskId, todolistId: todolistId }
}

export const tasksReducer = (
  state: TasksType,
  action: ActionsType
): TasksType => {
  switch (action.type) {
    case 'REMOVE-TASK': {
      const updatedTasks = state[action.todolistId].filter(
        (t) => t.id !== action.id
      )
      return { ...state, [action.todolistId]: updatedTasks }
    }

    case 'ADD-TASK':
      return {
        ...state,
        [action.todolistId]: [action.newTask, ...state[action.todolistId]],
      }

    case 'UPDATE-TASK-TITLE': {
      const updatedTasks = state[action.todolistId].map((t) =>
        t.id === action.taskId ? { ...t, title: action.newTaskTitle } : t
      )
      return { ...state, [action.todolistId]: updatedTasks }
    }

    case 'CHANGE-TASK-STATUS': {
      const updatedTasks = state[action.todolistId].map((t) =>
        t.id === action.taskId ? { ...t, isDone: true } : t
      )
      return { ...state, [action.todolistId]: updatedTasks }
    }

    default:
      throw new Error('Wrong action type!')
  }
}
