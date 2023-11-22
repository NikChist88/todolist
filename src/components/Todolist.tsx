import { Task } from './Task'
import { Input } from './Input'
import { Button } from './Button'
import { TaskType } from '../data/initTasks'
import { FC, useState } from 'react'

type TodolistPropsType = {
  title: string
  tasks: TaskType[]
  createTask: (task: string) => void
  updateTaskStatus: (taskId: string, isDone: boolean) => void
  deleteTask: (id: string) => void
}

export type FilterType = 'all' | 'active' | 'completed'

export const Todolist: FC<TodolistPropsType> = (props) => {
  // Props
  const { title, tasks, createTask, updateTaskStatus, deleteTask } = props

  // Local State
  const [inputValue, setInputValue] = useState<string>('')
  const [filter, setFilter] = useState<FilterType>('all')
  const maxTaksLength = inputValue.length === 15
  const msgError = 'Max task length is 15 chars!'

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

  // Add Task
  const addTask = () => {
    createTask(inputValue)
    setInputValue('')
  }

  return (
    <div className="todo">
      <h3 className="todo-title">{title}</h3>
      <div className="todo-field">
        <Input
          className="todo-input-task"
          value={inputValue}
          onChange={setInputValue}
          addTask={addTask}
        />
        <Button
          className="btn-primary"
          title={'+'}
          callBack={addTask}
          disabled={!inputValue || maxTaksLength}
        />
      </div>

      {maxTaksLength && <p className="error">{msgError}</p>}

      {filteredTasks.length === 0 ? (
        <span>Your {filter} tasks list is empty.</span>
      ) : (
        <ul className="todo-list">
          {filteredTasks.map((task) => (
            <Task
              key={task.id}
              id={task.id}
              task={task.task}
              isDone={task.isDone}
              updateTaskStatus={updateTaskStatus}
              deleteTask={deleteTask}
            />
          ))}
        </ul>
      )}

      <div className="todo-buttons">
        <Button
          className={filter === 'all' ? 'btn-success active' : 'btn-success'}
          title={'All'}
          callBack={() => changeFilter('all')}
        />
        <Button
          className={filter === 'active' ? 'btn-success active' : 'btn-success'}
          title={'Active'}
          callBack={() => changeFilter('active')}
        />
        <Button
          className={
            filter === 'completed' ? 'btn-success active' : 'btn-success'
          }
          title={'Completed'}
          callBack={() => changeFilter('completed')}
        />
      </div>
    </div>
  )
}
