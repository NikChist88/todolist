import './TodoList.styles.scss'
import { FC, memo, useCallback } from 'react'
import { Task } from '../task/Task'
import { TaskType } from '../../store/types/tasks'
import { FilterType } from '../../store/types/todolists'
import { AppRootStateType } from '../../store/store'
import { FormControlMemo } from '../formControl/FormControl'
import { createTaskAC } from '../../store/actionCreators/tasksActionCreators'
import { useDispatch, useSelector } from 'react-redux'
import { Button } from '../button/Button'
import { changeTodolistFilterAC } from '../../store/actionCreators/todolistsActionCreator'

type TodolistPropsType = {
  id: string
  title: string
  filter: FilterType
  deleteTodolist: (todolistId: string) => void
}

export const Todolist: FC<TodolistPropsType> = ({
  id,
  title,
  filter,
  deleteTodolist,
}) => {
  console.log('Todolist render')

  const tasks = useSelector<AppRootStateType, TaskType[]>(
    (state) => state.tasks[id]
  )
  const dispatch = useDispatch()

  // Add Task
  const addTask = useCallback(
    (title: string) => {
      if (
        tasks &&
        tasks.find((t: TaskType) => t.title === title.toLowerCase())
      ) {
        window.alert(`Task ${title.toUpperCase()} already exists!`)
      } else dispatch(createTaskAC(title, id))
    },
    [id]
  )

  // Delete Todolist Handler
  const deleteTodolistHandler = useCallback(() => {
    if (window.confirm(`Delete Todolist ${title.toUpperCase()}?`)) {
      deleteTodolist(id)
    }
  }, [id, deleteTodolist])

  // Change Todolist Filter
  const changeFilter = useCallback(
    (filter: FilterType, id: string) => {
      dispatch(changeTodolistFilterAC(filter, id))
    },
    [filter, id]
  )

  // Filtered Tasks
  let filteredTasks = tasks
  if (filter === 'active')
    filteredTasks = filteredTasks.filter((t: TaskType) => t.isDone === false)
  if (filter === 'completed')
    filteredTasks = filteredTasks.filter((t: TaskType) => t.isDone === true)

  return (
    <div className="todolist">
      <div className="todolist__header">
        <h3 className="todolist__title">{title}</h3>
        <Button
          className={'btn_danger'}
          tooltip="Delete Todolist"
          onClick={deleteTodolistHandler}
        />
      </div>

      <FormControlMemo label="New task" action={addTask} />

      <ul className="todolist__list">
        {filteredTasks && filteredTasks.length ? (
          filteredTasks.map((task: TaskType) => (
            <Task
              key={task.id}
              id={task.id}
              todolistId={id}
              task={task.title}
              isDone={task.isDone}
            />
          ))
        ) : (
          <span>
            {filter === 'all' ? 'You have no tasks' : `No ${filter} tasks`}
          </span>
        )}
      </ul>

      <div className="todolist__controls">
        <Button
          className={`btn_success ${filter === 'all' && 'active'}`}
          title="ALL"
          onClick={() => changeFilter('all', id)}
        />
        <Button
          className={`btn_success ${filter === 'active' && 'active'}`}
          title="ACTIVE"
          onClick={() => changeFilter('active', id)}
        />
        <Button
          className={`btn_success ${filter === 'completed' && 'active'}`}
          title="COMPLETED"
          onClick={() => changeFilter('completed', id)}
        />
      </div>
    </div>
  )
}

export const TodolistMemo = memo<TodolistPropsType>(Todolist)
