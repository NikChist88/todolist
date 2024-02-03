import {
  DeleteTaskActionType,
  UpdateTaskActionType,
  CreateTaskActionType,
  UserTaskActionTypes,
  SetTasksActionType,
  UpdateDomainModelTaskType,
} from './tasksTypes'
import { TaskType, UpdateTaskModelType } from '../../../api/types'
import { todolistsAPI } from '../../../api/todolistsAPI'
import { Dispatch } from 'react'
import { RootStateType } from '../../store'

export const createTaskAC = (task: TaskType): CreateTaskActionType => {
  return {
    type: UserTaskActionTypes.CREATE_TASK,
    payload: { task },
  }
}

export const deleteTaskAC = (
  todolistId: string,
  taskId: string,
): DeleteTaskActionType => {
  return {
    type: UserTaskActionTypes.DELETE_TASK,
    payload: { todolistId, taskId },
  }
}

export const updateTaskAC = (
  todolistId: string,
  taskId: string,
  model: UpdateDomainModelTaskType
): UpdateTaskActionType => {
  return {
    type: UserTaskActionTypes.UPDATE_TASK,
    payload: { todolistId, taskId, model },
  }
}

export const setTasksAC = (
  todolistId: string,
  tasks: TaskType[]
): SetTasksActionType => {
  return {
    type: UserTaskActionTypes.SET_TASKS,
    payload: { todolistId, tasks },
  }
}

// ThunkCreators
export const fetchTasksTC = (todolistId: string) => {
  return (dispatch: Dispatch<SetTasksActionType>) => {
    todolistsAPI
      .getTasks(todolistId)
      .then(({ status, data }) => {
        status === 200 && dispatch(setTasksAC(todolistId, data.items))
      })
      .catch((err: string) => {
        console.error(err)
      })
  }
}

export const createTaskTC = (todolistId: string, title: string) => {
  return (dispatch: Dispatch<CreateTaskActionType>) => {
    todolistsAPI
      .createTask(todolistId, title)
      .then(({ status, data }) => {
        status === 200 && dispatch(createTaskAC(data.data.item))
      })
      .catch((err: string) => {
        console.error(err)
      })
  }
}

export const deleteTaskTC = (todolistId: string, id: string) => {
  return (dispatch: Dispatch<DeleteTaskActionType>) => {
    todolistsAPI
      .deleteTask(todolistId, id)
      .then((res) => {
        res.status === 200 && dispatch(deleteTaskAC(todolistId, id))
      })
      .catch((err: string) => {
        console.error(err)
      })
  }
}

export const updateTaskTC = (
  todolistId: string,
  id: string,
  model: UpdateDomainModelTaskType
) => {
  return (
    dispatch: Dispatch<UpdateTaskActionType>,
    getState: () => RootStateType
  ) => {
    const state = getState()
    const task = state.tasks[todolistId].find((t) => t.id === id)
    if (!task) {
      console.error('Task not found!')
      return
    }
    const apiModel: UpdateTaskModelType = {
      description: task.description,
      title: task.title,
      status: task.status,
      priority: task.priority,
      startDate: task.startDate,
      deadline: task.deadline,
      ...model,
    }
    todolistsAPI
      .updateTask(todolistId, id, apiModel)
      .then((res) => {
        res.status === 200 && dispatch(updateTaskAC(todolistId, id, model))
      })
      .catch((err: string) => {
        console.error(err)
      })
  }
}

// export const changeTaskStatusTC = (
//   todolistId: string,
//   id: string,
//   status: TaskStatuses
// ) => {
//   return (
//     dispatch: Dispatch<ChangeTaskStatusActionType>,
//     getState: () => RootStateType
//   ) => {
//     const state = getState()
//     const task = state.tasks[todolistId].find((t) => t.id === id)
//     if (!task) {
//       console.error('Task not found!')
//       return
//     }
//     const model: UpdateTaskModelType = {
//       description: task.description,
//       title: task.title,
//       status: status,
//       priority: task.priority,
//       startDate: task.startDate,
//       deadline: task.deadline,
//     }
//     todolistsAPI
//       .updateTask(todolistId, id, model)
//       .then((res) => {
//         res.status === 200 &&
//           dispatch(changeTaskStatusAC(todolistId, id, status))
//       })
//       .catch((err: string) => {
//         console.error(err)
//       })
//   }
// }
