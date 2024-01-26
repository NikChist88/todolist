import {
  TaskType,
  TaskStatuses,
  TaskPriorities,
} from '../../../api/todolistsAPI'
import { TasksActionsType, UserTaskActionTypes } from '../../types/tasksTypes'
import { UserTodolistsActionTypes } from '../../types/todolistsTypes'

export type TasksType = {
  [todolistId: string]: TaskType[]
}

// const initialState: TasksType = {}

export const tasksReducer = (
  state: TasksType = {},
  action: TasksActionsType
): TasksType => {
  switch (action.type) {

    // Create Task
    case UserTaskActionTypes.CREATE_TASK: {
      const newTask: TaskType = {
        id: action.payload.taskId,
        title: action.payload.taskTitle,
        status: TaskStatuses.New,
        description: '',
        priority: TaskPriorities.Low,
        startDate: '',
        deadline: '',
        todoListId: action.payload.todolistId,
        order: 0,
        addedDate: '',
      }

      const updatedTasks: TaskType[] = [
        newTask,
        ...state[action.payload.todolistId],
      ]

      return {
        ...state,
        [action.payload.todolistId]: updatedTasks,
      }
    }

    // Remove Task
    case UserTaskActionTypes.REMOVE_TASK: {
      const filteredTasks = state[action.payload.todolistId].filter(
        (task: TaskType) => task.id !== action.payload.taskId
      )

      return { ...state, [action.payload.todolistId]: filteredTasks }
    }

    // Update Task Title
    case UserTaskActionTypes.UPDATE_TASK_TITLE: {
      const updatedTasks = state[action.payload.todolistId].map(
        (task: TaskType) =>
          task.id === action.payload.taskId
            ? { ...task, title: action.payload.newTaskTitle }
            : task
      )

      return { ...state, [action.payload.todolistId]: updatedTasks }
    }

    // Change Task Status
    case UserTaskActionTypes.CHANGE_TASK_STATUS: {
      const updatedTasks = state[action.payload.todolistId].map(
        (task: TaskType) =>
          task.id === action.payload.taskId
            ? { ...task, status: action.payload.status }
            : task
      )

      return { ...state, [action.payload.todolistId]: updatedTasks }
    }

    // Create Todolist
    case UserTodolistsActionTypes.CREATE_TODOLIST: {
      return { ...state, [action.payload.todolistId]: [] }
    }

    // Remove Todolist
    case UserTodolistsActionTypes.REMOVE_TODOLIST: {
      delete state[action.payload.todolistId]
      return state
    }

    // Default
    default:
      return state
  }
}
