import './TodoList.styles.scss'
import { Task } from '../task/Task'
import { Input } from '../input/Input'
import { Button } from '../button/Button'
import { TaskType } from '../../data/store'
import { FilterType } from '../../data/store'
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
    editTask,
  } = props

  // Local State
  const [inputValue, setInputValue] = useState<string>('')
  const maxTaskLength: boolean = inputValue.length === 16
  const msgError: string = 'Max task length is 15 chars!'

  // Add Task
  const addTask = () => {
    createTask(inputValue, id)
    setInputValue('')
  }

  // Buttons click handlers / change task filter
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
      <h3 className="todolist__title">{title}</h3>
      <div className="todolist__field">
        <Input
          value={inputValue}
          onChange={setInputValue}
          onKeyPress={addTask}
        />
        <Button
          title={'Add'}
          onClickHandler={addTask}
          disabled={!inputValue || maxTaskLength}
        />
      </div>

      {maxTaskLength && <p className="error">{msgError}</p>}

      {tasks.length === 0 ? (
        <span>
          {filter === 'all' ? 'You have no tasks' : `No ${filter} tasks`}
        </span>
      ) : (
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
            />
          ))}
        </ul>
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
