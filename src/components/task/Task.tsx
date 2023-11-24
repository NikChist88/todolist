import './Task.styles.scss'
import { FC, useState } from 'react'
import { Button } from '../button/Button'
import { Checkbox } from '../checkbox/Checkbox'
import { Input } from '../input/Input'

type TaskPropsType = {
  id: string
  task: string
  isDone: boolean
  changeTaskStatus: (taskId: string, isDone: boolean) => void
  deleteTask: (id: string) => void
  editTask: (taskId: string, newTask: string) => void
}

export const Task: FC<TaskPropsType> = (props) => {
  const { id, task, isDone, changeTaskStatus, deleteTask, editTask } = props

  const [inputValue, setInputValue] = useState<string>(task)
  const [isFocused, setFocused] = useState<boolean>(false)

  const changeTask = () => {
    editTask(id, inputValue)
    setFocused(false)
  }

  return (
    <li className="task">
      <label className={`task__item ${isDone && 'is-done'}`}>
        <Checkbox
          id={id}
          checked={isDone}
          changeTaskStatus={changeTaskStatus}
        />
        {isFocused ? (
          <Input
            value={inputValue}
            onChange={setInputValue}
            onKeyPress={changeTask}
            onBlur={setFocused}
          />
        ) : (
          task
        )}
      </label>
      <div className="task__controls">
        <Button
          className="btn-primary"
          title={'Edit'}
          onClickHandler={() => setFocused(true)}
        />
        <Button
          className="btn-danger"
          title={'X'}
          onClickHandler={() => deleteTask(id)}
        />
      </div>
    </li>
  )
}
