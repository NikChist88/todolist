import './TodoList.styles.scss'
import { useState, MouseEvent } from 'react'
import { ToggleButtonGroup, ToggleButton } from '@mui/material'
import { Task } from '../task/Task'
import { TaskType, FilterType } from '../../store/store'
import { FC } from 'react'
import { FormControl } from '../formControl/FormControl'
import { IconButton } from '@mui/material'
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined'

type TodolistPropsType = {
  id: string
  title: string
  tasks: TaskType[]
  filter: FilterType
  createTask: (task: string, todoListId: string) => void
  changeTaskFilter: (value: FilterType, todoListId: string) => void
  changeTaskStatus: (taskId: string, todolistId: string) => void
  deleteTask: (id: string, todolistsId: string) => void
  deleteTodolist: (todolistId: string) => void
  updateTask: (taskId: string, todolistId: string, newTitle: string) => void
}

export const Todolist: FC<TodolistPropsType> = (props) => {
  // Props
  const {
    id,
    title,
    tasks,
    filter,
    createTask,
    changeTaskStatus,
    changeTaskFilter,
    deleteTask,
    deleteTodolist,
    updateTask,
  } = props

  const [alignment, setAlignment] = useState('all')

  const handleChange = (
    event: MouseEvent<HTMLElement>,
    newAlignment: string
  ) => {
    setAlignment(newAlignment)
  }

  // Add Task Handler
  const addTaskHandler = (title: string) => {
    if (tasks.find((t: TaskType) => t.title === title.toLowerCase())) {
      window.alert(`Task ${title.toUpperCase()} already exists!`)
    } else createTask(title, id)
  }

  // Delete Todolist Handler
  const deleteTodolistHandler = () => {
    if (window.confirm(`Delete Todolist ${title.toUpperCase()}?`)) {
      deleteTodolist(id)
    }
  }

  // Change task filter handlers
  const onAllClickHandler = () => {
    changeTaskFilter('all', id)
  }
  const onActiveClickHandler = () => {
    changeTaskFilter('active', id)
  }
  const onCompletedClickHandler = () => {
    changeTaskFilter('completed', id)
  }

  return (
    <div className="todolist">
      <div className="todolist__header">
        <h3 className="todolist__title">{title}</h3>
        <IconButton aria-label="delete" onClick={deleteTodolistHandler}>
          <HighlightOffOutlinedIcon color="error" sx={{ fontSize: 30 }} />
        </IconButton>
      </div>

      <FormControl label="New task" action={addTaskHandler} />

      {tasks.length ? (
        <ul className="todolist__list">
          {tasks.map((task) => (
            <Task
              key={task.id}
              id={task.id}
              todolistId={id}
              task={task.title}
              isDone={task.isDone}
              changeTaskStatus={changeTaskStatus}
              deleteTask={deleteTask}
              updateTask={updateTask}
            />
          ))}
        </ul>
      ) : (
        <span>
          {filter === 'all' ? 'You have no tasks' : `No ${filter} tasks`}
        </span>
      )}

      <div className="todolist__controls">
        <ToggleButtonGroup
          color="primary"
          size="small"
          value={alignment}
          exclusive
          onChange={handleChange}
          aria-label="Platform"
        >
          <ToggleButton value="all" onClick={onAllClickHandler}>
            All
          </ToggleButton>
          <ToggleButton value="active" onClick={onActiveClickHandler}>
            Active
          </ToggleButton>
          <ToggleButton value="completed" onClick={onCompletedClickHandler}>
            Completed
          </ToggleButton>
        </ToggleButtonGroup>
      </div>
    </div>
  )
}
