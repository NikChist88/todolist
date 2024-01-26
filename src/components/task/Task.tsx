import './Task.styles.scss'
import { FC, memo } from 'react'
import { Button } from '../button/Button'
import { Checkbox } from '../checkbox/Checkbox'
import { EditableTask } from '../editableTask/EditableTask'
import { useTask } from './hooks/useTask'
import { TaskStatuses } from '../../api/todolistsAPI'

type TaskPropsType = {
  id: string
  todolistId: string
  task: string
  status: TaskStatuses
}

export const Task: FC<TaskPropsType> = memo(
  ({ id, todolistId, task, status }) => {
    const { updateTaskHandler, deleteTaskHandler, changeTaskStatusHandler } =
      useTask(id, todolistId, task)

      console.log(status);
      

    return (
      <li className="task">
        <div
          className={`task__item ${
            status === TaskStatuses.Completed ? 'is-done' : ''
          }`}
        >
          <Checkbox
            checked={status === TaskStatuses.Completed}
            onChange={changeTaskStatusHandler}
          />
          <EditableTask
            title={task}
            onChange={updateTaskHandler}
            status={status === TaskStatuses.Completed}
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
