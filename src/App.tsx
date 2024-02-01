import './App.scss'
import { FC, memo, useEffect } from 'react'
import { Todolist } from './components/todoList/TodoList'
import { RootStateType } from './store/store'
import {
  TodolistDomainType,
  fetchTodolistsTC,
} from './store/reducers/todolistsReducer/todolistsReducer'
import { FormControl } from './components/formControl/FormControl'
import { useDispatch, useSelector } from 'react-redux'
import { ThunkDispatch } from 'redux-thunk'
import { SetTodolistsActionType } from './store/reducers/todolistsReducer/todolistsTypes'
import { useApp } from './components/app/hooks/useApp'

export const App: FC = memo(() => {
  const { createTodolist } = useApp()
  const todolists = useSelector<RootStateType, TodolistDomainType[]>(
    (state) => state.todolists
  )
  const dispatch: ThunkDispatch<RootStateType, any, SetTodolistsActionType> =
    useDispatch()

  useEffect(() => {
    dispatch(fetchTodolistsTC())
  }, [dispatch])

  return (
    <div className="app">
      <FormControl label="New todolist" action={createTodolist} />
      <div className="wrapper">
        {todolists &&
          todolists.map((tl) => {
            return (
              <Todolist
                key={tl.id}
                id={tl.id}
                title={tl.title}
                filter={tl.filter}
              />
            )
          })}
      </div>
    </div>
  )
})
