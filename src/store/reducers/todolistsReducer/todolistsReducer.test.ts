import { todolistsReducer, TodolistDomainType } from './todolistsReducer'
import {
  removeTodolistAC,
  changeTodolistFilterAC,
  createTodolistAC,
  setTodolistsAC,
} from './todolistsActionCreator'

let startState: TodolistDomainType[] = []

beforeEach(() => {
  startState = [
    { id: '1', title: 'what to learn', filter: 'all', addedDate: '', order: 0 },
    { id: '2', title: 'what to buy', filter: 'all', addedDate: '', order: 0 },
  ]
})

// Delete Todolist
test('removed todolist', () => {
  const action = removeTodolistAC(startState[0].id)
  const endState = todolistsReducer(startState, action)

  expect(endState.length).toBe(1)
  expect(endState[0].id).toBe('2')
})

// Add Todolist
test('create todolist', () => {
  const action = createTodolistAC('home work')
  const endState = todolistsReducer(startState, action)

  expect(endState.length).toBe(3)
  expect(endState[0].title).toBe('home work')
})

// Change Todolist Filter
test('change todolist filter', () => {
  const action = changeTodolistFilterAC('active', startState[0].id)
  const endState = todolistsReducer(startState, action)

  expect(endState[0].filter).toBe('active')
  expect(endState[1].filter).toBe('all')
})

// Set Todolists
test('set todolists to state', () => {
  const action = setTodolistsAC(startState)
  const endState = todolistsReducer([], action)

  expect(endState.length).toBe(2)
})
