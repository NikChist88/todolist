import './TodoList.styles.scss'
import { FC, memo, useEffect } from 'react'
import { Task } from '../task/Task'
import { TaskType } from '../../api/types'
import { FilterType } from '../../store/reducers/todolistsReducer/todolistsReducer'
import { FormControl } from '../formControl/FormControl'
import { Button } from '../button/Button'
import { useTodoList } from './hooks/useTodoList'
import { useDispatch } from 'react-redux'
import { ThunkDispatch } from 'redux-thunk'
import { RootStateType } from '../../store/store'
import {
  fetchTasksTC,
  TasksActionsTypes,
} from '../../store/reducers/tasksReducer/tasksActionCreators'

type TodolistPropsType = {
  id: string
  title: string
  filter: FilterType
}

export const Todolist: FC<TodolistPropsType> = memo(({ id, title, filter }) => {
  const { filteredTasks, addTask, deleteTodolistHandler, changeFilter } =
    useTodoList(id, title, filter)

  const dispatch: ThunkDispatch<RootStateType, any, TasksActionsTypes> =
    useDispatch()

  useEffect(() => {
    dispatch(fetchTasksTC(id))
  }, [id, dispatch])

  return (
    <div className="todolist">
      <div className="todolist__header">
        <h3 className="todolist__title">{title}</h3>
        <Button
          className={'btn_danger'}
          title="Delete Todolist"
          onClick={deleteTodolistHandler}
        />
      </div>

      <FormControl label="New task" action={addTask} />

      <ul className="todolist__list">
        {filteredTasks && filteredTasks.length ? (
          filteredTasks.map((task: TaskType) => (
            <Task
              key={task.id}
              id={task.id}
              todolistId={id}
              task={task.title}
              status={task.status}
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
          text="ALL"
          onClick={() => changeFilter('all', id)}
        />
        <Button
          className={`btn_success ${filter === 'active' && 'active'}`}
          text="ACTIVE"
          onClick={() => changeFilter('active', id)}
        />
        <Button
          className={`btn_success ${filter === 'completed' && 'active'}`}
          text="COMPLETED"
          onClick={() => changeFilter('completed', id)}
        />
      </div>
    </div>
  )
})
