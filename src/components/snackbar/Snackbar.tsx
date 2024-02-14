import { FC, SyntheticEvent } from 'react'
import SnackbarMui from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'
import { useSelector, useDispatch } from 'react-redux'
import { setErrorAC } from '../../store/reducers/appReducer/appReducer'
import { RootState } from '../../store/store'

type SnackbarPropsType = {}

export const Snackbar: FC<SnackbarPropsType> = () => {
  const error = useSelector<RootState, string | null>(
    (state) => state.app.error
  )
  const dispatch = useDispatch()

  const handleClose = (event?: SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return
    }
    dispatch(setErrorAC(null))
  }

  const isOpen = error !== null

  return (
    <SnackbarMui
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      open={isOpen}
      autoHideDuration={3000}
      onClose={handleClose}
    >
      <Alert
        onClose={handleClose}
        severity='info'
        variant="filled"
        sx={{ width: '100%' }}
      >
        {error}
      </Alert>
    </SnackbarMui>
  )
}
