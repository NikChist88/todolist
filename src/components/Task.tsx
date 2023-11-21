import { FC } from 'react'
import { Button } from './Button'
import { Checkbox } from './Checkbox'

type TaskPropsType = {
  id: string
  task: string
  isDone: boolean
  updateTaskStatus: (taskId: string, isDone: boolean) => void
  deleteTask: (id: string) => void
}

export const Task: FC<TaskPropsType> = (props) => {
  // Props
  const { id, task, isDone, updateTaskStatus, deleteTask } = props

  return (
    <li className="todo-list-item">
      <Checkbox id={id} checked={isDone} updateTaskStatus={updateTaskStatus} />
      <label htmlFor={id} className={`todo-list-task ${isDone && 'is-done'}`}>
        {task}
      </label>
      <Button
        className="btn-danger"
        title={'x'}
        callBack={() => {
          deleteTask(id)
        }}
      />
    </li>
  )
}
