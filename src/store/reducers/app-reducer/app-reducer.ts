import { createSlice, PayloadAction } from "@reduxjs/toolkit"

const initialState: AppStateType = {
  status: "idle",
  error: null,
  message: null,
  severity: "info",
}

const slice = createSlice({
  name: "app",
  initialState: initialState,
  reducers: {
    setStatus(state, action: PayloadAction<{ status: RequestStatusType }>) {
      state.status = action.payload.status
    },
    setError(state, action: PayloadAction<{ error: null | string }>) {
      state.error = action.payload.error
    },
    setMessage(state, action: PayloadAction<{ message: null | string; severity: SeverityType }>) {
      state.message = action.payload.message
      state.severity = action.payload.severity
    },
  },
})

export const appReducer = slice.reducer
export const { setStatus, setError, setMessage } = slice.actions

export type RequestStatusType = "idle" | "loading" | "succeeded" | "failed"
export type SeverityType = "success" | "info" | "error" | "warning"
export type AppStateType = {
  status: RequestStatusType
  error: null | string
  message: null | string
  severity: SeverityType
}
