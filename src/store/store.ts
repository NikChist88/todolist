import { combineReducers, legacy_createStore } from 'redux'
import { todolistsReducer } from './reducers/todolistsReducer/todolistsReducer'
import { tasksReducer } from './reducers/tasksReducer/tasksReducer'

const rootReducer = combineReducers({
  todolists: todolistsReducer,
  tasks: tasksReducer,
})

export type AppRootStateType = ReturnType<typeof rootReducer>
export const store = legacy_createStore(rootReducer)
