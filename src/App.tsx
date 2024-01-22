import './App.scss'
import { FC, useCallback, memo } from 'react'
import { Todolist } from './components/todoList/TodoList'
import { AppRootStateType } from './store/store'
import { TodolistType } from './store/types/todolistsTypes'
import { FormControl } from './components/formControl/FormControl'
import { createTodolistAC } from './store/actionCreators/todolistsActionCreator'
import { useDispatch, useSelector } from 'react-redux'

export const App: FC = memo(() => {

  const todolists = useSelector<AppRootStateType, TodolistType[]>(
    (state) => state.todolists
  )
  
  const dispatch = useDispatch()

  // Create Todolist
  const createTodolist = useCallback(
    (title: string) => {
      dispatch(createTodolistAC(title))
    },
    [dispatch]
  )

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
