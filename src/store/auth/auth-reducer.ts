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
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload
    },
    setIsLoggedIn(state, action: PayloadAction<boolean>) {
      state.isLoggedIn = action.payload
    },
    setIsInit(state, action: PayloadAction<boolean>) {
      state.isInit = action.payload
    },
  },
})

export const authReducer = slice.reducer
export const { setLoading, setIsInit, setIsLoggedIn } = slice.actions
