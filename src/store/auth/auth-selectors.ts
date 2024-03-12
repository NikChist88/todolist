import { AppRootState } from "../store"

export const selectAuthIsLoggedIn = (state: AppRootState) => state.auth.isLoggedIn
export const selectAuthIsInit = (state: AppRootState) => state.auth.isInit
