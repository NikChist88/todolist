import { useEffect, useState } from 'react'
import { todolistsAPI } from '../api/todolistsApi'
import { TaskPriorities, TaskStatuses, UpdateTaskModelType } from '../api/types'

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
  const [title, setTitle] = useState('')

  const createTodolist = () => {
    todolistsAPI.createTodolist(title).then((res) => {
      setState(res.data)
    })
    setTitle('')
  }

  return (
    <>
      <h2>Create todolist</h2>
      <input
        value={title}
        placeholder="Enter a title..."
        onChange={(e) => setTitle(e.currentTarget.value)}
      />
      <button onClick={createTodolist}>Create</button>
      <div>{JSON.stringify(state)}</div>
    </>
  )
}

export const DeleteTodolist = () => {
  const [state, setState] = useState<any>(null)
  const [todolistId, setTodolistId] = useState('')

  const deleteTodolist = () => {
    todolistsAPI.deleteTodolist(todolistId).then((res) => {
      setState(res.data)
    })
    setTodolistId('')
  }

  return (
    <>
      <h2>Delete Todolist</h2>
      <input
        placeholder="todolistId"
        value={todolistId}
        onChange={(e) => setTodolistId(e.currentTarget.value)}
      />
      <button onClick={deleteTodolist}>Delete</button>
      <div>{JSON.stringify(state)}</div>
    </>
  )
}

export const UpdateTodolistTitle = () => {
  const [state, setState] = useState<any>(null)
  const [todolistId, setTodolistId] = useState('')
  const [title, setTitle] = useState('')

  const updateTodolistTitle = () => {
    todolistsAPI.updateTodolist(todolistId, title).then((res) => {
      setState(res.data)
    })
  }

  return (
    <>
      <h2>Update Todolist Title</h2>
      <input
        value={todolistId}
        onChange={(e) => {
          setTodolistId(e.currentTarget.value)
        }}
        placeholder="TodolistId"
      />
      <input
        value={title}
        onChange={(e) => {
          setTitle(e.currentTarget.value)
        }}
        placeholder="New Todolist Title"
      />
      <button onClick={updateTodolistTitle}>Update</button>
      <div>Response {JSON.stringify(state)}</div>
    </>
  )
}

export const GetTasks = () => {
  const [state, setState] = useState<any>(null)
  const [todolistId, setTodolistId] = useState('')

  const getTasks = () => {
    todolistsAPI.getTasks(todolistId).then((res) => {
      setState(res.data)
    })
  }

  return (
    <>
      <input
        placeholder="TodolistId"
        value={todolistId}
        onChange={(e) => {
          setTodolistId(e.currentTarget.value)
        }}
      />
      <button onClick={getTasks}>Get Tasks</button>
      <div>{JSON.stringify(state)}</div>
    </>
  )
}

export const DeleteTask = () => {
  const [state, setState] = useState<any>(null)
  const [todolistId, setTodolistId] = useState('')
  const [taskId, setTaskId] = useState('')

  const deleteTask = () => {
    todolistsAPI.deleteTask(todolistId, taskId).then((res) => {
      setState(res.data)
    })
  }

  return (
    <>
      <div>{JSON.stringify(state)}</div>
      <h2>Delete Task</h2>
      <input
        value={todolistId}
        onChange={(e) => {
          setTodolistId(e.currentTarget.value)
        }}
        placeholder="todolistId"
      />
      <input
        value={taskId}
        onChange={(e) => {
          setTaskId(e.currentTarget.value)
        }}
        placeholder="taskId"
      />
      <button onClick={deleteTask}>Delete Task</button>
    </>
  )
}

export const CreateTask = () => {
  const [state, setState] = useState<any>(null)
  const [todolistId, setTodolistId] = useState('')
  const [title, setTitle] = useState('')

  const createTask = () => {
    todolistsAPI.createTask(todolistId, title).then((res) => {
      setState(res.data)
    })
  }

  return (
    <>
      <div>{JSON.stringify(state)}</div>
      <h2>Create Task</h2>
      <input
        value={todolistId}
        onChange={(e) => {
          setTodolistId(e.currentTarget.value)
        }}
        placeholder="TodlistId"
      />
      <input
        value={title}
        onChange={(e) => {
          setTitle(e.currentTarget.value)
        }}
        placeholder="Task Title"
      />
      <button onClick={createTask}>Create Task</button>
    </>
  )
}

export const UpdateTaskTitle = () => {
  const [state, setState] = useState<any>(null)
  const [todolistId, setTodolistId] = useState('')
  const [taskId, setTaskId] = useState('')
  const [title, setTitle] = useState('')

  const updateTaskTitle = () => {
    const model: UpdateTaskModelType = {
      description: '',
      title: title,
      status: TaskStatuses.New,
      priority: TaskPriorities.Low,
      startDate: '',
      deadline: '',
    }
    todolistsAPI.updateTask(todolistId, taskId, model).then((res) => {
      setState(res.data)
    })
  }

  return (
    <>
      <h2>Update Task Title</h2>
      <input
        value={todolistId}
        onChange={(e) => {
          setTodolistId(e.currentTarget.value)
        }}
        placeholder="TodolistId"
      />
      <input
        value={taskId}
        onChange={(e) => {
          setTaskId(e.currentTarget.value)
        }}
        placeholder="TaskId"
      />
      <input
        value={title}
        onChange={(e) => {
          setTitle(e.currentTarget.value)
        }}
        placeholder="New Task Title"
      />
      <button onClick={updateTaskTitle}>Update</button>
      <div>Response {JSON.stringify(state)}</div>
    </>
  )
}
