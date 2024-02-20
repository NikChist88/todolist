import { applyMiddleware, combineReducers, legacy_createStore as createStore } from "redux"
import { ThunkAction, ThunkDispatch, thunk } from "redux-thunk"
import { TodolistsActionsTypes, todolistsReducer } from "./reducers/todolistsReducer/todolistsReducer"
import { TasksActionsTypes, tasksReducer } from "./reducers/tasksReducer/tasksReducer"
import { AppActionsTypes, appReducer } from "./reducers/appReducer/appReducer"
import { AuthActionsTypes, authReducer } from "./reducers/authReducer/authReducer"
import { useSelector, useDispatch, TypedUseSelectorHook } from "react-redux"

const rootReducer = combineReducers({
  todolists: todolistsReducer,
  tasks: tasksReducer,
  app: appReducer,
  auth: authReducer,
})

export const store = createStore(rootReducer, {}, applyMiddleware(thunk))
export const useAppSelector: TypedUseSelectorHook<AppRootState> = useSelector
export const useAppDispatch = () => useDispatch<AppDispatch>()

export type AppRootState = ReturnType<typeof store.getState>
export type AppDispatch = ThunkDispatch<AppRootState, unknown, RootActionsType>

export type RootActionsType = TodolistsActionsTypes | TasksActionsTypes | AppActionsTypes | AuthActionsTypes

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootState, unknown, RootActionsType>
