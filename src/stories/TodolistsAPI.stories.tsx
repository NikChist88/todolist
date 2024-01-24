import { useEffect, useState } from 'react'
import { todolistsAPI } from '../api/todolistsAPI'

export default {
  title: 'TodolistsAPI',
}

export const GetTodolists = () => {
  const [state, setState] = useState<any>(null)

  useEffect(() => {
    todolistsAPI.getTodolists().then((res) => {
      setState(res.data)
    })
  }, [])

  return <div>{JSON.stringify(state)}</div>
}

export const CreateTodolist = () => {
  const [state, setState] = useState<any>(null)

  useEffect(() => {
    todolistsAPI.createTodolist('Hello Friend').then((res) => {
      setState(res.data)
    })
  }, [])

  return <div>{JSON.stringify(state)}</div>
}

export const DeleteTodolist = () => {
  const [state, setState] = useState<any>(null)

  useEffect(() => {
    const todolistId = '4eddb569-104f-4a49-8b2a-a9857124c2db'

    todolistsAPI.deleteTodolist(todolistId).then((res) => {
      setState(res.data)
    })
  }, [])

  return <div>{JSON.stringify(state)}</div>
}

export const UpdateTodolistTitle = () => {
  const [state, setState] = useState<any>(null)

  useEffect(() => {
    const todolistId = '5e4a8bbf-3cb7-455c-a6ca-30d9d48986fb'

    todolistsAPI.updateTodolistTitle(todolistId, 'Title').then((res) => {
      setState(res.data)
    })
  }, [])

  return <div>{JSON.stringify(state)}</div>
}

export const GetTasks = () => {
  const [state, setState] = useState<any>(null)

  useEffect(() => {
    const todolistId = '5e4a8bbf-3cb7-455c-a6ca-30d9d48986fb'

    todolistsAPI.getTasks(todolistId).then((res) => {
      setState(res.data)
    })
  }, [])

  return <div>{JSON.stringify(state)}</div>
}

export const DeleteTask = () => {
  const [state, setState] = useState<any>(null)

  useEffect(() => {
    const todolistId = '5e4a8bbf-3cb7-455c-a6ca-30d9d48986fb'
    const taskId = '40ab601c-f58c-46f8-b93b-26065fcdd640'

    todolistsAPI.deleteTask(todolistId, taskId).then((res) => {
      setState(res.data)
    })
  }, [])

  return <div>{JSON.stringify(state)}</div>
}

export const CreateTask = () => {
  const [state, setState] = useState<any>(null)

  useEffect(() => {
    const todolistId = '5e4a8bbf-3cb7-455c-a6ca-30d9d48986fb'

    todolistsAPI.createTask(todolistId, 'Learn JS').then((res) => {
      setState(res.data)
    })
  }, [])

  return <div>{JSON.stringify(state)}</div>
}

export const UpdateTaskTitle = () => {
  const [state, setState] = useState<any>(null)

  useEffect(() => {
    const todolistId = '5e4a8bbf-3cb7-455c-a6ca-30d9d48986fb'
    const taskId = '74d224b8-23bc-4a7e-86e4-d3ca24c7bf87'

    todolistsAPI
      .updateTaskTitle(todolistId, taskId, 'Learn RestAPI')
      .then((res) => {
        setState(res.data)
      })
  }, [])

  return <div>{JSON.stringify(state)}</div>
}
