import { AuthLoginDataType, todolistsAPI } from "../../api/todolists-api"
import { setAppError, setAppStatus } from "../app/app-reducer"
import { actions } from "../todolists/todolists-reducer"
import { setIsLoggedIn } from "./auth-reducer"
import { createAsyncThunk } from "@reduxjs/toolkit"

export const login = createAsyncThunk(
  "auth/login",
  async (authData: AuthLoginDataType, { dispatch, rejectWithValue }) => {
    dispatch(setAppStatus("loading"))
    try {
      const { data } = await todolistsAPI.login(authData)
      if (data.resultCode === 0) {
        dispatch(setAppStatus("succeeded"))
      } else {
        dispatch(setAppStatus("failed"))
        dispatch(setAppError({ message: data.messages.toString(), severity: "error" }))
      }
    } catch (err) {
      return rejectWithValue(err)
    }
  }
)

export const init = createAsyncThunk("auth/init", async (param, { dispatch }) => {
  try {
    const { data } = await todolistsAPI.init()
    if (data.resultCode === 0) {
      dispatch(setIsLoggedIn(true))
    }
  } catch {
    dispatch(setAppError({ message: "An error occured!", severity: "error" }))
  }
})

export const logout = createAsyncThunk("auth/logout", async (param, { dispatch }) => {
  try {
    const { data } = await todolistsAPI.logout()
    if (data.resultCode === 0) {
      dispatch(setIsLoggedIn(false))
      dispatch(setAppStatus("idle"))
      dispatch(actions.clearData())
    } else {
      dispatch(setAppError({ message: data.messages.toString(), severity: "error" }))
    }
  } catch {
    dispatch(setAppError({ message: "An error occured!", severity: "error" }))
  }
})
