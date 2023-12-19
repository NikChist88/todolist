import './App.scss'
import { FC, useState } from 'react'
import { Todolist } from './components/todoList/TodoList'
import { TaskType, TasksType, TodolistType, FilterType } from './store/store'
import { v1 } from 'uuid'
import { FormControl } from './components/formControl/FormControl'

type AppPropsType = {
  initTodolists: TodolistType[]
  initTasks: TasksType
}

export const App: FC<AppPropsType> = (props) => {
  // Props
  const { initTodolists, initTasks } = props

  // Global State
  const [todolists, setTodolists] = useState<TodolistType[]>(initTodolists)
  const [tasks, setTasks] = useState<TasksType>(initTasks)

  // Create Task
  const createTask = (title: string, todoListId: string) => {
    const newTask: TaskType = {
      id: v1(),
      title: title.toLowerCase(),
      isDone: false,
    }
    const updatedTasks: TaskType[] = [newTask, ...tasks[todoListId]]
    setTasks({ ...tasks, [todoListId]: updatedTasks })
  }

  // Create Todolist
  const createTodolist = (title: string) => {
    const newTodolist: TodolistType = {
      id: v1(),
      title: title.toLowerCase(),
      filter: 'all',
    }
    setTodolists([newTodolist, ...todolists])
    setTasks({ ...tasks, [newTodolist.id]: [] })
  }

  // Update Task
  const updateTask = (taskId: string, todolistId: string, newTitle: string) => {
    const updatedTask: TaskType[] = tasks[todolistId].map((t: TaskType) =>
      t.id === taskId ? { ...t, title: newTitle } : t
    )
    setTasks({ ...tasks, [todolistId]: updatedTask })
  }

  // Change Tasks Filter
  const changeTaskFilter = (value: FilterType, todoListId: string) => {
    const updatedTaskFilter: TodolistType[] = todolists.map(
      (tl: TodolistType) =>
        tl.id === todoListId ? { ...tl, filter: value } : tl
    )
    setTodolists(updatedTaskFilter)
  }

  // Change Task Status
  const changeTaskStatus = (taskId: string, todolistId: string) => {
    const updatedTaskStatus: TaskType[] = tasks[todolistId].map((t: TaskType) =>
      t.id === taskId ? { ...t, isDone: !t.isDone } : t
    )
    setTasks({ ...tasks, [todolistId]: updatedTaskStatus })
  }

  // Delete Task
  const deleteTask = (id: string, todolistId: string) => {
    const updatedTask: TaskType[] = tasks[todolistId].filter(
      (t: TaskType) => t.id !== id
    )
    setTasks({ ...tasks, [todolistId]: updatedTask })
  }

  // Delete Todolist
  const deleteTodolist = (todolistId: string) => {
    const filteredTodolist: TodolistType[] = todolists.filter(
      (tl) => tl.id !== todolistId
    )
    setTodolists(filteredTodolist)
    delete tasks[todolistId]
    setTasks(tasks)
  }

  return (
    <div className="app">
      <FormControl label="New todolist" action={createTodolist} />
      <div className="wrapper">
        {todolists.map((tl) => {
          // Filtered Tasks
          let filteredTasks = tasks[tl.id]
          if (tl.filter === 'active')
            filteredTasks = filteredTasks.filter((t) => t.isDone === false)
          if (tl.filter === 'completed')
            filteredTasks = filteredTasks.filter((t) => t.isDone === true)

          return (
            <Todolist
              key={tl.id}
              id={tl.id}
              title={tl.title}
              filter={tl.filter}
              tasks={filteredTasks}
              changeTaskFilter={changeTaskFilter}
              createTask={createTask}
              changeTaskStatus={changeTaskStatus}
              deleteTask={deleteTask}
              deleteTodolist={deleteTodolist}
              updateTask={updateTask}
            />
          )
        })}
      </div>
    </div>
  )
}
