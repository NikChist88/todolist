import './App.css'
import { useState } from 'react'
import { Todolist } from './components/todoList/TodoList'
import { TaskType } from './data/initTasks'
import { v1 } from 'uuid'

type AppPropsType = {
  initTasks: TaskType[]
}

export const App: React.FC<AppPropsType> = ({ initTasks }) => {
  // Local State
  const [tasks, setTasks] = useState<TaskType[]>(initTasks)

  // Create Task
  const createTask = (task: string) => {
    setTasks([...tasks, { id: v1(), task: task, isDone: false }])
  }

  // Edit Task
  const editTask = (taskId: string, newTask: string) => {
    const updatedTask = { id: taskId, task: newTask, isDone: false }
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    )
  }

  // Change Task Status
  const changeTaskStatus = (taskId: string, isDone: boolean) => {
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
        title={'What to learn'}
        tasks={tasks}
        createTask={createTask}
        changeTaskStatus={changeTaskStatus}
        deleteTask={deleteTask}
        editTask={editTask}
      />
    </div>
  )
}
