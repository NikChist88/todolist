import { todolistsReducer } from './todolistsReducer'
import {
  removeTodolistAC,
  changeTodolistFilterAC,
  createTodolistAC,
} from '../../actionCreators/todolistsActionCreator'
import { FilterType, TodolistType } from '../../types/todolistsTypes'

// Delete Todolist
test('removed todolist', () => {
  const startState: TodolistType[] = [
    { id: '1', title: 'what to learn', filter: 'all' },
    { id: '2', title: 'what to buy', filter: 'all' },
  ]

  const action = removeTodolistAC(startState[0].id)
  const endState = todolistsReducer(startState, action)

  expect(endState.length).toBe(1)
  expect(endState[0].id).toBe('2')
})

// Add Todolist
test('create todolist', () => {
  const startState: TodolistType[] = [
    { id: '1', title: 'what to learn', filter: 'all' },
  ]

  const title: string = 'home work'
  const action = createTodolistAC(title)
  const endState = todolistsReducer(startState, action)

  expect(endState.length).toBe(2)
  expect(endState[0].title).toBe(title)
})

// Change Todolist Filter
test('change todolist filter', () => {
  const startState: TodolistType[] = [
    { id: '1', title: 'what to learn', filter: 'all' },
    { id: '2', title: 'what to buy', filter: 'all' },
  ]

  const newFilter: FilterType = 'active'
  const action = changeTodolistFilterAC(newFilter, startState[0].id)
  const endState = todolistsReducer(startState, action)

  expect(endState[0].filter).toBe(newFilter)
  expect(endState[1].filter).toBe('all')
})
