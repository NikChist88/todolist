import './TodoList.styles.scss'
import { Task } from '../task/Task'
import { Input } from '../input/Input'
import { Button } from '../button/Button'
import { TaskType } from '../../data/initTasks'
import { FC, useState } from 'react'

type TodolistPropsType = {
  title: string
  tasks: TaskType[]
  createTask: (task: string) => void
  changeTaskStatus: (taskId: string, isDone: boolean) => void
  deleteTask: (id: string) => void
  editTask: (taskId: string, newTask: string) => void
}

export type FilterType = 'all' | 'active' | 'completed'

export const Todolist: FC<TodolistPropsType> = (props) => {
  const { title, tasks, createTask, changeTaskStatus, deleteTask, editTask } =
    props

  // Local State
  const [inputValue, setInputValue] = useState<string>('')
  const [filter, setFilter] = useState<FilterType>('all')
  const maxTaskLength: boolean = inputValue.length === 16
  const msgError: string = 'Max task length is 15 chars!'

  // Change Tasks Filter
  const changeFilter = (value: FilterType) => {
    setFilter(value)
  }

  // Filtered Tasks
  const filteredTasks = tasks
  if (filter === 'active') filteredTasks.filter((t) => t.isDone === false)
  if (filter === 'completed') filteredTasks.filter((t) => t.isDone === true)

  // Add Task
  const addTask = () => {
    createTask(inputValue)
    setInputValue('')
  }

  return (
    <div className="todolist">
      <h3 className="todolist__title">{title}</h3>
      <div className="todolist__field">
        <Input
          value={inputValue}
          onChange={setInputValue}
          onKeyPress={addTask}
          onBlur={() => {}}
        />
        <Button
          className="btn-primary"
          title={'+'}
          onClickHandler={addTask}
          disabled={!inputValue || maxTaskLength}
        />
      </div>

      {maxTaskLength && <p className="error">{msgError}</p>}

      {filteredTasks.length === 0 ? (
        <span>No {filter} tasks.</span>
      ) : (
        <ul className="todolist__list">
          {filteredTasks.map((task) => (
            <Task
              key={task.id}
              id={task.id}
              task={task.task}
              isDone={task.isDone}
              changeTaskStatus={changeTaskStatus}
              deleteTask={deleteTask}
              editTask={editTask}
            />
          ))}
        </ul>
      )}

      <div className="todolist__controls">
        <Button
          className={`btn-success ${filter === 'all' && 'active'}`}
          title={'All'}
          onClickHandler={() => changeFilter('all')}
        />
        <Button
          className={`btn-success ${filter === 'active' && 'active'}`}
          title={'Active'}
          onClickHandler={() => changeFilter('active')}
        />
        <Button
          className={`btn-success ${filter === 'completed' && 'active'}`}
          title={'Completed'}
          onClickHandler={() => changeFilter('completed')}
        />
      </div>
    </div>
  )
}
