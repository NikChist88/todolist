import './App.css'
import { useState } from 'react'
import { Todolist } from './components/Todolist'
import { TaskType } from './data/initTasks'
import { v1 } from 'uuid'

type AppPropsType = {
  initTasks: TaskType[]
}

export const App: React.FC<AppPropsType> = ({ initTasks }) => {
  // Local State
  const todoListTitle: string = 'What to learn'
  const [tasks, setTasks] = useState<TaskType[]>(initTasks)

  // Create Task
  const createTask = (task: string) => {
    setTasks([...tasks, { id: v1(), task: task, isDone: false }])
  }

  // Update Task Status
  const updateTaskStatus = (taskId: string, isDone: boolean) => {
    const task = tasks.find((task) => task.id === taskId)
    if (task) task.isDone = isDone
    setTasks([...tasks])
  }

  // Delete Task
  const deleteTask = (id: string) => {
    if (window.confirm('Do you want to delete a task?'))
      setTasks(tasks.filter((task) => task.id !== id))
  }

  return (
    <div className="app">
      <Todolist
        title={todoListTitle}
        tasks={tasks}
        createTask={createTask}
        updateTaskStatus={updateTaskStatus}
        deleteTask={deleteTask}
      />
    </div>
  )
}
