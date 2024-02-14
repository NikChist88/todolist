import './Todolist.styles.scss'
import { FC, memo } from 'react'
import { FilterType } from '../../store/reducers/todolistsReducer/todolistsReducer'
import { FormControl } from '../formControl/FormControl'
import { Button } from '../button/Button'
import { useTodolist } from './hooks/useTodolist'
import { Tasks } from '../task/Tasks'
import { useTask } from '../task/hooks/useTask'

type TodolistPropsType = {
  todolistId: string
  title: string
  filter: FilterType
}

export const Todolist: FC<TodolistPropsType> = memo(
  ({ todolistId, title, filter }) => {
    
    const { deleteTodolist, changeFilter } = useTodolist(title)
    const { createTask } = useTask(todolistId, filter)

    return (
      <div className="todolist">
        <div className="todolist__header">
          <h3 className="todolist__title">{title}</h3>
          <Button
            className="btn_danger"
            onClick={() => deleteTodolist(todolistId)}
          />
        </div>

        <FormControl label="New task" action={createTask} />

        <ul className="todolist__list">
          <Tasks todolistId={todolistId} filter={filter} />
        </ul>

        <div className="todolist__controls">
          <Button
            className={`btn_success ${filter === 'all' && 'active'}`}
            text="ALL"
            onClick={() => changeFilter('all', todolistId)}
          />
          <Button
            className={`btn_success ${filter === 'active' && 'active'}`}
            text="ACTIVE"
            onClick={() => changeFilter('active', todolistId)}
          />
          <Button
            className={`btn_success ${filter === 'completed' && 'active'}`}
            text="COMPLETED"
            onClick={() => changeFilter('completed', todolistId)}
          />
        </div>
      </div>
    )
  }
)
