import './TodoItem.styles.scss'
import { FC, memo } from 'react'
import { TodolistDomainType } from '../../store/reducers/todolistsReducer/todolistsReducer'
import { FormControl } from '../formControl/FormControl'
import { Button } from '../button/Button'
import { useTodolist } from './hooks/useTodolist'
import { TasksList } from '../task/TasksList'
import { EditableTitle } from '../editableTitle/EditableTitle'
import { useTask } from '../task/hooks/useTask'

type TodoItemPropsType = {
  item: TodolistDomainType
}

export const TodoItem: FC<TodoItemPropsType> = memo(({ item }) => {
  const { id, title, filter } = item
  const { deleteTodolist, updateTitle, changeFilter } = useTodolist(id, title)
  const { createTask } = useTask(id, filter)

  return (
    <div className="todolist">
      <div className="todolist__header">
        <EditableTitle title={title} onChange={updateTitle} />
        <Button className="btn_danger" onClick={deleteTodolist} />
      </div>

      <FormControl label="New task" action={createTask} />

      <ul className="todolist__list">
        <TasksList todolistId={id} filter={filter} />
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
