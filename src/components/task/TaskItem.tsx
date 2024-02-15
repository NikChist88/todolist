import './TaskItem.styles.scss'
import { FC, memo } from 'react'
import { Checkbox } from '../checkbox/Checkbox'
import { EditableTitle } from '../editableTitle/EditableTitle'
import { useTask } from './hooks/useTask'
import { TaskStatuses, TaskType } from '../../api/todolistsApi'
import { FilterType } from '../../store/reducers/todolistsReducer/todolistsReducer'
import { Button } from '../button/Button'

type TaskItemPropsType = {
  task: TaskType
  filter: FilterType
}

export const TaskItem: FC<TaskItemPropsType> = memo(({ task, filter }) => {
  const { todoListId, id, title } = task
  const { updateTaskTitle, deleteTask, changeTaskStatus } = useTask(
    todoListId,
    filter,
    id,
    title
  )

  return (
    <li className="task">
      <div
        className={`task__item ${
          task.status === TaskStatuses.Completed ? 'is-done' : ''
        }`}
      >
        <Checkbox
          checked={task.status === TaskStatuses.Completed}
          onChange={changeTaskStatus}
        />
        <EditableTitle
          title={title}
          onChange={updateTaskTitle}
          status={task.status === TaskStatuses.Completed}
        />
      </div>
      <div className="task__controls">
        <Button
          className="btn_danger"
          onClick={() => deleteTask(todoListId, id)}
        />
      </div>
    </li>
  )
})
