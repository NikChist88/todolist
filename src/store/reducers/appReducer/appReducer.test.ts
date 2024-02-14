import {
  InitialStateType,
  appReducer,
  setErrorAC,
  setStatusAC,
} from './appReducer'

let startState: InitialStateType

beforeEach(() => {
  startState = { status: 'idle', error: null, message: null, severity: 'info' }
})

test('set error', () => {
  const action = setErrorAC('some error')
  const endState = appReducer(startState, action)

  expect(endState.error).toBe('some error')
})

test('set status', () => {
  const action = setStatusAC('loading')
  const endState = appReducer(startState, action)

  expect(endState.status).toBe('loading')
})
