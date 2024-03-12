import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { init, login, logout } from "./auth-thunks"

const initialState = {
  isLoggedIn: false,
  isInit: false,
  logout: false,
}

const slice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setIsLoggedIn(state, action: PayloadAction<boolean>) {
      state.isLoggedIn = action.payload
    },
  },
  extraReducers(builder) {
    builder.addCase(login.fulfilled, (state) => {
      state.isLoggedIn = true
    })
    builder.addCase(init.fulfilled, (state) => {
      state.isInit = true
    })
    builder.addCase(logout.fulfilled, (state) => {
      state.logout = true
    })
  },
})

export const authReducer = slice.reducer
export const { setIsLoggedIn } = slice.actions
