import { FC, memo, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { TodolistDomainType } from '../../store/reducers/todolistsReducer/todolistsReducer'
import { AppDispatch, RootState } from '../../store/store'
import { Todolist } from './Todolist'
import { fetchTodolistsTC } from '../../store/reducers/todolistsReducer/todolistsThunks'

export const Todolists: FC = memo(() => {
  const todolists = useSelector<RootState, TodolistDomainType[]>(
    (state) => state.todolists
  )
  const dispatch: AppDispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchTodolistsTC())
  }, [])

  return (
    <div className="wrapper">
      {todolists.map((tl) => {
        return (
          <Todolist
            key={tl.id}
            todolistId={tl.id}
            title={tl.title}
            filter={tl.filter}
          />
        )
      })}
    </div>
  )
})
