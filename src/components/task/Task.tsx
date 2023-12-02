import './Task.styles.scss'
import { ChangeEvent, FC, useState } from 'react'
import { Button } from '../button/Button'
import { Checkbox } from '../checkbox/Checkbox'
import { Input } from '../input/Input'

type TaskPropsType = {
  id: string
  todolistId: string
  task: string
  isDone: boolean
  changeTaskStatus: (taskId: string, todolistId: string) => void
  deleteTask: (id: string, todolistId: string) => void
  updateTask: (taskId: string, todolistId: string, newTitle: string) => void
  checkExistingTask: (taskTitle: string, todolistId: string) => boolean
}

export const Task: FC<TaskPropsType> = (props) => {
  // Props
  const {
    id,
    todolistId,
    task,
    isDone,
    changeTaskStatus,
    deleteTask,
    updateTask,
    checkExistingTask,
  } = props

  // Local State
  const [inputValue, setInputValue] = useState<string>('')
  const [isInputVisible, setInputVisible] = useState<boolean>(false)

  // Change task status handler
  const changeTaskStatusHandler = () => {
    changeTaskStatus(id, todolistId)
  }

  // Delete task handler
  const deleteTaskHandler = () => {
    if (window.confirm(`Do you want to delete a task ${task}?`)) {
      deleteTask(id, todolistId)
    }
  }

  // Update task handler
  const updateTaskHandler = () => {
    if (checkExistingTask(inputValue, todolistId)) {
      setInputValue('')
    } else {
      updateTask(id, todolistId, inputValue)
      setInputVisible(false)
    }
  }

  // Enter key press handler
  const onEnterKeyPressHandler = (key: string) => {
    if (inputValue.length < 21 && inputValue && key === 'Enter') {
      updateTaskHandler()
    }
  }

  return (
    <li className="task">
      <label className={`task__item ${isDone && 'is-done'}`}>
        <Checkbox checked={isDone} onChange={changeTaskStatusHandler} />
        {isInputVisible ? (
          <Input
            value={inputValue}
            onChange={setInputValue}
            onKeyPress={onEnterKeyPressHandler}
            onBlur={() => setInputVisible(false)}
            autoFocus={isInputVisible}
          />
        ) : (
          task
        )}
      </label>
      <div className="task__controls">
        {isInputVisible ? (
          <Button
            className="btn_primary"
            tooltip="Update Task"
            onClick={updateTaskHandler}
            onMouseDown={updateTaskHandler}
            disabled={!inputValue || inputValue.length > 20}
          />
        ) : (
          <Button
            className="btn_edit"
            tooltip="Edit Task"
            disabled={isDone}
            onClick={() => setInputVisible(true)}
          />
        )}
        <Button
          className="btn_danger"
          tooltip="Delete Task"
          onClick={deleteTaskHandler}
        />
      </div>
    </li>
  )
}
