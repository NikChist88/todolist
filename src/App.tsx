import './App.scss'
import { FC, useCallback } from 'react'
import { TodolistMemo } from './components/todoList/TodoList'
import { AppRootStateType } from './store/store'
import { TodolistType } from './store/types/todolists'
import { FormControlMemo } from './components/formControl/FormControl'
import {
  createTodolistAC,
  removeTodolistAC,
} from './store/actionCreators/todolistsActionCreator'
import { useDispatch, useSelector } from 'react-redux'

export const App: FC = () => {
  const todolists = useSelector<AppRootStateType, TodolistType[]>(
    (state) => state.todolists
  )
  const dispatch = useDispatch()

  // Create Todolist
  const createTodolist = useCallback((title: string) => {
    dispatch(createTodolistAC(title))
  }, [])

  // Delete Todolist
  const deleteTodolist = useCallback((todolistId: string) => {
    dispatch(removeTodolistAC(todolistId))
  }, [])

  return (
    <div className="app">
      <FormControlMemo label="New todolist" action={createTodolist} />
      <div className="wrapper">
        {todolists &&
          todolists.map((tl) => {
            return (
              <TodolistMemo
                key={tl.id}
                id={tl.id}
                title={tl.title}
                filter={tl.filter}
                deleteTodolist={deleteTodolist}
              />
            )
          })}
      </div>
    </div>
  )
}
