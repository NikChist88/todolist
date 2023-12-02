import './TodoList.styles.scss'
import { Task } from '../task/Task'
import { Button } from '../button/Button'
import { TaskType, FilterType } from '../../data/store'
import { FC } from 'react'
import { Form } from '../form/Form'

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
  checkExistingTask: (taskTitle: string, todolistId: string) => boolean
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
    checkExistingTask,
  } = props

  // Add Task Handler
  const addTaskHandler = (title: string) => {
    if (checkExistingTask(title, id)) {
    } else {
      createTask(title, id)
    }
  }

  // Delete Todolist Handler
  const deleteTodolistHandler = () => {
    if (window.confirm(`Delete Todolist ${title}?`)) {
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
        <Button
          className="btn_danger"
          onClick={deleteTodolistHandler}
          tooltip={'Delete Todolist'}
        />
      </div>
      
      <Form action={addTaskHandler} />

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
              checkExistingTask={checkExistingTask}
            />
          ))}
        </ul>
      ) : (
        <span>
          {filter === 'all' ? 'You have no tasks' : `No ${filter} tasks`}
        </span>
      )}

      <div className="todolist__controls">
        <Button
          className={`btn_success ${filter === 'all' && 'active'}`}
          title={'All'}
          onClick={onAllClickHandler}
        />
        <Button
          className={`btn_success ${filter === 'active' && 'active'}`}
          title={'Active'}
          onClick={onActiveClickHandler}
        />
        <Button
          className={`btn_success ${filter === 'completed' && 'active'}`}
          title={'Completed'}
          onClick={onCompletedClickHandler}
        />
      </div>
    </div>
  )
}
