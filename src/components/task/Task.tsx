import './Task.styles.scss'
import { FC, memo } from 'react'
import { Button } from '../button/Button'
import { Checkbox } from '../checkbox/Checkbox'
import { EditableTask } from '../editableTask/EditableTask'
import { useTask } from './hooks/useTask'
import { TaskStatuses } from '../../api/types'
import { FilterType } from '../../store/reducers/todolistsReducer/todolistsReducer'

type TaskPropsType = {
  id: string
  todolistId: string
  task: string
  status: TaskStatuses
  filter: FilterType
}

export const Task: FC<TaskPropsType> = memo(
  ({ id, todolistId, task, status, filter }) => {

    const { updateTaskTitle, deleteTask, changeTaskStatus } = useTask(
      todolistId,
      filter,
      id,
      task
    )

    return (
      <li className="task">
        <div
          className={`task__item ${
            status === TaskStatuses.Completed ? 'is-done' : ''
          }`}
        >
          <Checkbox
            checked={status === TaskStatuses.Completed}
            onChange={changeTaskStatus}
          />
          <EditableTask
            title={task}
            onChange={updateTaskTitle}
            status={status === TaskStatuses.Completed}
          />
        </div>
        <div className="task__controls">
          <Button
            className="btn_danger"
            title="Delete Task"
            onClick={deleteTask}
          />
        </div>
      </li>
    )
  }
)
