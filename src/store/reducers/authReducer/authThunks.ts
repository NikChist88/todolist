import { AxiosError } from "axios"
import { AuthLoginDataType, authAPI } from "../../../api/todolistsApi"
import { setErrorAC, setStatusAC } from "../appReducer/appReducer"
import { AppThunk } from "../../store"
import { setIsInitAC, setIsLoggedInAC, setLoadingAC } from "./authReducer"

export const loginTC =
  (data: AuthLoginDataType): AppThunk =>
  (dispatch) => {
    dispatch(setStatusAC("loading"))
    dispatch(setLoadingAC(true))
    authAPI
      .login(data)
      .then(({ data }) => {
        if (data.resultCode === 0) {
          dispatch(setStatusAC("succeeded"))
          dispatch(setIsLoggedInAC(true))
          dispatch(setLoadingAC(false))
        } else {
          dispatch(setStatusAC("failed"))
          dispatch(setErrorAC(data.messages.toString()))
          dispatch(setLoadingAC(false))
        }
      })
      .catch((err: AxiosError) => {
        dispatch(setErrorAC(err.message))
      })
  }

export const initTC = (): AppThunk => (dispatch) => {
  authAPI
    .init()
    .then(({ data }) => {
      dispatch(setIsInitAC(true))
      if (data.resultCode === 0) {
        dispatch(setIsLoggedInAC(true))
      } else {
        dispatch(setErrorAC(data.messages.toString()))
      }
    })
    .catch((err: AxiosError) => {
      dispatch(setErrorAC(err.message))
    })
}

export const logoutTC = (): AppThunk => (dispatch) => {
  authAPI
    .logout()
    .then(({ data }) => {
      if (data.resultCode === 0) {
        dispatch(setIsLoggedInAC(false))
      } else {
        dispatch(setErrorAC(data.messages.toString()))
      }
    })
    .catch((err: AxiosError) => {
      dispatch(setErrorAC(err.message))
    })
}
