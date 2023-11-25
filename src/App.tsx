import './App.css'
import { FC, useState } from 'react'
import { Todolist } from './components/todoList/TodoList'
import { TasksType } from './data/store'
import { TodolistType } from './data/store'
import { FilterType } from './data/store'
import { v1 } from 'uuid'

type AppPropsType = {
  initTodolists: TodolistType[]
  initTasks: TasksType
}

export const App: FC<AppPropsType> = ({ initTodolists, initTasks }) => {
  // Local State
  const [todolists, setTodolists] = useState<TodolistType[]>(initTodolists)
  const [tasks, setTasks] = useState<TasksType>(initTasks)

  console.log(todolists)
  console.log(tasks)

  // Create Task
  const createTask = (title: string, todoListId: string) => {
    const newTask = { id: v1(), title: title.toLowerCase(), isDone: false }
    if (tasks[todoListId].find((t) => t.title === newTask.title)) {
      window.alert('Such a task already exists!')
    } else {
      tasks[todoListId] = [...tasks[todoListId], newTask]
      setTasks({ ...tasks })
    }
  }

  // Edit Task
  const editTask = (taskId: string, todolistId: string, newTitle: string) => {
    const task = tasks[todolistId].find((t) => t.id === taskId)
    const existinTitle = tasks[todolistId].find(
      (t) => t.title === newTitle.toLowerCase()
    )
    if (task && !existinTitle?.title) {
      task.title = newTitle
      setTasks({ ...tasks })
    } else {
      window.alert('Such a task already exists!')
    }
  }

  // Change Tasks Filter
  const changeTaskFilter = (value: FilterType, todoListId: string) => {
    const todolist = todolists.find((tl) => tl.id === todoListId)
    if (todolist) {
      todolist.filter = value
      setTodolists([...todolists])
    }
  }

  // Change Task Status
  const changeTaskStatus = (
    taskId: string,
    todolistId: string,
    isDone: boolean
  ) => {
    const newTaksStatus = tasks[todolistId].find((task) => task.id === taskId)
    if (newTaksStatus) newTaksStatus.isDone = isDone
    setTasks({ ...tasks })
  }

  // Delete Task
  const deleteTask = (id: string, todolistId: string) => {
    if (window.confirm('Do you want to delete a task?')) {
      const updatedTasks = tasks[todolistId].filter((t) => t.id !== id)
      tasks[todolistId] = updatedTasks
      setTasks({ ...tasks })
    }
  }

  // Delete Todolist
  const deleteTodolist = (todolistId: string) => {
    if (window.confirm('Delete Todolist?')) {
      const filteredTodolist = todolists.filter((tl) => tl.id !== todolistId)
      setTodolists([...filteredTodolist])
      delete tasks[todolistId]
      setTasks({ ...tasks })
    }
  }

  return (
    <div className="app">
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
            editTask={editTask}
          />
        )
      })}
    </div>
  )
}
