import { FC, memo, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { TodolistDomainType } from '../../store/reducers/todolistsReducer/todolistsReducer'
import { RootStateType } from '../../store/store'
import { Todolist } from './Todolist'
import {
  TodolistsActionsTypes,
  fetchTodolistsTC,
} from '../../store/reducers/todolistsReducer/todolistsReducer'
import { ThunkDispatch } from 'redux-thunk'

export const Todolists: FC = memo(() => {
  const todolists = useSelector<RootStateType, TodolistDomainType[]>(
    (state) => state.todolists
  )
  const dispatch: ThunkDispatch<RootStateType, any, TodolistsActionsTypes> =
    useDispatch()

  useEffect(() => {
    dispatch(fetchTodolistsTC())
  }, [dispatch])

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
