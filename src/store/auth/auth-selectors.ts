import { AppRootState } from "../store"

export const selectAuthLoading = (state: AppRootState) => state.auth.loading
export const selectAuthIsLoggedIn = (state: AppRootState) => state.auth.isLoggedIn
export const selectAuthIsInit = (state: AppRootState) => state.auth.isInit
