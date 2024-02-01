import { Dispatch } from 'redux'
import {
  TaskType,
  TaskStatuses,
  TaskPriorities,
  TodolistType,
  todolistsAPI,
} from '../../../api/todolistsAPI'
import {
  SetTasksActionType,
  TasksActionsType,
  UserTaskActionTypes,
} from './tasksTypes'
import { UserTodolistsActionTypes } from '../todolistsReducer/todolistsTypes'
import { setTasksAC } from './tasksActionCreators'

export type TasksType = {
  [todolistId: string]: TaskType[]
}

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

    // Set Todolists
    case UserTodolistsActionTypes.SET_TODOLISTS: {
      const copyState = { ...state }
      action.payload.todolists.forEach((tl: TodolistType) => {
        copyState[tl.id] = []
      })
      return copyState
    }

    // Set Tasks
    case UserTaskActionTypes.SET_TASKS: {
      return { ...state, [action.payload.todolistId]: action.payload.tasks }
    }

    // Default
    default:
      return state
  }
}

export const fetchTasksTC = (todolistId: string) => {
  return (dispatch: Dispatch<SetTasksActionType>) => {
    todolistsAPI.getTasks(todolistId).then((res) => {
      dispatch(setTasksAC(todolistId, res.data.items))
    })
  }
}
