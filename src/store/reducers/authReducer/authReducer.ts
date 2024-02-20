const initialState: AuthStateType = {
  loading: false,
  isLoggedIn: false,
  isInit: false
}

// reducer
export const authReducer = (
  state: AuthStateType = initialState,
  action: AuthActionsTypes,
): AuthStateType => {
  switch (action.type) {
    case "AUTH/SET_LOADING":
      return { ...state, loading: action.loading }

    case "AUTH/SET_IS_LOGGED_IN":
      return { ...state, isLoggedIn: action.login }

    case 'AUTH/SET_INIT':
      return {...state, isInit: action.init}

    default:
      return state
  }
}


// actions
export const setLoadingAC = (loading: boolean) =>
  ({ type: "AUTH/SET_LOADING", loading } as const)

export const setIsLoggedInAC = (login: boolean) =>
  ({ type: "AUTH/SET_IS_LOGGED_IN", login } as const)

export const setIsInitAC = (init: boolean) =>
  ({ type: "AUTH/SET_INIT", init } as const)


// types
export type AuthStateType = {
  loading: boolean
  isLoggedIn: boolean
  isInit: boolean
}
export type AuthActionsTypes =
  | ReturnType<typeof setLoadingAC>
  | ReturnType<typeof setIsLoggedInAC>
  | ReturnType<typeof setIsInitAC>
