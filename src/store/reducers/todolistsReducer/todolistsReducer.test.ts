import { todolistsReducer } from './todolistsReducer'
import {
  removeTodolistAC,
  changeTodolistFilterAC,
  createTodolistAC,
} from '../../actionCreators/todolistsActionCreator'
import { TodolistDomainType, FilterType } from './todolistsReducer'

// Delete Todolist
test('removed todolist', () => {
  const startState: TodolistDomainType[] = [
    { id: '1', title: 'what to learn', filter: 'all', addedDate: '', order: 0 },
    { id: '2', title: 'what to buy', filter: 'all', addedDate: '', order: 0 },
  ]

  const action = removeTodolistAC(startState[0].id)
  const endState = todolistsReducer(startState, action)

  expect(endState.length).toBe(1)
  expect(endState[0].id).toBe('2')
})

// Add Todolist
test('create todolist', () => {
  const startState: TodolistDomainType[] = [
    { id: '1', title: 'what to learn', filter: 'all', addedDate: '', order: 0 },
  ]

  const title: string = 'home work'
  const action = createTodolistAC(title)
  const endState = todolistsReducer(startState, action)

  expect(endState.length).toBe(2)
  expect(endState[0].title).toBe(title)
})

// Change Todolist Filter
test('change todolist filter', () => {
  const startState: TodolistDomainType[] = [
    { id: '1', title: 'what to learn', filter: 'all', addedDate: '', order: 0 },
    { id: '2', title: 'what to buy', filter: 'all', addedDate: '', order: 0 },
  ]

  const newFilter: FilterType = 'active'
  const action = changeTodolistFilterAC(newFilter, startState[0].id)
  const endState = todolistsReducer(startState, action)

  expect(endState[0].filter).toBe(newFilter)
  expect(endState[1].filter).toBe('all')
})
