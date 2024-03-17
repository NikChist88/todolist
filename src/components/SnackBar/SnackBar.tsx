import { FC, SyntheticEvent } from "react"
import { Alert, Snackbar } from "@mui/material"
import { useAppDispatch, useAppSelector } from "../../store/store"
import { appSelectors, appReducer } from "../../store/app"

export const SnackBar: FC = () => {
  const error = useAppSelector(appSelectors.selectAppError)
  const dispatch = useAppDispatch()
  const isOpen = error.message !== null

  const handleClose = (event?: SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
      return
    }
    dispatch(appReducer.setAppError({ message: null, severity: error.severity }))
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
        severity={error.severity}
        variant='filled'
        sx={{ width: "100%" }}
      >
        {error.message}
      </Alert>
    </Snackbar>
  )
}
