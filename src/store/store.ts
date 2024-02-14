import {
  applyMiddleware,
  combineReducers,
  legacy_createStore as createStore,
} from 'redux'
import { ThunkAction, ThunkDispatch, thunk } from 'redux-thunk'
import {
  TodolistsActionsTypes,
  todolistsReducer,
} from './reducers/todolistsReducer/todolistsReducer'
import {
  TasksActionsTypes,
  tasksReducer,
} from './reducers/tasksReducer/tasksReducer'
import { AppActionsTypes, appReducer } from './reducers/appReducer/appReducer'

const rootReducer = combineReducers({
  todolists: todolistsReducer,
  tasks: tasksReducer,
  app: appReducer,
})

export const store = createStore(rootReducer, {}, applyMiddleware(thunk))

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = ThunkDispatch<RootState, unknown, RootActionsType>

export type RootActionsType =
  | TodolistsActionsTypes
  | TasksActionsTypes
  | AppActionsTypes

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  RootActionsType
>
