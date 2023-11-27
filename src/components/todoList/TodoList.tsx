import './TodoList.styles.scss'
import { Task } from '../task/Task'
import { Input } from '../input/Input'
import { Button } from '../button/Button'
import { TaskType, FilterType } from '../../data/store'
import { FC, useState } from 'react'

type TodolistPropsType = {
  id: string
  title: string
  tasks: TaskType[]
  filter: FilterType
  createTask: (task: string, todoListId: string) => void
  changeTaskFilter: (value: FilterType, todoListId: string) => void
  changeTaskStatus: (
    taskId: string,
    todolistId: string,
    isDone: boolean
  ) => void
  deleteTask: (id: string, todolistsId: string) => void
  deleteTodolist: (todolistId: string) => void
  editTask: (taskId: string, todolistsId: string, newTask: string) => void
}

export const Todolist: FC<TodolistPropsType> = (props) => {
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
    editTask,
  } = props

  // Local State
  const [inputValue, setInputValue] = useState<string>('')
  const [maxTaskLength, setMaxTaskLength] = useState<boolean>(false)

  // Add Task Handler
  const addTaskHandler = () => {
    if (tasks.find((t) => t.title === inputValue.toLowerCase())) {
      window.alert(`Task ${inputValue} already exists!`)
      setInputValue('')
    } else {
      createTask(inputValue, id)
      setInputValue('')
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
          onClickHandler={deleteTodolistHandler}
          tooltip={'Delete Todolist'}
        />
      </div>
      <div className="todolist__field">
        <Input
          value={inputValue}
          onChange={setInputValue}
          onKeyPress={addTaskHandler}
          maxTaskLength={setMaxTaskLength}
        />
        <Button
          className="btn_primary"
          tooltip="Add Task"
          onClickHandler={addTaskHandler}
          disabled={!inputValue || maxTaskLength}
        />
      </div>

      {maxTaskLength && (
        <span className="error">Max task length is 15 chars!</span>
      )}

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
              editTask={editTask}
              tasks={tasks}
              maxTaskLength={setMaxTaskLength}
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
          onClickHandler={onAllClickHandler}
        />
        <Button
          className={`btn_success ${filter === 'active' && 'active'}`}
          title={'Active'}
          onClickHandler={onActiveClickHandler}
        />
        <Button
          className={`btn_success ${filter === 'completed' && 'active'}`}
          title={'Completed'}
          onClickHandler={onCompletedClickHandler}
        />
      </div>
    </div>
  )
}
