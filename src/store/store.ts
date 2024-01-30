import {
  applyMiddleware,
  combineReducers,
  legacy_createStore as createStore,
} from 'redux'
import { todolistsReducer } from './reducers/todolistsReducer/todolistsReducer'
import { tasksReducer } from './reducers/tasksReducer/tasksReducer'
import { thunk } from 'redux-thunk'

const rootReducer = combineReducers({
  todolists: todolistsReducer,
  tasks: tasksReducer,
})

export type RootStateType = ReturnType<typeof rootReducer>

export const store = createStore(rootReducer, {}, applyMiddleware(thunk))
