import { FC, SyntheticEvent } from 'react'
import SnackbarMui from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'
import { useSelector, useDispatch } from 'react-redux'
import {
  setErrorAC,
  setMessageAC,
  SeverityType
} from '../../store/reducers/appReducer/appReducer'
import { RootState } from '../../store/store'

export const Snackbar: FC = () => {
  const error = useSelector<RootState, string | null>(
    (state) => state.app.error
  )
  const message = useSelector<RootState, string | null>(
    (state) => state.app.message
  )
  const severity = useSelector<RootState, SeverityType>(
    (state) => state.app.severity
  )
  const dispatch = useDispatch()

  const handleClose = (event?: SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return
    }
    dispatch(setErrorAC(null))
    dispatch(setMessageAC(null, 'info'))
  }

  const isOpen = error !== null || message !== null

  return (
    <SnackbarMui
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      open={isOpen}
      autoHideDuration={3000}
      onClose={handleClose}
    >
      <Alert
        onClose={handleClose}
        severity={error ? 'error' : severity}
        variant="filled"
        sx={{ width: '100%' }}
      >
        {error || message}
      </Alert>
    </SnackbarMui>
  )
}
