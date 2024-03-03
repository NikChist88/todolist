import { FC, SyntheticEvent } from "react"
import { Alert, Snackbar } from "@mui/material"
import { setError, setMessage } from "../../store/app/app-reducer"
import { useAppDispatch, useAppSelector } from "../../store/store"
import { selectAppError, selectAppMessage, selectAppSeverity } from "../../store/app/app-selectors"

export const SnackBar: FC = () => {
  const error = useAppSelector(selectAppError)
  const message = useAppSelector(selectAppMessage)
  const severity = useAppSelector(selectAppSeverity)
  const dispatch = useAppDispatch()
  const isOpen = error !== null || message !== null

  const handleClose = (event?: SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
      return
    }
    dispatch(setError(null))
    dispatch(setMessage({ message: null, severity: severity }))
  }

  return (
    <Snackbar
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      open={isOpen}
      autoHideDuration={3000}
      onClose={handleClose}
    >
      <Alert
        onClose={handleClose}
        severity={error ? "error" : severity}
        variant='filled'
        sx={{ width: "100%" }}
      >
        {error || message}
      </Alert>
    </Snackbar>
  )
}
