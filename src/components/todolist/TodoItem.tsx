import './TodoItem.styles.scss'
import { FC, memo } from 'react'
import { TodolistDomainType } from '../../store/reducers/todolistsReducer/todolistsReducer'
import { FormControl } from '../formControl/FormControl'
import { Button } from '../button/Button'
import { useTodolist } from './hooks/useTodolist'
import { TasksList } from '../task/TasksList'
import { EditableTitle } from '../editableTitle/EditableTitle'
import { useTask } from '../task/hooks/useTask'
import { Paper, IconButton } from '@mui/material'
import { styled } from '@mui/material/styles'
import DeleteIcon from '@mui/icons-material/Delete'
import { Filter } from '../filter/Filter'

type TodoItemPropsType = {
  item: TodolistDomainType
}

const TodosPaper = styled(Paper)(({ theme }) => ({
  width: 350,
  height: '100%',
  borderRadius: 10,
  padding: theme.spacing(2),
  ...theme.typography.body2,
}))

export const TodoItem: FC<TodoItemPropsType> = memo(({ item }) => {
  const { id, title, filter } = item
  const { deleteTodolist, updateTitle, changeFilter } = useTodolist(id, title)
  const { createTask } = useTask(id, filter)

  return (
    <TodosPaper variant="elevation">
      <div className="todolist">
        <div className="todolist__header">
          <EditableTitle title={title} onChange={updateTitle} />
          <IconButton color="error" onClick={deleteTodolist}>
            <DeleteIcon />
          </IconButton>
        </div>

        <FormControl label="New task" action={createTask} />

        <ul className="todolist__list">
          <TasksList todolistId={id} filter={filter} />
        </ul>

        <div className="todolist__controls">
          <Filter id={id} changeFilter={changeFilter} />
        </div>
      </div>
    </TodosPaper>
  )
})
