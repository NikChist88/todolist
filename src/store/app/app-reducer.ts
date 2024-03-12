import { createSlice, PayloadAction } from "@reduxjs/toolkit"

const initialState: AppStateType = {
  status: "idle",
  error: {
    message: null,
    severity: "info",
  },
}

const slice = createSlice({
  name: "app",
  initialState: initialState,
  reducers: {
    setAppStatus(state, action: PayloadAction<RequestStatusType>) {
      state.status = action.payload
    },
    setAppError(state, action: PayloadAction<{ message: null | string; severity: SeverityType }>) {
      state.error.message = action.payload.message
      state.error.severity = action.payload.severity
    },
  },
})

export const appReducer = slice.reducer
export const { setAppStatus, setAppError } = slice.actions

export type RequestStatusType = "idle" | "loading" | "succeeded" | "failed"
export type SeverityType = "success" | "info" | "error" | "warning"
export type ErrorType = {
  message: null | string
  severity: SeverityType
}
export type AppStateType = {
  status: RequestStatusType
  error: ErrorType
}
