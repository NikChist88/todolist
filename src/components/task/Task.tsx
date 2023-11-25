import './Task.styles.scss'
import { FC, useState } from 'react'
import { Button } from '../button/Button'
import { Checkbox } from '../checkbox/Checkbox'
import { Input } from '../input/Input'

type TaskPropsType = {
  id: string
  todolistId: string
  task: string
  isDone: boolean
  changeTaskStatus: (
    taskId: string,
    todolistId: string,
    isDone: boolean
  ) => void
  deleteTask: (id: string, todolistId: string) => void
  editTask: (taskId: string, todolistId: string, newTask: string) => void
}

export const Task: FC<TaskPropsType> = (props) => {
  const {
    id,
    todolistId,
    task,
    isDone,
    changeTaskStatus,
    deleteTask,
    editTask,
  } = props

  const [inputValue, setInputValue] = useState<string>(task)
  const [isFocused, setIsFocused] = useState<boolean>(false)

  const changeTask = () => {
    editTask(id,todolistId, inputValue)
    setIsFocused(false)
  }

  return (
    <li className="task">
      <label className={`task__item ${isDone && 'is-done'}`}>
        <Checkbox
          id={id}
          todolistsId={todolistId}
          checked={isDone}
          changeTaskStatus={changeTaskStatus}
        />
        {isFocused ? (
          <Input
            value={inputValue}
            onChange={setInputValue}
            onKeyPress={changeTask}
            onBlur={setIsFocused}
            autoFocus={isFocused}
          />
        ) : (
          task
        )}
      </label>
      <div className="task__controls">
        <Button
          title={'Edit'}
          disabled={isDone}
          onClickHandler={() => setIsFocused(true)}
        />
        <Button
          className="btn_danger"
          title={'Del'}
          onClickHandler={() => deleteTask(id, todolistId)}
        />
      </div>
    </li>
  )
}
