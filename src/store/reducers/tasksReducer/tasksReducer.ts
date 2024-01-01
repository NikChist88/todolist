import {
  TasksType,
  TasksActionsType,
  UserTaskActionTypes,
  TaskType,
} from '../../types/tasks'
import { UserTodolistsActionTypes } from '../../types/todolists'

const initialState: TasksType = {}

export const tasksReducer = (
  state: TasksType = initialState,
  action: TasksActionsType
): TasksType => {
  switch (action.type) {
    // Create Task
    case UserTaskActionTypes.CREATE_TASK: {
      const newTask: TaskType = {
        id: action.payload.taskId,
        title: action.payload.taskTitle,
        isDone: false,
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
        (t: TaskType) => t.id !== action.payload.taskId
      )

      return { ...state, [action.payload.todolistId]: filteredTasks }
    }

    // Update Task Title
    case UserTaskActionTypes.UPDATE_TASK_TITLE: {
      const updatedTasks = state[action.payload.todolistId].map((t: TaskType) =>
        t.id === action.payload.taskId
          ? { ...t, title: action.payload.newTaskTitle }
          : t
      )

      return { ...state, [action.payload.todolistId]: updatedTasks }
    }

    // Change Task Status
    case UserTaskActionTypes.CHANGE_TASK_STATUS: {
      const updatedTasks = state[action.payload.todolistId].map((t: TaskType) =>
        t.id === action.payload.taskId
          ? { ...t, isDone: !action.payload.isDone }
          : t
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
