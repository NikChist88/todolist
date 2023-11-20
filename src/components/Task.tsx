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
  const { id, task, isDone, updateTaskStatus, deleteTask } = props

  return (
    <li key={id} className="todo-list-item">
      <Checkbox
        id={id}
        checked={isDone}
        updateTaskStatus={updateTaskStatus}
      />
      <span className={`todo-list-task ${isDone && 'is-done'}`}>{task}</span>
      <Button
        className="btn-danger"
        title={'Delete'}
        callBack={() => {
          deleteTask(id)
        }}
      />
    </li>
  )
}
