const initialState: InitialStateType = {
  status: 'idle',
  error: null,
}

// reducer
export const appReducer = (
  state: InitialStateType = initialState,
  action: AppActionsTypes
): InitialStateType => {
  switch (action.type) {
    case 'APP/SET_STATUS':
      return { ...state, status: action.status }

    case 'APP/SET_ERROR':
      return { ...state, error: action.error }

    default:
      return { ...state }
  }
}


// actions
export const setStatusAC = (status: RequestStatusType) =>
  ({ type: 'APP/SET_STATUS', status } as const)

export const setErrorAC = (error: ErrorType) =>
  ({ type: 'APP/SET_ERROR', error } as const)

  
// types
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type ErrorType = string | null

export type InitialStateType = {
  status: RequestStatusType
  error: ErrorType
}

export type AppActionsTypes =
  | ReturnType<typeof setErrorAC>
  | ReturnType<typeof setStatusAC>
