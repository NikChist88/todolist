import './Task.styles.scss'
import { TaskType } from '../../data/store'
import { FC, useState } from 'react'
import { Button } from '../button/Button'
import { Checkbox } from '../checkbox/Checkbox'
import { Input } from '../input/Input'

type TaskPropsType = {
  id: string
  todolistId: string
  task: string
  isDone: boolean
  tasks: TaskType[]
  changeTaskStatus: (
    taskId: string,
    todolistId: string,
    isDone: boolean
  ) => void
  deleteTask: (id: string, todolistId: string) => void
  editTask: (taskId: string, todolistId: string, newTask: string) => void
  maxTaskLength: (value: boolean) => void
}

export const Task: FC<TaskPropsType> = (props) => {
  const {
    id,
    todolistId,
    task,
    isDone,
    tasks,
    changeTaskStatus,
    deleteTask,
    editTask,
    maxTaskLength,
  } = props

  // Local State
  const [inputValue, setInputValue] = useState<string>(task)
  const [isFocused, setIsFocused] = useState<boolean>(false)

  const changeTaskHandler = () => {
    if (tasks.find((t) => t.title === inputValue)) {
      window.alert(`Task ${inputValue} already exists!`)
      setInputValue(task)
    } else {
      editTask(id, todolistId, inputValue)
      setIsFocused(false)
    }
  }

  const deleteTaskHandler = () => {
    if (window.confirm(`Do you want to delete a task ${task}?`)) {
      deleteTask(id, todolistId)
    }
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
            onKeyPress={changeTaskHandler}
            onBlur={setIsFocused}
            autoFocus={isFocused}
            maxTaskLength={maxTaskLength}
          />
        ) : (
          task
        )}
      </label>
      <div className="task__controls">
        <Button
          className="btn_edit"
          tooltip="Editing Task"
          disabled={isDone}
          onClickHandler={() => setIsFocused(true)}
        />
        <Button
          className="btn_danger"
          tooltip="Delete Task"
          onClickHandler={deleteTaskHandler}
        />
      </div>
    </li>
  )
}
