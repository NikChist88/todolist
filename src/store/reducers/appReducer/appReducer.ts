const initialState: InitialStateType = {
  status: 'idle',
  error: null,
  message: null,
  severity: 'info'
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

    case 'APP/SET_MESSAGE':
      return { ...state, message: action.message, severity: action.severity }

    default:
      return { ...state }
  }
}


// actions
export const setStatusAC = (status: RequestStatusType) =>
  ({ type: 'APP/SET_STATUS', status } as const)

export const setErrorAC = (error: ErrorType) =>
  ({ type: 'APP/SET_ERROR', error } as const)

export const setMessageAC = (message: MessageType, severity: SeverityType) =>
  ({
    type: 'APP/SET_MESSAGE',
    message,
    severity,
  } as const)


// types
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type SeverityType = 'success' | 'info' | 'error'
export type ErrorType = string | null
export type MessageType = string | null

export type InitialStateType = {
  status: RequestStatusType
  error: ErrorType
  message: MessageType
  severity: SeverityType
}

export type AppActionsTypes =
  | ReturnType<typeof setErrorAC>
  | ReturnType<typeof setStatusAC>
  | ReturnType<typeof setMessageAC>
