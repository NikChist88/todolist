import "./TaskItem.styles.scss"
import { FC, memo, ChangeEvent } from "react"
import { EditableTitle } from "../EditableTitle/EditableTitle"
import { useTask } from "./hooks/useTask"
import { TaskStatuses, TaskType } from "../../api/todolists-api"
import { FilterType } from "../../store/todolists/todolists-reducer"
import { Divider, IconButton, Checkbox } from "@mui/material"
import DeleteIcon from "@mui/icons-material/Delete"
import TaskIcon from "@mui/icons-material/Task"
import TaskOutlinedIcon from "@mui/icons-material/TaskOutlined"

type TaskItemPropsType = {
  task: TaskType
  filter: FilterType
}

export const TaskItem: FC<TaskItemPropsType> = memo(({ task, filter }) => {
  const { todoListId, id, title } = task
  const { updateTaskTitle, deleteTask, changeTaskStatus } = useTask(todoListId, filter, id, title)

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    changeTaskStatus(event.currentTarget.checked)
  }

  return (
    <>
      <li className='task'>
        <div className={`task__item ${task.status === TaskStatuses.Completed ? "is-done" : ""}`}>
          <Checkbox
            icon={<TaskOutlinedIcon color='primary' />}
            checkedIcon={<TaskIcon />}
            checked={task.status === TaskStatuses.Completed}
            onChange={handleChange}
          />
          <EditableTitle
            title={title}
            onChange={updateTaskTitle}
            status={task.status === TaskStatuses.Completed}
          />
        </div>
        <div className='task__controls'>
          <IconButton
            color='error'
            onClick={() => deleteTask(todoListId, id)}
          >
            <DeleteIcon />
          </IconButton>
        </div>
      </li>
      <Divider />
    </>
  )
})
