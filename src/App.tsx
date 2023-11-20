import './App.css'
import { ChangeEvent, useState } from 'react'
import { Todolist } from './components/Todolist'
import { TaskType } from './types/types'
import { FilterType } from './types/types'
import { v1 } from 'uuid'

type AppPropsType = {
  initTasks: TaskType[]
}

export const App: React.FC<AppPropsType> = ({ initTasks }) => {
  // Local State
  const [tasks, setTasks] = useState<TaskType[]>(initTasks)
  const [filter, setFilter] = useState<FilterType>('all')

  // Create Task
  const createTask = (value: string) => {
    const newTask = {
      id: v1(),
      task: value,
      isDone: false,
    }
    setTasks([newTask, ...tasks])
  }

  // Update Task Status
  const updateTaskStatus = (taskId: string, isDone: boolean) => {
    const task = tasks.find((task) => task.id === taskId)
    if (task) task.isDone = isDone
    setTasks([...tasks])
  }

  // Delete Task
  const deleteTask = (id: string) => {
    if (window.confirm('Do you want to delete a task?')) {
      const updateTasks = tasks.filter((task) => task.id !== id)
      setTasks(updateTasks)
    }
  }

  // Change Tasks Filter
  const changeFilter = (value: FilterType) => {
    setFilter(value)
  }

  // Filtered Tasks
  const filteredTasks =
    filter === 'active'
      ? tasks.filter((task) => task.isDone === false)
      : filter === 'completed'
      ? tasks.filter((task) => task.isDone === true)
      : tasks

  return (
    <div className="app">
      <Todolist
        title={'Todo App'}
        tasks={filteredTasks}
        createTask={createTask}
        updateTaskStatus={updateTaskStatus}
        deleteTask={deleteTask}
        changeFilter={changeFilter}
        filter={filter}
      />
    </div>
  )
}
