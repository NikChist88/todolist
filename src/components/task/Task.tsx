import './Task.styles.scss'
import { FC } from 'react'
import { Button } from '../button/Button'
import { Checkbox } from '../checkbox/Checkbox'
import { EditableTask } from '../editableTask/EditableTask'

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

  // Change task status handler
  const changeTaskStatusHandler = () => {
    changeTaskStatus(id, todolistId)
  }

  // Delete task handler
  const deleteTaskHandler = () => {
    if (window.confirm(`Do you want to delete a task ${task.toUpperCase()}?`)) {
      deleteTask(id, todolistId)
    }
  }

  // Update task handler
  const updateTaskHandler = (title: string) => {
    if (checkExistingTask(title, todolistId)) {
      return
    } else updateTask(id, todolistId, title)
  }

  return (
    <li className="task">
      <div className={`task__item ${isDone && 'is-done'}`}>
        <Checkbox checked={isDone} onChange={changeTaskStatusHandler} />
        <EditableTask
          title={task}
          onChange={updateTaskHandler}
          isDone={isDone}
        />
      </div>
      <div className="task__controls">
        <Button
          className="btn_danger"
          tooltip="Delete Task"
          onClick={deleteTaskHandler}
        />
      </div>
    </li>
  )
}
