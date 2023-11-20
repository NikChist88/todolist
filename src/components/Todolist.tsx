import { Task } from './Task'
import { Input } from './Input'
import { Button } from './Button'
import { TaskType } from '../types/types'
import { FilterType } from '../types/types'
import { FC, useState } from 'react'

type TodolistPropsType = {
  title: string
  tasks: TaskType[]
  filter: FilterType
  createTask: (task: string) => void
  updateTaskStatus: (taskId: string, isDone: boolean) => void
  deleteTask: (id: string) => void
  changeFilter: (value: FilterType) => void
}

export const Todolist: FC<TodolistPropsType> = (props) => {
  const [inputValue, setInputValue] = useState<string>('')

  // Add Task
  const addTask = () => {
    if (inputValue !== '') {
      props.createTask(inputValue)
      setInputValue('')
    } else {
      window.alert('The field must not be empty!')
    }
  }

  return (
    <div className="todo">
      <h3 className="todo-title">{props.title}</h3>
      <div className="todo-field">
        <Input
          className="todo-input-task"
          value={inputValue}
          setInputValue={setInputValue}
          addTask={addTask}
        />
        <Button className="btn-primary" title={'Add'} callBack={addTask} />
      </div>
      <ul className="todo-list">
        {props.tasks.map((task) => (
          <Task
            key={task.id}
            id={task.id}
            task={task.task}
            isDone={task.isDone}
            updateTaskStatus={props.updateTaskStatus}
            deleteTask={props.deleteTask}
          />
        ))}
      </ul>
      <div className="todo-buttons">
        <Button
          className={props.filter === 'all' ? 'btn-active' : 'btn-success'}
          title={'All'}
          callBack={() => {
            props.changeFilter('all')
          }}
        />
        <Button
          className={props.filter === 'active' ? 'btn-active' : 'btn-success'}
          title={'Active'}
          callBack={() => {
            props.changeFilter('active')
          }}
        />
        <Button
          className={
            props.filter === 'completed' ? 'btn-active' : 'btn-success'
          }
          title={'Completed'}
          callBack={() => {
            props.changeFilter('completed')
          }}
        />
      </div>
    </div>
  )
}
