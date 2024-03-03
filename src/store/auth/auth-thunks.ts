import axios, { AxiosError } from "axios"
import { AuthLoginDataType, authAPI } from "../../api/auth-api"
import { setError, setStatus } from "../app/app-reducer"
import { AppThunk } from "../store"
import { actions } from "../todolists/todolists-reducer"
import { setLoading, setIsLoggedIn, setIsInit } from "./auth-reducer"
import { Dispatch } from "redux"

export const loginTC = (authData: AuthLoginDataType) => async (dispatch: Dispatch) => {
  dispatch(setStatus("loading"))
  dispatch(setLoading(true))
  try {
    await authAPI.login(authData)
    dispatch(setLoading(false))
    dispatch(setStatus("succeeded"))
    dispatch(setIsLoggedIn(true))
  } catch (err) {
    if (axios.isAxiosError(err)) {
      dispatch(setError(err.message))
    } else {
      dispatch(setStatus("failed"))
    }
  }
}

export const initTC = (): AppThunk => (dispatch: Dispatch) => {
  authAPI
    .init()
    .then(({ data }) => {
      dispatch(setIsInit(true))
      if (data.resultCode === 0) {
        dispatch(setIsLoggedIn(true))
      } else {
        dispatch(setError(data.messages.toString()))
      }
    })
    .catch((err: AxiosError) => {
      dispatch(setError(err.message))
    })
}

export const logoutTC = (): AppThunk => (dispatch: Dispatch) => {
  authAPI
    .logout()
    .then(({ data }) => {
      if (data.resultCode === 0) {
        dispatch(setIsLoggedIn(false))
        dispatch(actions.clearData())
      } else {
        dispatch(setError(data.messages.toString()))
      }
    })
    .catch((err: AxiosError) => {
      dispatch(setError(err.message))
    })
}
