import { FC, memo, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { TodolistDomainType } from '../../store/reducers/todolistsReducer/todolistsReducer'
import { AppDispatch, RootState } from '../../store/store'
import { TodoItem } from './TodoItem'
import { fetchTodolistsTC } from '../../store/reducers/todolistsReducer/todolistsThunks'
import { FormControl } from '../formControl/FormControl'
import { useTodolist } from './hooks/useTodolist'

export const TodosList: FC = memo(() => {
  const { createTodolist } = useTodolist()
  const todolists = useSelector<RootState, TodolistDomainType[]>(
    (state) => state.todolists
  )
  const dispatch: AppDispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchTodolistsTC())
  }, [])

  return (
    <>
      <FormControl
        className="form_shadow"
        label="New todolist"
        action={createTodolist}
      />
      <div className="wrapper">
        {todolists.map((item) => {
          return <TodoItem key={item.id} item={item} />
        })}
      </div>
    </>
  )
})
