import { combineReducers } from "redux"
import { ThunkAction, thunk } from "redux-thunk"
import { todolistsReducer } from "./reducers/todolists-reducer/todolists-reducer"
import { appReducer } from "./reducers/app-reducer/app-reducer"
import { authReducer } from "./reducers/auth-reducer/auth-reducer"
import { useSelector, useDispatch, TypedUseSelectorHook } from "react-redux"
import { PayloadAction, configureStore } from "@reduxjs/toolkit"
import { tasksReducer } from "./reducers/tasks-reducer/tasks-reducer"

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
// export type RootActionsType = TasksActionsTypes
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootState, unknown, PayloadAction>

// @ts-ignore
window.store = store
