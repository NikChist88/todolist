import axios, { AxiosError } from "axios"
import { AuthLoginDataType, authAPI } from "../../../api/auth-api"
import { setError, setStatus } from "../app-reducer/app-reducer"
import { AppThunk } from "../../store"
import { actions } from "../todolists-reducer/todolists-reducer"
import { setLoading, setIsLoggedIn, setIsInit } from "./auth-reducer"
import { Dispatch } from "redux"

export const loginTC = (authData: AuthLoginDataType) => async (dispatch: Dispatch) => {
  dispatch(setStatus({ status: "loading" }))
  dispatch(setLoading({ loading: true }))
  try {
    await authAPI.login(authData)
    dispatch(setLoading({ loading: false }))
    dispatch(setStatus({ status: "succeeded" }))
    dispatch(setIsLoggedIn({ isLoggedIn: true }))
  } catch (err) {
    if (axios.isAxiosError(err)) {
      dispatch(setError({ error: err.message }))
    } else {
      dispatch(setStatus({ status: "failed" }))
    }
  }
}

export const initTC = (): AppThunk => (dispatch: Dispatch) => {
  authAPI
    .init()
    .then(({ data }) => {
      dispatch(setIsInit({ isInit: true }))
      if (data.resultCode === 0) {
        dispatch(setIsLoggedIn({ isLoggedIn: true }))
      } else {
        dispatch(setError({ error: data.messages.toString() }))
      }
    })
    .catch((err: AxiosError) => {
      dispatch(setError({ error: err.message }))
    })
}

export const logoutTC = (): AppThunk => (dispatch: Dispatch) => {
  authAPI
    .logout()
    .then(({ data }) => {
      if (data.resultCode === 0) {
        dispatch(setIsLoggedIn({ isLoggedIn: false }))
        dispatch(actions.clearData())
      } else {
        dispatch(setError({ error: data.messages.toString() }))
      }
    })
    .catch((err: AxiosError) => {
      dispatch(setError({ error: err.message }))
    })
}
