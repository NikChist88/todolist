import { PayloadAction, createSlice } from "@reduxjs/toolkit"

const initialState = {
  loading: false,
  isLoggedIn: false,
  isInit: false,
}

const slice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setLoading(state, action: PayloadAction<{ loading: boolean }>) {
      state.loading = action.payload.loading
    },
    setIsLoggedIn(state, action: PayloadAction<{ isLoggedIn: boolean }>) {
      state.isLoggedIn = action.payload.isLoggedIn
    },
    setIsInit(state, action: PayloadAction<{ isInit: boolean }>) {
      state.isInit = action.payload.isInit
    },
  },
})

export const authReducer = slice.reducer
export const { setLoading, setIsInit, setIsLoggedIn } = slice.actions
