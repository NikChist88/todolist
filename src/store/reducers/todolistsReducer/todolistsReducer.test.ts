import {
  todolistsReducer,
  RemoveTodolistAC,
  CreateTodolistAC,
  ChangeTodolistFilterAC,
} from './todolistsReducer'
import { TodolistType } from '../../store'
import { FilterType } from '../../store'
import { v1 } from 'uuid'

// Delete Todolist
test('removed todolist', () => {
  const todolistId_1: string = v1()
  const todolistId_2: string = v1()

  const startState: TodolistType[] = [
    { id: todolistId_1, title: 'what to learn', filter: 'all' },
    { id: todolistId_2, title: 'what to buy', filter: 'all' },
  ]

  const action = RemoveTodolistAC(todolistId_1)

  const endState = todolistsReducer(startState, action)

  expect(endState.length).toBe(1)
  expect(endState[0].id).toBe(todolistId_2)
})

// Add Todolist
test('create todolist', () => {
  const todolistId_1: string = v1()
  const todolistId_2: string = v1()

  const newTodolist = 'Home Work'
  const action = CreateTodolistAC(newTodolist)

  const startState: TodolistType[] = [
    { id: todolistId_1, title: 'what to learn', filter: 'all' },
    { id: todolistId_2, title: 'what to buy', filter: 'all' },
  ]

  const endState = todolistsReducer(startState, action)

  expect(endState.length).toBe(3)
  expect(endState[2].title).toBe(newTodolist)
  expect(endState[2].filter).toBe('all')
})

// Change Todolist Filter
test('change todolist filter', () => {
  const todolistId_1: string = v1()
  const todolistId_2: string = v1()

  const newFilter: FilterType = 'active'
  const action = ChangeTodolistFilterAC(newFilter, todolistId_1)

  const startState: TodolistType[] = [
    { id: todolistId_1, title: 'what to learn', filter: 'all' },
    { id: todolistId_2, title: 'what to buy', filter: 'all' },
  ]

  const endState = todolistsReducer(startState, action)

  expect(endState[0].filter).toBe('active')
  expect(endState[1].filter).toBe('all')
})
