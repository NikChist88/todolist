import './Task.styles.scss'
import { FC, memo } from 'react'
import { Button } from '../button/Button'
import { Checkbox } from '../checkbox/Checkbox'
import { EditableTask } from '../editableTask/EditableTask'
import { useTask } from './hooks/useTask'

type TaskPropsType = {
  id: string
  todolistId: string
  task: string
  isDone: boolean
}

export const Task: FC<TaskPropsType> = memo(
  ({ id, todolistId, task, isDone }) => {
    
    const { updateTaskHandler, deleteTaskHandler, changeTaskStatusHandler } =
      useTask(id, todolistId, task, isDone)

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
)
