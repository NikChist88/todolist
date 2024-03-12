import { combineReducers } from "redux"
import { ThunkAction, thunk } from "redux-thunk"
import { todolistsReducer } from "./todolists/todolists-reducer"
import { appReducer } from "./app/app-reducer"
import { authReducer } from "./auth/auth-reducer"
import { useSelector, useDispatch, TypedUseSelectorHook } from "react-redux"
import { PayloadAction, configureStore } from "@reduxjs/toolkit"
import { tasksReducer } from "./tasks/tasks-reducer"

const rootReducer = combineReducers({
  todolists: todolistsReducer,
  tasks: tasksReducer,
  app: appReducer,
  auth: authReducer,
})

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(thunk),
})
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<AppRootState> = useSelector

export type AppRootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootState, unknown, PayloadAction>

// @ts-ignore
window.store = store
