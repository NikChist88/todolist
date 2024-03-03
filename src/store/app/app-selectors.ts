import { AppRootState } from "../store"

export const selectAppStatus = (state: AppRootState) => state.app.status
export const selectAppError = (state: AppRootState) => state.app.error
export const selectAppMessage = (state: AppRootState) => state.app.message
export const selectAppSeverity = (state: AppRootState) => state.app.severity
