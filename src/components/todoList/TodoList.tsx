import './TodoList.styles.scss'
import { FC, memo } from 'react'
import { Task } from '../task/Task'
import { TaskType } from '../../store/types/tasksTypes'
import { FilterType } from '../../store/types/todolistsTypes'
import { FormControl } from '../formControl/FormControl'
import { Button } from '../button/Button'
import { useTodoList } from './hooks/useTodoList'

type TodolistPropsType = {
  id: string
  title: string
  filter: FilterType
}

export const Todolist: FC<TodolistPropsType> = memo(({ id, title, filter }) => {
  
  const { filteredTasks, addTask, deleteTodolistHandler, changeFilter } =
    useTodoList(id, title, filter)

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

      <FormControl label="New task" action={addTask} />

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
})
